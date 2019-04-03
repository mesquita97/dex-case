import React, {Component} from "react";
import "./styles.css";
import PCimage from "./Images/imgs-assets-bg.jpg";
import $ from 'jquery';

var Parse = require('parse/node');

Parse.initialize("OSGiFZBrXxNLjN3gYDPsgi7P4a0j6fzcc2iaCKga", "k8xm42UVuIP51wR2DswLY8NL3zgWfev8AuKUUjga");
Parse.serverURL = 'http://localhost:1337/parse'  


export default class Page1 extends Component {

    constructor() {
        super();    
        this.state = {login : [],email:'',password:''};
        this.postForm = this.postForm.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setPassword = this.setPassword.bind(this);
    }
    

    userLogin(event){
      $("#login").submit(function(event) {
          event.preventDefault();

          var eadress = $(this.email).val();
          var pass = $(this.password).val();

          Parse.User.logIn(eadress, pass, {
            success: function(user){
              console.log("login ok");
          }, error: function(user, error) {
                console.log("Login failed :" + error.message);
            }
          });
      });
    }

    userSignUp(event){
      $("#singup").submit(function(event) {
          event.preventDefault();

          var user = new Parse.User();
          
          user.set("email", this.email);
          user.set("password", this.password);

          user.signUp(null, {
            success: function(user){

            }, error: function(user, error) {
                console.log("sign up failed" + error.message);
            }
          });
      });
    }

    
      componentDidMount(){  
        $.ajax({
            url:"http://localhost:1337/parse",
            dataType: 'json',
            success:function(response){    

            }.bind(this)
          } 
        );          
      }
    
      postForm(evento){
        evento.preventDefault();    
        $.ajax({
          url:'http://localhost:1337/parse',
          contentType:'application/json',
          dataType:'json',
          method:'post',
          data: JSON.stringify({email:this.state.email,password:this.state.password}),

          success: function(response){

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
            <div className="login">

                <body className = "rectangle">
                    <div className = "orange">ORANGE</div>
                    {/* register e-mail and password */}
                    <div className = "email">Email</div>
                    <form className = "rectangle-2" action="/login">
                        <div className = "seunome-email-com">
                            <input name ="email" type = "email" placeholder="seunome@email.com" required="required" value={this.email} onChange={this.setEmail}></input>
                            <div className = "mail-anticom">✉</div>
                            <div className="password-rectangle">
                                <input className="password-2" name ="password" type = "password" placeholder="Password" required= "required" value={this.password} onChange={this.setPassword}></input>
                                <div className = "lock-anticon">🔒</div>
                            </div>
                        </div>
                        <div className = "rectangle-2-copy-3">
                            <button id="login" type="submit" onClick={this.userLogin}>Acessar</button>
                        </div>
                        <div className = "rectangle-2-copy-5">
                            <button id = "signup" onClick={this.userSignUp}>Cadastrar</button>
                        </div>
                    </form>

                    <div className = "rectangle-2-copy-2"></div>
                    <div className = "mostrar-a-senha">Mostrar a senha.</div>
                    <div className = "problemas-para-acess">Problemas para acessar sua conta ?</div>


                    
                    <div className = "ou">ou</div>
                    <div className = "rectangle-2-copy-4"></div>

                    
                    <div className = "termos-de-uso-poli">Termos de uso  •  Política de privacidade</div>
                
                </body> 

                {/* image background */}
                <div className = "image">
                        <img src={PCimage} alt="Imagem1"/>
                    </div>             
        
            {/* end of login div */}
            </div>
        );
    }
}

