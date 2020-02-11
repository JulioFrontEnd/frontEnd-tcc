import React from 'react';
import {connect} from 'react-redux';
import './index.scss';
import SimpleBar from 'simplebar-react';

class UserPage extends React.Component{

    render(){
        const theme = this.props.theme;
        return(
            <div className={`user-page user-page-${theme}`}>
                <div className="container">
                    <SimpleBar style={{ minHeight: '300px' }} className="div">
                        <p className="i"><i className="far fa-user"></i></p>
                        <p><b>NOME:</b> Julio César da Silva Moreira</p>
                        <p><b>CARGO:</b> Programador Front End</p>
                        <p><b>CPF:</b> XXX.XXX.XXX-XX</p>
                        <p><b>SITUAÇÃO:</b> ATIVO NO SISTEMA</p>
                    </SimpleBar>
                </div>
            </div>
        );
    }
}


export default connect(state=>({theme:state.actualTheme}))(UserPage);