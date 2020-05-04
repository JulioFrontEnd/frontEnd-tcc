import React from 'react';
import './index.scss';
import logo from '../../img/icone-min.png';

class login extends React.Component{
    render(){
        return(
            <div className="container-login">
                <div>
                    <div>
                        <img src={logo} alt="Logotype" />
                        <h2>LOGIN</h2>
                    </div>
                    
                    <input type="text" placeholder="LOGIN"/>
                    <br />
                    <input type="password" placeholder="SENHA"/>
                    <br />
                    <button>ENVIAR</button>
                </div>
            </div>
        );
    }
}


export default login;