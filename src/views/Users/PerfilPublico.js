import React, { Component } from 'react';
import '../../assets/modal/style.css';
import '../../assets/modal/responsive.css';
import '../../assets/style.css';
import '../../assets/responsive.css';
import NavbarUser from '../../components/NavbarUser';
import { w3cwebsocket as W3CWebSocket } from "websocket";

export default class PerfilPublico extends Component{
    constructor(props){
        super(props);
        this.state = {
            images: [],
        }
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
        client.onmessage = (resp) => {
            let res = JSON.parse(resp.data);
            const { images } = res['resp_'][3];
            const { aboutme, age, acabaña, departament, distrito, domicilio, dpropio, hotel, linkInstagram, linkTwitter, message, name, phone, phoneW, provincia, viaje } = res['resp_'][3].publico;
            this.setState({
                 images, aboutme, age, acabaña, departament, distrito, domicilio, dpropio, hotel, linkInstagram, linkTwitter, message, name, phone, phoneW, provincia, viaje
            })
            client.close();
        };
    }
    render(){
        return(
            <div style={{margin: 0, padding: 0, boxSizing: 'border-box'}}>
                <NavbarUser />
                <main className="main-page">
                    <section id="hotels" className="section-with-bg">
                        <div className="container" data-aos="fade-up">
                            <div className="section-header">
                                <h2>Perfil</h2>
                                <p>Que tus Deseos no se queden solo en miradas</p>
                            </div>
                            <div className="product-details-area ptb-130">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="product-details pr-40">
                                                {this.state.images.map((image , index) => (
                                                    <div className="easyzoom easyzoom--overlay mb-30">
                                                        <a>
                                                            <img src={image} />
                                                        </a>
                                                    </div>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="product-details-content text-center">
                                                <h1 className="">{this.state.name}</h1>
                                                <div className="quick-view-rating">
                                                    <div className="row justify-content-center">
                                                        <i className="fa fa-star reting-color"></i>
                                                        <i className="fa fa-star reting-color"></i>
                                                        <i className="fa fa-star reting-color"></i>
                                                        <i className="fa fa-star reting-color"></i>
                                                        <i className="fa fa-star reting-color"></i>
                                                        <h5 className="mt-2 mx-2">Calificación</h5>
                                                    </div>
                                                    <div className="product-share">
                                                        <h3 className="ml-0">Contactame O Visitame por estos Canales </h3>
                                                        <ul>
                                                            <li>
                                                                <a href={"https://api.whatsapp.com/send?phone=+51" + this.state.phoneW} target="_blank"><i className="fa fa-whatsapp" aria-hidden="true"></i></a>
                                                            </li>
                                                            <li>
                                                                <a href={this.state.phone} target="_blank"><i className="fa fa-phone" aria-hidden="true"></i></a>
                                                            </li>
                                                            <li>
                                                                <a href={this.state.linkInstagram} target="_blank"><i className="fa fa-instagram"></i></a>
                                                            </li>
                                                            <li>
                                                                <a href={this.state.linkTwitter} target="_blank"><i className="fa fa-twitter" aria-hidden="true"></i></a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="product-overview text-center">
                                                    <h2>Sobre Mi</h2>
                                                    <p>{this.state.aboutme}</p>
                                                </div>
                                            </div>
                                            <div className="product-price text-center">
                                                <h2>COSTOS DEL SERVICIO: </h2>
                                                <h5>30 Min. S/. 100.00</h5>
                                                <h5>1 Hora S/. 200.00</h5>
                                                <h5>2 Hora S/. 300.00</h5>
                                                <h5>3 Hora S/. 400.00</h5>
                                                <h5>4 Hora S/. 500.00</h5>
                                                <h5>Amanecidas S/. 500.00</h5>
                                            </div>
                                            <div className="product-categories text-center">
                                                <h3 className="">Categoria</h3>
                                                <ul>
                                                    <li>
                                                        <a href="#">Universitaria ,</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Vip ,</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Escort ,</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Milf ,</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Acompañante, </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        )
    }
}