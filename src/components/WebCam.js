import React from 'react';
import Webcam from "react-webcam";
import { ref } from '../firebase';
import { w3cwebsocket as W3CWebSocket } from "websocket";

const videoConstraints = {
    width: 350,
    height: 450,
    facingMode: "user"
  };
   
class WebcamCapture extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          screenshot: null,
          tab: 0,
          success: false,
          save: false
        };
        this.handleClickSave = this.handleClickSave.bind(this);
        this.handleReset = this.handleReset.bind(this);
      }

      handleClick = () => {
        const screenshot = this.webcam.getScreenshot();
        this.setState({ screenshot });
      }

      async handleClickSave(){
        this.setState({ save: true });
        const { screenshot } = this.state;
        const { selfie } = this.props;
        try{
          const reference = ref.ref(`galeria/${'capture' + new Date().toLocaleTimeString()}.jpeg`);
          await reference.putString(screenshot, 'data_url').then(async (snapshot) => {
            await snapshot.ref.getDownloadURL().then(downloadURL => {
              const client = new W3CWebSocket('ws://localhost:5000');
                client.onopen = () => {
                  const dataI = {
                      process_: selfie === 'verificacion' ? 'actualizar_selfie_verficacion' : "actualizar_mi_galeria",
                      data_: {"token": localStorage.getItem('token'), 'url': downloadURL},
                  };
                  client.send(JSON.stringify(dataI));
                }
                client.onmessage = (message) => {
                  let res = JSON.parse(message.data);
                  if(!res.error_)
                    this.resetCamera();
                  client.close();
                }
            })
          });
          this.setState({ save: false });
        }catch(e){
          console.log(e);
        }
      }

      resetCamera = () => {
        this.setState({ screenshot: null, success: true });
        setTimeout(()=> this.setState({ success: false }), 5000);
      }

      handleReset(){
        this.setState({ screenshot: null });
      }
      render(){
        return (
            <div className="">
              {this.state.success &&
                <div className="alert alert-success">
                  Guardado correctamente
                </div>
              }
                {!this.state.screenshot &&
                  <div>
                    <Webcam
                    audio={false}
                    ref={node => this.webcam = node}
                    videoConstraints={videoConstraints}
                    />
                    <br/>
                    <button className="btn btn-secreto-primary btn-block" onClick={this.handleClick}><i className="fa fa-camera"></i></button>
                  </div>
                }
                {this.state.screenshot &&
                  <div>
                    <img src={this.state.screenshot} width="350" height="450" />
                    <br/>
                    <button className="btn btn-secreto-primary" onClick={this.handleClickSave} disabled={this.state.save}>Guardar</button>
                    <button className="btn btn-secreto-primary" onClick={this.handleReset} disabled={this.state.save}>Cancelar</button>
                  </div>
                }
            </div>
        );
    }
};

export default WebcamCapture;