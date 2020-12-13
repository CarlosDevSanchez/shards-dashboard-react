import React from 'react';
import Logo_Secreto from '../images/SECRETOS_LOGO.png';
import '../assets/modal/style.css';
import '../assets/modal/responsive.css';
import '../assets/style.css';
import '../assets/responsive.css';
import { w3cwebsocket as W3CWebSocket } from "websocket";

export default class Category extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            theposition: 0,
            category: '',
            users: []
        }
    }

    componentDidMount(){
        const params = this.props.location.state.detail
        this.setState({ category: params });
        window.addEventListener('scroll', this.listenToScroll)
        const client = new W3CWebSocket('ws://localhost:5000');
        let data = [];
        client.onopen = () => {
            const dataI = {
                process_: "obtener_usuarios_publicos",
                data_: {category: params },
            };
            client.send(JSON.stringify(dataI));
        };
        client.onmessage = (message) => {
            let res = JSON.parse(message.data);
            res.resp_[3].map(row => {
                if(row.publico){
                    if(row.publico.category !== undefined && row.publico.category.toLowerCase() === params)
                    data.push(row);
                }
            })
            this.setState({ users: data });
            client.close();
        };
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.listenToScroll)
    }
      
    listenToScroll = () => {
        const winScroll =
            document.body.scrollTop || document.documentElement.scrollTop
        
        const height =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight
        
        const scrolled = winScroll / height
        
        this.setState({
            theposition: scrolled,
        })
    }

    render(){
        return(
        <div style={{margin: 0, padding: 0, boxSizing: 'border-box', background: 'transparent'}}>
            <header id="header" className={this.state.theposition > 0.06756756756756757 ? 'header-scrolled' : ''}>
                <div className="container">
                    <div id="logo" className="pull-left">
                        <a href="#" className="scrollto"><img src={Logo_Secreto} alt="" title="" /></a>
                    </div>
                    <nav id="nav-menu-container">
                    <ul className="nav-menu">
                        <li><a href="/home">Inicio</a></li>
                        <li><a href="#about">Politicas</a></li>
                        <li><a href="#speakers">Categorias</a></li>
                        <li><a href="#hotels">Hoteles</a></li>
                        <li><a href="#subscribe">Boletin</a></li>
                        <li><a href="#gallery">Web</a></li>
                        <li><a href="#supporters">Sex Shop</a></li>
                        <li><a href="#contact">Contacto</a></li>
                    </ul>
                    </nav>
                </div>
            </header>
            <main className="main-page">
                <section id="hotels" className="section-with-bg">
                    <div className="container" data-aos="fade-up">
                        <div className="section-header">
                            <h2>{this.state.category}</h2>
                            <p>Que tus Deseos no se queden solo en miradas</p>
                        </div>
                        <div className="grid-list-product-wrapper tab-content">
                            <div id="new-product" className="product-grid product-view tab-pane active">
                                <div className="row">
                                    {this.state.users &&
                                        this.state.users.map((user, index) => (
                                        <div className="product-width col-md-6 col-xl-3 col-lg-6">
                                            <div className="product-wrapper mb-35">
                                                <div className="product-img">
                                                    <a href="perfil.html">
                                                        <img src={user.images[0]} alt=""/>
                                                    </a>
                                                    <div className="product-item-dec">
                                                        <ul>   
                                                            <li>{index+1}</li>
                                                        </ul>
                                                    </div>
                                                    <div className="product-action">
                                                        <a className="action-plus-2 p-action-none" title="Add To Cart" href={"https://api.whatsapp.com/send?phone=+51"+ user.publico.phoneW} target="_blank">
                                                            <i className="fa fa-whatsapp" aria-hidden="true"></i>
                                                        </a>
                                                        <a className="action-cart-2" title="Wishlist" href="#">
                                                            <i className="fa fa-heart"></i>
                                                        </a>
                                                        <a className="action-reload" title="Quick View" data-toggle="modal" data-target="#exampleModal" href="#">
                                                            <i className="fa fa-star" aria-hidden="true"></i>
                                                        </a>
                                                    </div>
                                                    <div className="product-content-wrapper text-white">
                                                        <div className="product-title-spreed">
                                                            <h4><a href="product-details.html">{user.publico.name || ''}</a></h4>
                                                            <div className="social">
                                                            <i className="fa fa-map-marker" aria-hidden="true"></i> {user.country || ''}
                                                        </div> 
                                                        <i className="fa fa-calendar" aria-hidden="true"></i> Edad:{user.publico.age || ''}
                                                        </div>
                                                        <div className="product-price text-white">
                                                            <span>S/. {user.publico.hours1 || ''}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="product-list-details">
                                                </div>
                                            </div>
                                        </div>
                                        ))
                                    }
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