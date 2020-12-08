import React, { Component } from 'react';
import Logo_Secreto from '../images/SECRETOS_LOGO.png';
import '../assets/modal/style.css';
import '../assets/modal/responsive.css';
import '../assets/style.css';
import '../assets/responsive.css';
import MyComponent from '../components/MyComponent';
import { w3cwebsocket as W3CWebSocket } from "websocket";
const client = new W3CWebSocket('ws://localhost:5000');

export default class Home extends Component{

  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      repetPassword: '',
      name: '',
      message: '',
      success: '',
      style: {
        background: '#000000ab',
        height: 70,
        padding: '15px 0',
        transition: 'all 0.5s'
      },
      theposition: 0
    }

    this.handlerChange = this.handlerChange.bind(this);
    this.handlerSubmitRegister = this.handlerSubmitRegister.bind(this);
  }

  handlerChange(e){
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  componentDidMount(){
    client.onopen = () => {
      console.log('WebSocket Client Connected');
    };
    window.addEventListener('scroll', this.listenToScroll)
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

  

  handlerSubmitRegister(e){
    e.preventDefault()
    const { email, password, repetPassword, name } = this.state;
    if(this.validation('register')){
      const dataR = {
        process_: "crear_usuario",
        data_: [name, email, password, repetPassword],
      };
      client.send(JSON.stringify(dataR));
      client.onmessage = (message) => {
        let res = JSON.parse(message.data);
        if(!res.error_){
          this.setState({
            success: res.resp_[2]
          })
        }else{
          this.setState({
            message: res.resp_[2]
          })
        }
      };
    }else{
      this.setState({
        message: 'Error de validacion de campos.'
      })
    }
  }

  clearInputs(){
    this.setState({
      name: '',
      email: '',
      password: '',
      repetPassword: ''
    });
  }

  validation(type){
    const { email, password, repetPassword, name } = this.state;
    let espacio = /\s/;
    let correo = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if(type === 'sesion'){
      if((correo.test(email) && !espacio.test(email) && email !== '') && (!espacio.test(password) && password !== ''))
        return true;
    }else{
      if((correo.test(email) && !espacio.test(email) && email !== '') && (!espacio.test(password) && password !== '') && (name !== '') && (password === repetPassword))
        return true;
    }
    return false;
  }

  render(){
    return (
      <div style={{margin: 0, padding: 0, boxSizing: 'border-box', background: '#333'}}>
        <header id="header" className={this.state.theposition > 0.06756756756756757 ? 'header-scrolled' : ''}>
          <div className="container">
            <div id="logo" className="pull-left">
              <a href="#" className="scrollto"><img src={Logo_Secreto} alt="" title="" /></a>
            </div>
            <nav id="nav-menu-container">
              <ul className="nav-menu">
                <li className="menu-active"><a href="#">Inicio</a></li>
                <li><a href="#about">Politicas</a></li>
                <li><a href="#speakers">Categorias</a></li>
                <li><a href="#hotels">Hoteles</a></li>
                <li><a href="#subscribe">Boletin</a></li>
                <li><a href="#gallery">Web</a></li>
                <li><a href="#supporters">Sex Shop</a></li>
                <li><a href="#contact">Contacto</a></li>
                <li className="buy-tickets"><a href="" data-toggle="modal" data-target="#modalContactForm1">Anunciate</a></li>
              </ul>
            </nav>
          </div>
        </header>

        <section id="intro">
          <div className="container-fluid" data-aos-delay="100">
            <div className="row">
              <div className="col-lg-6">
                <div className="image-container">
                  <img className="img-fluid" src={require("../images/model_imagen_home.png")} />
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
                      <a href="#speakers" id="btn-anunciate" className="btn btn-default btn-rounded" >
                        ANUNCIATE
                      </a>
                    </div>
                    <img className="img-fluid mt-0" src={require("../images/image_googlePlay.png")} style={{width: 160}} alt="alternative" />
                    <span>a</span>
                    <img className="img-fluid mt-0" src={require("../images/image_appStore.png")} style={{width: 160}} alt="alternative" />
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="anuncio-lineal">
                  <h5>
                    En esta web apareceran fotos de contenido sexual o adulto,si eres menor de edad abandona el sitio con un
                    Click <a  href="#" style={{color: "rgb(255, 0, 0)", marginLeft: 1}}> AQUI. </a>
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </section>

        <main id="main">
          <main id="main">
          <section id="about">
            <div className="container" data-aos="fade-up">
              <div className="row">
                <div className="col-lg-17">
                  <div className="">
                    <div className="about-section">
                      <div style={{margin: 3, border: '2px solid #D7D0C1', borderRadius: 10}} className="container-fluid">
                        <center>
                          <h2>Anuncios eróticos</h2>
                          <div id="about-section-content" className="content">
                            <p style={{borderRadius: 40}}>
                              Secreto es el portal nuemero 1 donde las Escort y Kinesiologas visibilizan sus servicios para
                              asi recibir contactos desde la seguridad de su celular. Revisa nuestro catalogo de kines en
                              Peru y los perfiles de las modelos y Escort para escoger la que mas te guste.
                            </p>
                            <p>
                            Secreto trabaja sin descanso para que nuestras clientas puedan mantenerse independientes, no
                            tengan que trabajar por las calles, ni recurrir a alojamientos donde existen otros intereses.
                            </p>
                            <p>
                              Comparte tus experiencias, lee las experiencias de otros y dale un me gusta a la kine que
                              visites, esta comunidad se hace entre todos.
                            </p>
                            <p>
                            Secreto,se especializa en tener una pagina de calidad, obteniendo los mejores anuncios 100%
                            reales, cada anuncio pasa por un filtro donde se verifica. No aceptamos perfiles falsos o
                            robados de Escort, puedes enviar un correo o denuciar, estamos atentos para suspender a quienes
                            no cumplan con los terminos de Secreto.
                            </p>
                            <p>
                              Somos expertos en marketing para Escort y Kinesiologas, si bien en peru todavia tenemos mucho
                              por crecer, contamos con 5 años de experiencia en la industria Escort.
                            </p>
                          </div>
                        </center>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="speakers">
            <div className="container" data-aos="fade-up">
              <div className="section-header">
                <h2>CATEGORIAS</h2>
                <p>Todos tus Deseos Sexuales, Quedan en Secreto</p>
              </div>
              <div className="row">
                <div className="col-lg-4 col-md-6">
                  <div className="speaker" data-aos="fade-up" data-aos-delay="100">
                    <img src={require("../images/categorias/image_universitaria.png")} alt="universitarias" className="img-fluid"/>
                    <div className="details">
                      <h3><a href="">Universitarias</a></h3>
                      <p>Pulsa Aquí para ver Mas</p>
                      <div className="social">
                        <a href="" className="ml-1"><i className="fa fa-heart-o"></i></a>
                        <a href="" className="ml-1"><i className="fa fa-transgender"></i></a>
                        <a href="" className="ml-1"><i className="fa fa-whatsapp"></i></a>
                        <a href="" className="ml-1"><i className="fa fa-instagram"></i></a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="hotels" className="section-with-bg">
            <div className="container" data-aos="fade-up">
              <div className="section-header">
                <h2>HOTELES</h2>
                <p>Para que tus Momentos Sean Inolvidables</p>
              </div>
              <div className="row" data-aos="fade-up" data-aos-delay="100">
                <div className="col-lg-4 col-md-6">
                  <div className="hotel">
                    <div className="hotel-img">
                      <img src={require("../images/hotels/hotel_peru1.png")} alt="Hotel 1" className="img-fluid"/>
                    </div>
                    <h3><a href="#">Marriott</a></h3>
                    <div className="stars">
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                    </div>
                    <p>Miraflores Perú</p>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6">
                  <div className="hotel">
                    <div className="hotel-img">
                      <img src={require("../images/hotels/hotel_peru2.png")} alt="Hotel 2" className="img-fluid"/>
                    </div>
                    <h3><a href="#">Hilton Lima Miraflores</a></h3>
                    <div className="stars">
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star-half-full"></i>
                    </div>
                    <p>Lima Miraflores Perú</p>
                  </div>
                </div>

                <div className="col-lg-4 col-md-6">
                  <div className="hotel">
                    <div className="hotel-img">
                      <img src={require("../images/hotels/hotel_peru3.png")} alt="Hotel 2" className="img-fluid"/>
                    </div>
                    <h3><a href="#">Melia Lima</a></h3>
                    <div className="stars">
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                    </div>
                    <p>Meliá Lima</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section id="subscribe">
            <div className="container" data-aos="zoom-in">
              <div className="section-header">
                <h2>BOLETIN INFORMATIVO</h2>
                <p>Escríbenos para más sugerencias.</p>
              </div>
              <form>
                <div className="form-row justify-content-center">
                  <div className="col-auto">
                    <input type="text" className="form-control" placeholder="Introduce tu correo electrónico"/>
                  </div>
                  <div className="col-auto">
                    <button type="submit">Subscribe</button>
                  </div>
                </div>
              </form>
            </div>
          </section>
          <section id="contact" className="section-bg">
            <div className="container" data-aos="fade-up">
              <div className="section-header">
                <h2>CONTACTO</h2>
                <p>Contáctanos en los medios que aparecen aquí. Abajo.</p>
              </div>
              <div className="row contact-info">
                <div className="col-md-4">
                  <div className="contact-address">
                    <i className="ion-ios-location-outline"></i>
                    <h3>Dirección</h3>
                    <address>Avenida Jorge Basadre 49, San Isidro, Lima 27, Perú</address>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="contact-phone">
                    <i className="ion-ios-telephone-outline"></i>
                    <h3>Teléfono</h3>
                    <p><a href="tel:+52 975 570 481">+51 975 570 481</a></p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="contact-email">
                    <i className="ion-ios-email-outline"></i>
                    <h3>Correo</h3>
                    <p><a href="mailto:info@example.com">Secretoscort@gmail.com</a></p>
                  </div>
                </div>
              </div>
              <div className="form">
                <form action="forms/contact.php" method="post" role="form" className="php-email-form">
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <input type="text" name="name" className="form-control" id="name" placeholder="Su Nombre"
                        data-rule="minlen:4" data-msg="Please enter at least 4 chars" />
                      <div className="validate"></div>
                    </div>
                    <div className="form-group col-md-6">
                      <input type="email" className="form-control" name="email" id="email" placeholder="Su Correo"
                        data-rule="email" data-msg="Please enter a valid email" />
                      <div className="validate"></div>
                    </div>
                  </div>
                  <div className="form-group">
                    <input type="text" className="form-control" name="subject" id="subject" placeholder="Tema"
                      data-rule="minlen:4" data-msg="Please enter at least 8 chars of subject" />
                    <div className="validate"></div>
                  </div>
                  <div className="form-group">
                    <textarea className="form-control" name="message" rows="5" data-rule="required"
                      data-msg="Please write something for us" placeholder="Mensaje"></textarea>
                    <div className="validate"></div>
                  </div>
                  <div className="mb-3">
                    <div className="loading">Loading</div>
                    <div className="error-message"></div>
                    <div className="sent-message">Your message has been sent. Thank you!</div>
                  </div>
                  <div className="text-center"><button type="submit">ENVIAR</button></div>
                </form>
              </div>
            </div>
          </section>

          <footer id="footer" >
            <div className="footer-top">
              <div className="container">
                <div className="row">
                  <div className="col-lg-3 col-md-6 footer-info">
                    <img src={require("../images/logo.png")} alt="TheEvenet" />
                    <p>Deberías de tener el tiempo para hacerlo. los resultado son los mejores en Secreto y el placer en todo
                      momento, Cada encuentro tiene su fantasía. Tus deseos de impulsos de placer. Cuando lo Desees Solo
                      entras Aquí en Secreto</p>
                  </div>
                  <div className="col-lg-3 col-md-6 footer-links">
                    <h4>Useful Links</h4>
                    <ul>
                      <li><i className="fa fa-angle-right"></i> <a href="#">Inicio</a></li>
                      <li><i className="fa fa-angle-right"></i> <a href="#">About us</a></li>
                      <li><i className="fa fa-angle-right"></i> <a href="#">Services</a></li>
                      <li><i className="fa fa-angle-right"></i> <a href="#">Terms of service</a></li>
                      <li><i className="fa fa-angle-right"></i> <a href="#">Política y Privacidad</a></li>
                    </ul>
                  </div>
                  <div className="col-lg-3 col-md-6 footer-links">
                    <h4>Useful Links</h4>
                    <ul>
                      <li><i className="fa fa-angle-right"></i> <a href="#">Home</a></li>
                      <li><i className="fa fa-angle-right"></i> <a href="#">About us</a></li>
                      <li><i className="fa fa-angle-right"></i> <a href="#">Services</a></li>
                      <li><i className="fa fa-angle-right"></i> <a href="#">Terms of service</a></li>
                      <li><i className="fa fa-angle-right"></i> <a href="#">Política y Privacidad</a></li>
                    </ul>
                  </div>
                  <div className="col-lg-3 col-md-6 footer-contact">
                    <h4>Contacto</h4>
                    <p>
                      Avenida Jorge Basadre 49 <br/>
                      San Isidro, Lima 27<br/>
                      Perú<br/>
                      <strong>Teléfono:</strong> +51 975 570 481<br/>
                      <strong>Correo:</strong> Secretoscort@gmail.com<br/>
                    </p>
                    <div className="social-links">
                      <a href="#" className="fa fa-phone"></a>
                      <a href="#" className="fa fa-whatsapp"></a>
                      <a href="#" className="fa fa-instagram"></a>
                      <a href="#" className="fa fa-twitter"></a>
                      <a href="#" className="fa fa-facebook"></a>
                      <a href="#" className="fa fa-youtube-play"></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="container">
              <div className="copyright">
                &copy; Copyright <strong>Secreto</strong>. Todos los derechos reservados
              </div>
              <div className="credits">
                Diseñado por <a href="https://secreto.pe.com/">Secreto</a>
              </div>
            </div>
          </footer>
          </main>
        </main>

        <div className="col-md-6 modal" id="modalContactForm1">
          <div id="first">
            <div className="myform form">
                <div className="col-md-12 text-center">
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                  <img className="img-fluid mt-0" style={{width: 120}} src={require("../images/logo_modal.png")} alt="alternative" />
                  <h2 className="text-dark">Iniciar</h2>
                </div>
                {this.state.message &&
                  <div className="alert alert-danger">
                    {this.state.message}
                  </div>
                }
                <MyComponent />
            </div>
          </div>
        </div>

        <div className="col-md-6 modal" id="modalContactForm" data-backdrop="static" data-keyboard="false">
          <div className="myform form mb-4">
            <div className="logo mb-3">
              <div className="col-md-12 text-center form-inline">
                <a href="" className="text-dark mr-4" data-toggle="modal" data-target="#modalContactForm1" data-dismiss="modal">
                  <i className="fa fa-arrow-left"></i></a>
                <h2 className="ml-4 text-dark">Registrate</h2>
              </div>
            </div>
            <div className="col-md-12">
                {this.state.message &&
                  <div className="alert alert-danger">
                    {this.state.message}
                  </div>
                }
                {this.state.success &&
                  <div className="alert alert-success">
                    {this.state.success}
                  </div>
                }
              <form name="registration" onSubmit={this.handlerSubmitRegister}>
                <div className="form-group">
                  <label for="name3">Nombre</label>
                  <input type="text" name="name" className="form-control" id="name3"
                    aria-describedby="emailHelp" onChange={this.handlerChange} value={this.state.name} placeholder="Nombre de usuario"/>
                </div>
                <div className="form-group">
                  <label for="email3">Correo</label>
                  <input type="text" name="email" className="form-control" id="email3"
                    aria-describedby="emailHelp" onChange={this.handlerChange} value={this.state.email} placeholder="Correo electrónico"/>
                </div>
                <div className="form-group">
                  <label for="pass3">Contraseña</label>
                  <input type="password" name="password" onChange={this.handlerChange} value={this.state.password} className="form-control" id="pass3" aria-describedby="emailHelp"
                    placeholder="Contraseña"/>
                </div>
                <div className="form-group mb-4">
                  <label for="passw3">Contraseña</label>
                  <input type="password" name="repetPassword" onChange={this.handlerChange} value={this.state.repetPassword} id="passw3" className="form-control"
                    aria-describedby="emailHelp" placeholder="Repetir contraseña" />
                </div>
                <button type="submit" className="btn btn-block mybtn btn-secreto-primary tx-tfm mb-4">Empiece gratis</button>
              </form>
            </div>
          </div>
        </div>

      </div>
    )
  }
}
