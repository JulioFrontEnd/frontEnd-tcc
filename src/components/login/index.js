import React from 'react';
import './index.scss';
import logo from '../../img/icone-min.png';

class login extends React.Component{
    render(){
        return(
            <div className="container-login">
                <div className="container-login-popop">
                    <div className="popop-popop">
                    <div className="logotype-popop">
                        <img src={logo} alt="Logotype" />
                        <h2>MQUERY</h2>
                    </div>
                    <span className="form-login">
                        <input type="text" placeholder="LOGIN"/>
                        <br />
                        <input type="password" placeholder="SENHA"/>
                        <br />
                        <button>ENVIAR</button>
                    </span>
                    </div>
                </div>
            </div>
        );
    }
}


export default login;