import React, {Component} from "react";
import "./styles.css";
import PCimage from "./Images/imgs-assets-bg.jpg";
import $ from 'jquery';
var tok = window.localStorage.getItem('token');


export default class Page1 extends Component {

    constructor() {
        super();    
       this.state = {login : [],email:'',password:''};
        this.postForm = this.postForm.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setPassword = this.setPassword.bind(this);
    }
    
      componentDidMount(){  
        $.ajax({
            url:"http://localhost:1337/",
            dataType: 'json',
            success:function(response){    
              this.setState({login:response});
            }.bind(this)
          } 
        );          
      }
    
      postForm(evento){
        evento.preventDefault();    
        $.ajax({
          url:'http://localhost:1337/',
          contentType:'application/json',
          dataType:'json',
          method:'post',
          data: JSON.stringify({email:this.state.email,password:this.state.password}),
          success: function(response){
            this.setState({login:response});        
          }.bind(this),
          error: function(response){
            console.log("error");
          }      
        });
      }

      setEmail(evento){
        this.setState({email:evento.target.value});
      }  
    
      setPassword(evento){
        this.setState({password:evento.target.value});
      } 

    render() {
        return (

            // start login div
            <body className="login">
                <div className = "rectangle">
                    <div className = "orange">ORANGE</div>

                    {/* register e-mail and password */}
                    <div className = "email">Email</div>
                    <form className = "rectangle-2" onSubmit={this.postForm} method="post">
                        <div className = "seunome-email-com">
                            <input name ="email" type = "email" placeholder="seunome@email.com" required="required" value={this.state.email} onChange={this.setEmail}></input>
                            <div className = "mail-anticom">✉</div>
                            <div className="password-rectangle">
                                <input className="password-2" name ="password" type = "password" placeholder="Password" required= "required" value={this.state.password} onChange={this.setPassword}></input>
                                <div className = "lock-anticon">🔒</div>
                            </div>
                        </div>
                        <div className = "rectangle-2-copy-3">
                            <button type="submit">Acessar</button>
                        </div>
                        <div className = "rectangle-2-copy-5">
                            <button type="submit" >Cadastrar</button>
                        </div>
                    </form>

                    <div className = "rectangle-2-copy-2"></div>
                    <div className = "mostrar-a-senha">Mostrar a senha.</div>
                    <div className = "problemas-para-acess">Problemas para acessar sua conta ?</div>


                    
                    <div className = "ou">ou</div>
                    <div className = "rectangle-2-copy-4"></div>

                    
                    <div className = "termos-de-uso-poli">Termos de uso  •  Política de privacidade</div>
                
                </div> 

                {/* image background */}
                <div className = "image">
                        <img src={PCimage} alt="Imagem1"/>
                    </div>             
        
            {/* end of login div */}
            </body>
        );
    }
}