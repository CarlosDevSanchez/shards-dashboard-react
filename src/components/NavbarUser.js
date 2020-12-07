import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Logo_Secreto from '../images/SECRETOS_LOGO.png';
import '../assets/style.css';
import '../assets/responsive.css';
import { w3cwebsocket as W3CWebSocket } from "websocket";
const client = new W3CWebSocket('ws://localhost:5000');

export default class NavbarUser extends Component{
    constructor(props){
        super(props)
        
        this.state = {
            user: {}
        }
    }
    componentDidMount(){
        client.onopen = () => {
            console.log('WebSocket Client Connected');
            const dataI = {
                process_: "obtener_datos_usuarios",
                data_: {"token": localStorage.getItem('token')},
            };
            client.send(JSON.stringify(dataI));
        };
        client.onmessage = (message) => {
            let res = JSON.parse(message.data);
            this.setState({
                user: res['resp_'][3]
            })
            client.close();
        };
    }
    render(){
        return(
            <header id="header" className='header-scrolled'>
                <div className="container">
                    <div id="logo" className="pull-left">
                        <a href="javascript:void(0);" onClick={() => window.location.href = "/user/index"} className="scrollto"><img src={Logo_Secreto} alt="" title="" /></a>
                    </div>
                    <nav id="nav-menu-container">
                        <ul className="nav-menu">
                            <li className=""><a href="javascript:void(0);" onClick={() => window.location.href = "/user/index"}>Inicio</a></li>
                            <li className=""><a href="javascript:void(0);" onClick={() => window.location.href = "/user/profile"}>Mi Perfil</a></li>
                            <li className="px-1" style={{color: 'gray', marginTop: 6}}>Bienvenido(a): {this.state.user.user}</li>
                            <li className="buy-tickets"><a href="javascript:void(0);" onClick={() => {localStorage.clear(); window.location.href = "/home"}}>Salir</a></li>
                        </ul>
                    </nav>
                </div>
            </header>
        )
    }
}