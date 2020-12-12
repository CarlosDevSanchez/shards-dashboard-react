import React, { Component } from 'react';
import '../../assets/modal/style.css';
import '../../assets/modal/responsive.css';
import './assets/css/style.css';
import '../../assets/responsive.css';
import NavbarUser from '../../components/NavbarUser';
import Dropzone from '../../components/Dropzone';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import FormularioPublico from '../../components/Formularios/FormularioPublico';
import WebCam from '../../components/WebCam';
export default class Profile extends Component{
    constructor(props){
        super(props)
        this.state = {
            viewActive: 'personal-data',
            name: '',
            lastName: '',
            document: '',
            country: '',
            phone: '',
            email: '',
            user: '',
            images: [],
            success: false
        }
        this.handlerSubmit = this.handlerSubmit.bind(this);
        this.handlerChange = this.handlerChange.bind(this);
    }

    componentDidMount(){
        const client = new W3CWebSocket('ws://localhost:5000');
        if(!localStorage.getItem('token'))
           window.location.href = "/home";
        client.onopen = () => {
            const dataI = {
                process_: "obtener_datos_usuarios",
                data_: {"token": localStorage.getItem('token')},
            };
            client.send(JSON.stringify(dataI));
        };
        client.onmessage = (message) => {
            let res = JSON.parse(message.data);
            console.log(res);
            const { name, lastName, document, email, country, phone, user, images } = res['resp_'][3];
            this.setState({
                name, lastName, document, email, country, phone, user, images
            })
            client.close();
        };
    }

    handlerSubmit(e){
        e.preventDefault();
        const client = new W3CWebSocket('ws://localhost:5000');
        const data = this.state;
        client.onopen = () => {
            const dataI = {
                process_: "actualizar_datos_usuario",
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

    handlerChange(e){
        const { value, name } = e.target;
        this.setState({
            [name]: value
        })
    }
    
    render(){
        const { name, lastName, document, email, country, phone, user, images } = this.state;
        return(
            <div style={{margin: 0, padding: 0, boxSizing: 'border-box'}}>
                <NavbarUser />
                <div className="container p-4" style={{marginTop: 80}}>
                    <div className="row">
                        <div className="col-md-4 col-sm-12">
                            <nav id="sidebar">
                                <div className="p-4 pt-5">
                                    <a href="#" className="img logo rounded-circle"><img src={require('../../images/secreto-touch-icon.png')}/></a>
                                    <p className="mb-3 mt-3 text-center">Mi usuario: {user}</p>
                                    <ul className="list-unstyled components mb-5" role="tablist">
                                        <li className="" role="presentation">
                                            <a href="javascript:void;" onClick={() => this.setState({ viewActive: 'personal-data' })}>Datos Personales</a>
                                        </li>
                                        <li role="presentation">
                                            <a href="javascript:void;" onClick={() => this.setState({ viewActive: 'anunciate' })}>Informacion para anunciar</a>
                                        </li>
                                        <li role="presentation">
                                            <a href="javascript:void;" onClick={() => this.setState({ viewActive: 'galeria' })}>Mi galeria</a>
                                        </li>
                                        <li role="presentation">
                                            <a href="javascript:void;" onClick={() => this.setState({ viewActive: 'pagos' })}>Pagos de las tarifas</a>
                                        </li>
                                        <li role="presentation">
                                            <a href="javascript:void;" onClick={() => this.setState({ viewActive: 'contacto' })}>Contacto</a>
                                        </li>
                                    </ul>
                                    <div className="footer">
                                        <p>
                                            Copyright &copy; {new Date().toLocaleDateString()} Todos los derechos reservados || <i className="icon-heart" aria-hidden="true"></i> de <a href="" target="_blank">secreto</a>
                                        </p>
                                    </div>
                                </div>
                            </nav>
                        </div>
                        <div className="col-md-8 col-sm-12">
                            <div style={{minHeight: '100%', background: '#1d1919', zIndex: 0}}>
                                {this.state.viewActive === 'personal-data' &&
                                <div className={"card card-body "} style={{background: '#1d1919'}}>
                                    <h3 className="mb-4" style={{color: 'gray'}}>Datos Personales</h3>
                                    <form onSubmit={this.handlerSubmit}>
                                        {this.state.success &&
                                        <div className="alert alert-success">
                                            {this.state.message}
                                        </div>
                                        }
                                        <div className="form-row">
                                            <div className="form-group col-md-6">
                                                <label for="inputName" style={{color: 'gray'}} >Nombre</label>
                                                <input type="text" name="name" className="form-control" style={{background: 'transparent', borderColor: 'gray'}} onChange={this.handlerChange} value={name} id="inputName" placeholder="Nombres" />
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label for="inputLastName" style={{color: 'gray'}} >Apellidos</label>
                                                <input type="text" name="lastName" className="form-control" style={{background: 'transparent', borderColor: 'gray'}} onChange={this.handlerChange} value={lastName} id="inputLastName" placeholder="Apellidos" />
                                            </div>
                                            <div className="form-group col-md-4">
                                                <label for="inputNationality" style={{color: 'gray'}} >Documento</label>
                                                <input type="text" className="form-control" name="document" style={{background: 'transparent', borderColor: 'gray'}} onChange={this.handlerChange} value={document} id="inputNationality" placeholder="Documento" />
                                            </div>
                                            <div className="form-group col-md-4">
                                                <label for="inputNationality" style={{color: 'gray'}} >Nacionalidad</label>
                                                <input type="text" className="form-control" name="country" style={{background: 'transparent', borderColor: 'gray'}} onChange={this.handlerChange} value={country} id="inputNationality" placeholder="Pais de origen" />
                                            </div>
                                            <div className="form-group col-md-4">
                                                <label for="inputFhone" style={{color: 'gray'}} >Telefono</label>
                                                <input type="text" className="form-control" name="phone" style={{background: 'transparent', borderColor: 'gray'}} onChange={this.handlerChange} value={phone} id="inputphone" placeholder="Numero telefonico" />
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group col-md-8">
                                                <label for="inputEmail4"  style={{color: 'gray'}} >Correo Electronico</label>
                                                <input type="email" className="form-control" style={{background: 'transparent', borderColor: 'gray'}} value={email}  id="inputEmail4" placeholder="Correo" />
                                            </div>
                                        </div>
                                        <button className="btn btn-secreto-primary float-right mt-5" type="submit">Guardar y Enviar</button>
                                    </form>
                                </div>
                                }
                                {this.state.viewActive === 'anunciate' &&
                                <div className={"card card-body"} style={{background: '#1d1919'}}>
                                    <FormularioPublico />
                                </div>
                                }
                                {this.state.viewActive === 'galeria' &&
                                <div className={"card card-body"} style={{background: '#1d1919'}}>
                                    <form>
                                        <h3 className="mb-4" style={{color: 'gray'}}>Mi Galeria</h3>
                                        <div className="row mb-3">
                                            {images.map(item => (
                                                <div className="col-md-4">
                                                    <a href="">
                                                        <img src={item} style={{width: '100%'}} />
                                                    </a>
                                                </div>
                                            ))}
                                        </div>
                                        <a href="" className="btn btn-anunciate" data-toggle="modal" data-target="#camera">Tomar selfie</a> 
                                    </form>
                                    
                                </div>
                                }
                                {this.state.viewActive === 'pagos' &&
                                    <div className={"card card-body"} style={{background: '#1d1919'}}>
                                        <form>
                                            <h3 style={{color: 'gray'}} className="mb-4" id="commercial">Mis Servicio</h3>
                                            <div className="form-group">
                                                <label for="currency-field" style={{color: 'gray'}}>CATEGORIA SILVER</label>
                                                <input type="text" name="currency-field" style={{background: 'transparent', borderColor: 'gray'}} className="form-control" pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$" value="" data-type="currency" placeholder="Tarifa por menos de S/199.00 por hora"/>
                                            </div>
                                            <div className="form-group">
                                                <label for="currency-field" style={{color: 'gray'}}>CATEGORIA GOLD</label>
                                                <input type="text" name="currency-field" style={{background: 'transparent', borderColor: 'gray'}} className="form-control" pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$" value="" data-type="currency" placeholder="Tarifa entre S/200.00 y S/299.00 por hora"/>
                                            </div>
                                            <div className="form-group">
                                                <label for="currency-field" style={{color: 'gray'}}>CATEGORIA PREMIUN</label>
                                                <input type="text" name="currency-field" style={{background: 'transparent', borderColor: 'gray'}} className="form-control" pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$" value="" data-type="currency" placeholder="Tarifa Entre S/ 300.00 Y S/399.00 por hora"/>
                                            </div>
                                            <div className="form-group">
                                                <label for="currency-field" style={{color: 'gray'}}>CATEGORIA VIP</label>
                                                <input type="text" name="currency-field" style={{background: 'transparent', borderColor: 'gray'}} className="form-control" pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$" value="" data-type="currency" placeholder="Tarifa de S/ 400.00 en adelante"/>
                                            </div>
                                            <button className="btn btn-secreto-primary float-right mt-5">Guardar y Enviar</button>
                                        </form>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                    <div class="modal fade" tabindex="-1" id="camera">
                        <div class="modal-dialog modal-sm">
                            <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title text-dark">Tomar Captura</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body row justify-content-center">
                                <WebCam />
                            </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}