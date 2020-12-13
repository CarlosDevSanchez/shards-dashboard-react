import React, { Component } from 'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";

const hombre = [
    'Gigoló',
    'Show Privado',
    'Pareja'
]
const mujer = [
    'Universitaria',
    'VIP',
    'Escort',
    'Acompañante',
    'Pareja',
    'Show Privado',
    'Milf',
    'Swinger'
]
const categories = [
    {
      name: 'Universitarias',
      image: require('../../images/categorias/image_universitaria.png'),
      paragraph: 'Pulsa aqui para ver más'
    },
    {
      name: 'VIP',
      image: require('../../images/categorias/image_vip.png'),
      paragraph: 'Pulsa aqui para ver más'
    },
    {
      name: 'Escorts',
      image: require('../../images/categorias/image_scort.png'),
      paragraph: 'Pulsa aqui para ver más'
    },
    {
      name: 'Acompañante',
      image: require('../../images/categorias/image_acompañante.png'),
      paragraph: 'Pulsa aqui para ver más'
    },
    {
      name: 'Pareja',
      image: require('../../images/categorias/image_pareja.png'),
      paragraph: 'Pulsa aqui para ver más'
    },
    {
      name: 'Gigoló',
      image: require('../../images/categorias/image_gigolo.png'),
      paragraph: 'Pulsa aqui para ver más'
    },
    {
      name: 'Show Privado',
      image: require('../../images/categorias/image_showprivado.png'),
      paragraph: 'Pulsa aqui para ver más'
    },
    {
      name: 'Milf',
      image: require('../../images/categorias/image_madura.png'),
      paragraph: 'Pulsa aqui para ver más'
    },
    {
      name: 'Swinger',
      image: require('../../images/categorias/image_swinger.png'),
      paragraph: 'Pulsa aqui para ver más'
    }
  ]

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
            message: '',
            category: '',
            hours1: 0,
            hours2: 0,
            hours3: 0,
            hours4: 0,
            amanecida: 0,
            findesemana: 0,
            sexo: ''
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
            console.log(res);
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
            category: this.state.category,
            hours1: this.state.hours1,
            hours2: this.state.hours2,
            hours3: this.state.hours3,
            hours4: this.state.hours4,
            amanecida: this.state.amanecida,
            findesemana: this.state.findesemana,
            sexo: this.state.sexo
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
        const { name, checked } = e.target;
        this.setState({
            [name]: checked
        })
    }

    handlerChange(e){
        const { value, name } = e.target;
        this.setState({
            [name]: value
        })
    }

    render(){
        const { dpropio, hotel, cabaña, domicilio, viaje, name, aboutme, linkTwitter, linkInstagram, age, distrito, departament, provincia, phone, phoneW, category, findesemana, amanecida, hours1, hours2, hours3, hours4, sexo } = this.state;
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
                    <div className="form-group col-md-3">
                        <label for="inputState" style={{color: 'gray'}}>Pais</label>
                        <select id="inputState" className="form-control" name="departament" value={departament} onChange={this.handlerChange} style={{background: 'transparent', borderColor: 'gray'}}>
                            <option selected>Selecionar...</option>
                            <option>...</option>
                        </select>
                    </div>
                    <div className="form-group col-md-3">
                        <label for="inputState" style={{color: 'gray'}}>Departamento</label>
                        <select id="inputState" className="form-control" name="departament" value={departament} onChange={this.handlerChange} style={{background: 'transparent', borderColor: 'gray'}}>
                            <option selected>Selecionar...</option>
                            <option>...</option>
                        </select>
                    </div>
                    <div className="form-group col-md-3">
                        <label for="inputState" style={{color: 'gray'}}>Provincia</label>
                        <select id="inputState" className="form-control" name="provincia" value={provincia} onChange={this.handlerChange} style={{background: 'transparent', borderColor: 'gray'}}>
                            <option selected>Selecionar...</option>
                            <option>...</option>
                        </select>
                    </div>
                    <div className="form-group col-md-3">
                        <label for="inputState" style={{color: 'gray'}}>Distrito</label>
                        <select id="inputState" className="form-control" name="distrito" value={distrito} onChange={this.handlerChange} style={{background: 'transparent', borderColor: 'gray'}}>
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
                <select name="transporte" className="custom-select" name="sexo" style={{background: 'transparent', borderColor: 'gray'}} value={sexo} onChange={this.handlerChange}>
                    <option>Selecionar...</option>
                    <option value="hombre">HOMBRE</option>
                    <option value="mujer">MUJER</option>
                    <option value="3">TRANSESUAL (Pronto)</option>
                    <option value="4">LESBIANA (Pronto)</option>
                </select>
                <h5 style={{color: 'gray'}} className="text-left pb-3 pt-3" id="commercial">Categorias</h5>
                <div className="row">
                {categories.map(category => (
                <div className="col-lg-4 col-md-6">
                  <div className="speaker text-center" data-aos="fade-up" data-aos-delay="100">
                    <img src={category.image} alt={category.name} className="img-fluid"/>
                    <div className="details">
                      <h5><a href="" className="text-white text-decoration-none">{category.name}</a></h5>
                      <div className="social">
                      </div>
                    </div>
                  </div>
                </div>
                ))}
                </div>
                <label for="currency-field" style={{color: 'gray'}}>Categoria de servicio</label>
                <select name="transporte" className="custom-select" name="category" style={{background: 'transparent', borderColor: 'gray'}} value={category} onChange={this.handlerChange}>
                    <option>Selecionar...</option>
                    {this.state.sexo === 'hombre' && hombre.map(row => (
                        <option value={row}>{row}</option>
                    ))
                    }
                    {this.state.sexo === 'mujer' && mujer.map(row => (
                        <option value={row}>{row}</option>
                    ))
                    }
                </select>
                <h5 className="mt-4" style={{color: 'gray'}}>Ingresar mi valor por servicio</h5>
                <p style={{color: 'gray'}}>
                RANGO DE PRECIOS "PRECIO SERVICIO" <br/>
                VIP: Tarifa de S/ 400.00 en adelante"<br/>
                PREMIUN: Tarifa Entre S/ 300.00 Y S/399.00 por hora"<br/>
                GOLD: Tarifa entre S/200.00 y S/299.00 por hora"<br/>
                SILVER : Tarifa por menos de S/199.00 por hora"</p>
                <h5 className="mt-4" style={{color: 'gray'}}>Descripcion Tarifas</h5>
                <div class="form-group row">
                    <label style={{color: 'gray'}} className="col-sm-4 col-form-label">1 Hora</label>
                    <div class="col-sm-8">
                        <input type="number" className="form-control" style={{background: 'transparent', borderColor: 'gray', color: '#fff'}}  name="hours1" value={hours1} onChange={this.handlerChange} placeholder="Precio"/>
                    </div>
                </div>
                <div class="form-group row">
                    <label style={{color: 'gray'}} className="col-sm-4 col-form-label">2 Hora</label>
                    <div class="col-sm-8">
                        <input type="number" className="form-control" style={{background: 'transparent', borderColor: 'gray', color: '#fff'}}  name="hours2" value={hours2} onChange={this.handlerChange} placeholder="Precio"/>
                    </div>
                </div>
                <div class="form-group row">
                    <label style={{color: 'gray'}} className="col-sm-4 col-form-label">3 Hora</label>
                    <div class="col-sm-8">
                        <input type="number" className="form-control" style={{background: 'transparent', borderColor: 'gray', color: '#fff'}}  name="hours3" value={hours3} onChange={this.handlerChange} placeholder="Precio"/>
                    </div>
                </div>
                <div class="form-group row">
                    <label style={{color: 'gray'}} className="col-sm-4 col-form-label">4 Hora</label>
                    <div class="col-sm-8">
                        <input type="number" className="form-control" style={{background: 'transparent', borderColor: 'gray', color: '#fff'}}  name="hours4" value={hours4} onChange={this.handlerChange} placeholder="Precio"/>
                    </div>
                </div>
                <div class="form-group row">
                    <label style={{color: 'gray'}} className="col-sm-4 col-form-label">Amanecida</label>
                    <div class="col-sm-8">
                        <input type="number" className="form-control" style={{background: 'transparent', borderColor: 'gray', color: '#fff'}}  name="amanecida" value={amanecida} onChange={this.handlerChange} placeholder="Precio"/>
                    </div>
                </div>
                <div class="form-group row">
                    <label style={{color: 'gray'}} className="col-sm-4 col-form-label">Fin de semana</label>
                    <div class="col-sm-8">
                        <input type="number" className="form-control" style={{background: 'transparent', borderColor: 'gray', color: '#fff'}}  name="findesemana" value={findesemana} onChange={this.handlerChange} placeholder="Precio"/>
                    </div>
                </div>
                <button className="btn btn-secreto-primary float-right mt-5" type="submit">Guardar y Enviar</button>
            </form>
        )
    }
}