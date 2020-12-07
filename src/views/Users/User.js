import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Logo_Secreto from '../../images/SECRETOS_LOGO.png';
import '../../assets/modal/style.css';
import '../../assets/modal/responsive.css';
import '../../assets/style.css';
import '../../assets/responsive.css';
import NavbarUser from '../../components/NavbarUser';

export default class User extends Component{
    render(){
        return(
            <div style={{margin: 0, padding: 0, boxSizing: 'border-box', background: '#333'}}>
                <NavbarUser />
                <section id="intro">
                    <div className="container-fluid" data-aos-delay="100">
                        <div className="row">
                        <div className="col-lg-6">
                            <div className="image-container">
                                <img className="img-fluid" src={require("../../images/model_imagen_home.png")} />
                            </div>
                        </div>
                        <div className="col-lg-6 pt-4 mt-4">
                            <div className="text-container text-center">
                                <div className="partial-izq">
                                    <img className="img-fluid mb-4" src={Logo_Secreto} alt="alternative" />
                                    <div className="text-slogan">
                                        <h2>
                                            <span id="js-rotating">
                                            Todos Tus Deseos
                                            </span>
                                        </h2>
                                        <h3 className="text-white m-4">
                                            <span id="js-rotating1">
                                            Los Puedes Realizar aquí
                                            </span>
                                        </h3>
                                    </div>
                                    <div className="text mb-4">
                                        <Link to="/user/profile" className="btn btn-anunciate">
                                            ANUNCIATE
                                        </Link>
                                    </div>
                                    <img className="img-fluid mt-0" src={require("../../images/image_googlePlay.png")} style={{width: 160}} alt="alternative" />
                                    <span>a</span>
                                    <img className="img-fluid mt-0" src={require("../../images/image_appStore.png")} style={{width: 160}} alt="alternative" />
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}