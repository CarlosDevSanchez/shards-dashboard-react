import React, { Component } from 'react';
import { ref } from '../firebase';
import { w3cwebsocket as W3CWebSocket } from "websocket";


class ToyZone extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        hover: false,
      };
      
      this.onDragOver = this.onDragOver.bind(this);
      this.onDragLeave = this.onDragLeave.bind(this);
      this.onDrop = this.onDrop.bind(this);
      this.onFilesAdded = this.onFilesAdded.bind(this);
      this.openFileDialog = this.openFileDialog.bind(this);
      this.fileInputRef = React.createRef();
    }
    
    /**
     * Handle file dropped into drag area
     * @param {Object} event
     */
    onDrop(event) {
      this.stopEvent(event);
  
      const { files } = event.dataTransfer;
      this.setState({ hover: false });
    }
    
    /**
     * Handle file being dragged over drag area
     * @param {Object} event
     */
    onDragOver(event) {
      this.stopEvent(event);
      this.setState({ hover: true });
    }
  
    /**
     * Handle file being dragged out of drag area
     * @param {Object} event
     */
    onDragLeave(event) {
      this.stopEvent(event);
      this.setState({ hover: false });
    }
  
    /**
     * Handle adding files through file dialog
     * @param {Object} event
     */
    onFilesAdded(event) {
      this.setState({ hover: true });
      const file = event.target.files[0];
      try{
        const reference = ref.ref(`galeria/${file.name}`);
        const task = reference.put(file);
        task.on('state_changed', (snapshot) => {
            let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            this.setState({
                uploadValue: percentage
            })
        }, (error) => {
                console.error(error.message)
        }, () => {
            task.snapshot.ref.getDownloadURL().then(function(downloadURL) {
              const client = new W3CWebSocket('ws://localhost:5000');
              client.onopen = () => {
                  const dataI = {
                      process_: "actualizar_mi_galeria",
                      data_: {"token": localStorage.getItem('token'), 'url': downloadURL},
                  };
                  client.send(JSON.stringify(dataI));
              }
              client.onmessage = (message) => {
                let res = JSON.parse(message.data);
                client.close();
              }
            });
        })
        this.setState({ hover: false });
      }catch(e){
        console.log(e);
      }
    }
    
    /**
     * Opens file system dialog
     */
    openFileDialog() {
      this.fileInputRef.current.click();
    }
    
    /**
     * Prevent default event. Just in case 
     */
    stopEvent = event => {
      event.preventDefault();
      event.stopPropagation();
    };
  
    render() {
      const { hover } = this.state;
      
      return (
        <div
          onDrop={this.onDrop}
          onClick={this.openFileDialog}
          onDragLeave={this.onDragLeave}
          onDragOver={this.onDragOver}
          className={hover ? "drop-zone-container hover" : "drop-zone-container"}
        >
          <input
            ref={this.fileInputRef}
            type="file"
            multiple
            onChange={this.onFilesAdded}
          />
          <div className="drag-files">
            {!hover ? 'Cargar imagenes' : this.state.uploadValue}
          </div>
        </div>
      );
    }
  }
  
  export default ToyZone;