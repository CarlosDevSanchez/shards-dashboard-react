import React, { Component } from 'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";

export default class FormularioPublico extends Component{
    constructor(props){
        super(props)
        this.state = {
            name: '',
            age: '',
            phone: '',
            phoneW: '',
            linkInstagram: '',
            linkTwitter: '',
            departament: '',
            provincia: '',
            distrito: '',
            dpropio: false,
            hotel: false,
            cabaña: false,
            domicilio: false,
            viaje: false,
            aboutme: '',
            success: false,
            message: ''
        }
        this.handlerChange = this.handlerChange.bind(this);
        this.handlerSubmit = this.handlerSubmit.bind(this);
        this.handlerChangeCheckBox = this.handlerChangeCheckBox.bind(this);
    }

    componentDidMount(){
        const client = new W3CWebSocket('ws://localhost:5000');
        client.onopen = () => {
            const dataI = {
                process_: "obtener_datos_usuarios",
                data_: {"token": localStorage.getItem('token')},
            };
            client.send(JSON.stringify(dataI));
        };
        client.onmessage = (message) => {
            let res = JSON.parse(message.data);
            this.setState({
                ...res.resp_[3].publico
            })
            client.close();
        };
    }

    handlerSubmit(e){
        e.preventDefault()
        const client = new W3CWebSocket('ws://localhost:5000');
        const data = {
            name: this.state.name,
            age: this.state.age,
            phone: this.state.phone,
            phoneW: this.state.phoneW,
            linkInstagram: this.state.linkInstagram,
            linkTwitter: this.state.linkTwitter,
            departament: this.state.departament,
            provincia: this.state.provincia,
            distrito: this.state.distrito,
            dpropio: this.state.dpropio,
            hotel: this.state.hotel,
            cabaña: this.state.cabaña,
            domicilio: this.state.domicilio,
            viaje: this.state.viaje,
            aboutme: this.state.aboutme,
        };
        client.onopen = () => {
            const dataI = {
                process_: "actualizar_datos_publicos",
                data_: {"token": localStorage.getItem('token'), ...data},
            };
            client.send(JSON.stringify(dataI));
        }
        client.onmessage = (message) => {
            let res = JSON.parse(message.data);
            if(!res.error_)
                this.setState({
                    message: res.resp_[2],
                    success: true
                })
            setTimeout(() => { this.setState({ success: false })}, 5000)
            client.close();
        };
        client.onerror = (message) => {
            console.log(message);
        }
    }

    handlerChangeCheckBox(e){
        const { name, value } = e.target;
        this.setState({
            [name]: !!value
        })
    }

    handlerChange(e){
        const { value, name } = e.target;
        this.setState({
            [name]: value
        })
    }

    render(){
        const { dpropio, hotel, cabaña, domicilio, viaje, name, aboutme, linkTwitter, linkInstagram, age, distrito, departament, provincia, phone, phoneW } = this.state;
        return(
            <form onSubmit={this.handlerSubmit}>
                {this.state.success &&
                <div className="alert alert-success">
                    {this.state.message}
                </div>
                }
                <h3 className="mb-4" style={{color: 'gray'}}>Informacion para anunciar</h3>
                <div className="form-row">
                    <div className="form-group col-md-5">
                        <label for="inputName" style={{color: 'gray'}}>Nombre Anunciante</label>
                        <input type="text" name="name" className="form-control" style={{background: 'transparent', borderColor: 'gray', color: '#fff'}} onChange={this.handlerChange} id="inputName" value={name} placeholder="Nombre"/>
                    </div>
                    <div className="form-group col-md-3">
                        <label for="inputYears" style={{color: 'gray'}}>Edad Anunciante</label>
                        <input type="text" name="age" className="form-control" style={{background: 'transparent', borderColor: 'gray', color: '#fff'}} onChange={this.handlerChange} id="inputYears" value={age} placeholder="Edad"/>
                    </div>
                    <div className="form-group col-md-4">
                        <label for="inputFhone" style={{color: 'gray'}}>Telefono</label>
                        <input type="text" name="phone" className="form-control" style={{background: 'transparent', borderColor: 'gray', color: '#fff'}} onChange={this.handlerChange} id="inputphone" value={phone} placeholder="Numero telefonico"/>
                    </div>
                    
                    <div className="form-group col-md-4">
                        <label for="inputFhone" style={{color: 'gray'}}>Whatsapp</label>
                        <input type="text" name="phoneW" className="form-control" style={{background: 'transparent', borderColor: 'gray', color: '#fff'}} onChange={this.handlerChange} id="inputphone" value={phoneW} placeholder="Numero Whatsapp"/>
                    </div>
                    <div className="form-group col-md-4">
                        <label for="inputLastName" style={{color: 'gray'}}>Instagram</label>
                        <input type="text" name="linkInstagram" className="form-control" style={{background: 'transparent', borderColor: 'gray', color: '#fff'}} onChange={this.handlerChange} id="inputLastName" value={linkInstagram} placeholder="Link Instagram"/>
                    </div>
                    <div className="form-group col-md-4">
                        <label for="inputLastName" style={{color: 'gray'}}>Twitter</label>
                        <input type="text" name="linkTwitter" className="form-control" style={{background: 'transparent', borderColor: 'gray', color: '#fff'}} onChange={this.handlerChange} id="inputLastName" value={linkTwitter} placeholder="Link Twitter"/>
                    </div>
                </div>
                <h5 style={{color: 'gray'}} className="text-left pb-3 pt-3" id="Mi lugar de ubicacion">Mi lugar de ubicacion</h5>  
                <div className="form-row">
                    <div className="form-group col-md-4">
                        <label for="inputState" style={{color: 'gray'}}>Departamento</label>
                        <select id="inputState" className="form-control" name="departament" value={departament} onChange={this.handlerChange} style={{background: 'transparent', borderColor: 'gray', color: '#fff'}}>
                            <option selected>Selecionar...</option>
                            <option>...</option>
                        </select>
                    </div>
                    <div className="form-group col-md-4">
                        <label for="inputState" style={{color: 'gray'}}>Provincia</label>
                        <select id="inputState" className="form-control" name="provincia" value={provincia} onChange={this.handlerChange} style={{background: 'transparent', borderColor: 'gray', color: '#fff'}}>
                            <option selected>Selecionar...</option>
                            <option>...</option>
                        </select>
                    </div>
                    <div className="form-group col-md-4">
                        <label for="inputState" style={{color: 'gray'}}>Distrito</label>
                        <select id="inputState" className="form-control" name="distrito" value={distrito} onChange={this.handlerChange} style={{background: 'transparent', borderColor: 'gray', color: '#fff'}}>
                            <option selected>Selecionar...</option>
                            <option>...</option>
                        </select>
                    </div>
                </div>
                <h5 style={{color: 'gray'}} className="text-left pb-3 pt-3" id="commercial">Lugar de Atencion</h5>
                <section className="container form-inline" >
                    <div className="form-check mr-1">
                        <input className="form-check-input" type="checkbox" name="dpropio" onChange={this.handlerChangeCheckBox} value={dpropio} checked={dpropio ? true : false}/>
                        <label className="form-check-label" style={{color: 'gray'}}>
                            Dpto Propio
                        </label>
                    </div>
                    <div className="form-check mx-1">
                        <input className="form-check-input" type="checkbox" name="hotel" onChange={this.handlerChangeCheckBox} value={hotel} checked={hotel ? true : false} />
                        <label className="form-check-label" style={{color: 'gray'}}>
                            Hoteles
                        </label>
                    </div>
                    <div className="form-check mx-1">
                        <input className="form-check-input" type="checkbox" name="cabaña" onChange={this.handlerChangeCheckBox} value={cabaña} checked={cabaña ? true : false}/>
                        <label className="form-check-label" style={{color: 'gray'}}>
                            Cabañas
                        </label>
                    </div>
                    <div className="form-check mx-1">
                        <input className="form-check-input" type="checkbox" name="domicilio" onChange={this.handlerChangeCheckBox} value={domicilio} checked={domicilio ? true : false}/>
                        <label className="form-check-label" style={{color: 'gray'}}>
                            Domicilios
                        </label>
                    </div>
                    <div className="form-check mx-1">
                        <input className="form-check-input" type="checkbox" name="viaje" onChange={this.handlerChangeCheckBox} value={viaje} checked={viaje ? true : false}/>
                        <label className="form-check-label" style={{color: 'gray'}}>
                            Viajes
                        </label>
                    </div>
                </section>
                <h5 style={{color: 'gray'}} className="text-left pb-3 pt-3" id="commercial">Descripción sobre mi</h5> 
                <textarea name="aboutme" style={{background: 'transparent', borderColor: 'gray', color: '#fff'}} onChange={this.handlerChange} value={aboutme} className="form-control" rows="10" cols="40">Escribe sobre ti y tus servicio</textarea>
                
                <h5 style={{color: 'gray'}} className="text-left pb-3 pt-3" id="commercial">Mis servicios</h5>
                <label for="currency-field" style={{color: 'gray'}}>MI SEXO</label>
                <select name="transporte" className="custom-select" name="sexo" style={{background: 'transparent', borderColor: 'gray', color: '#fff'}}>
                    <option selected>Selecionar...</option>
                    <option value="text">HOMBRE</option>
                    <option value="2">MUJER</option>
                    <option value="3">TRANSESUAL</option>
                </select>
                <button className="btn btn-secreto-primary float-right mt-5" type="submit">Guardar y Enviar</button>
            </form>
        )
    }
}