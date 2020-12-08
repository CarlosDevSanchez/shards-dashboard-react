import React from 'react';
import ReCAPTCHA from "react-google-recaptcha"
import { w3cwebsocket as W3CWebSocket } from "websocket";
const client = new W3CWebSocket('ws://localhost:5000');

class MyComponentLogin extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            key: ''
        }
        this.handlerChange = this.handlerChange.bind(this);
        this.hanlderSubmitLogin = this.hanlderSubmitLogin.bind(this);
    }

    onRecaptcha = (e) => {
        this.setState({
            key: e
        })
    };


     hanlderSubmitLogin(e){
         e.preventDefault()
        const { email, password, key } = this.state
          if(this.validation('sesion')){
          const dataI = {
            process_: "verificar_usuario",
            data_: [email, password],
          };
          client.send(JSON.stringify(dataI));
          client.onmessage = (message) => {
            let res = JSON.parse(message.data);
            localStorage.setItem('token', res['resp_'][13]);
            if(!res.error_){
              window.location.href = "/user/index";
            }
          };
        }else{
          this.setState({
            message: 'Error de validacion de campos.'
          })
        }
      }

     handlerChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
     }

    validation(type){
        const { email, password, repetPassword, name, key } = this.state;
        let espacio = /\s/;
        let correo = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if(type === 'sesion'){
          if((correo.test(email) && !espacio.test(email) && email !== '') && (!espacio.test(password) && password !== ''))
            return true;
        }else{
          if((correo.test(email) && !espacio.test(email) && email !== '') && (!espacio.test(password) && password !== '') && (name !== '') && (password === repetPassword))
            return true;
        }
        if(!key) return true;
        return false;
    }

     render() {
       return (
         <div>
           <form onSubmit={this.hanlderSubmitLogin}>
                <div className="form-group">
                    <label for="email2">Dirección de correo electrónico</label>
                    <input type="email" name="email" className="form-control" id="email2"
                        aria-describedby="emailHelp" placeholder="Ingrese correo electrónico" value={this.state.email} onChange={this.handlerChange} />
                </div>
                <div className="form-group">
                    <label for="pass2">Contraseña</label>
                    <input type="password" name="password" id="pass2" className="form-control"
                        aria-describedby="emailHelp" placeholder="Introduce la contraseña" value={this.state.password} onChange={this.handlerChange} />
                </div>
                <div className="form-group">
                    <p className="text-center">Al registrarse, acepta nuestros <a href="#" className="text-danger">Términos de uso</a></p>
                </div>
                <ReCAPTCHA sitekey="6Ldxvv4ZAAAAABqDmPnHdJ4W9ghnCM4YoNghuVwb" onChange={this.onRecaptcha} />
                <button type="submit" className="btn btn-block mybtn btn-secreto-primary tx-tfm mt-1" onclick="">
                    INICIAR SESIÓN
                </button>
                <div className="col-md-12 ">
                    <div className="login-or">
                        <hr className="hr-or" />
                        <span className="span-or">o</span>
                    </div>
                </div>
                <div className="col-md-12 mb-3">
                    <p className="text-center">
                        <a href="javascript:void();" className="google btn mybtn"><i className="fa fa-google-plus">
                        </i> Registrarse usando Google
                        </a>
                    </p>
                </div>
                <div className="form-group text-center">
                    <p className="text-center text-dark">¿No tienes cuenta?
                        <a href="" id="signup" data-toggle="modal"
                        data-target="#modalContactForm" data-dismiss="modal">
                            <h5 className="text-dark p-2">Registrate aquí</h5>
                        </a>
                    </p>
                </div>
           </form>
         </div>
       );
     }
}

export default MyComponentLogin;