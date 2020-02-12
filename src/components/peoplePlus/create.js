import React from 'react';
import {connect} from 'react-redux';
import Form from '../_form';

class peoplePlusCreate extends React.Component{
    render(){
        // configuração de telas
        const data = [
            {
                name:"nome",
                option:false,
                format:false,
                type:"text",
                placeholder:"DIGITE SEU NOME",
                max:"255",
            },
            {
                name:"CPF",
                option:false,
                format:"xxx.xxx.xxx-xx",
                type:"text",
                placeholder:"DIGITE SEU CPF",
                max:"14",
            },
            {
                name:"CEP",
                option:false,
                format:"xxxxx-xxx",
                type:"text",
                placeholder:"DIGITE SEU CEP",
                max:"9",
            },
            {
                name:"telefone",
                option:false,
                format:"(xx) xxxxx-xxxx",
                type:"text",
                placeholder:"DIGITE SEU CELULAR",
                max:"15",
            },
        ];
        const theme = this.props.theme;
        return(
            <div>
                <Form theme={theme} data={data} title="ADICIONE O CLIENTE" />
            </div>
        );
    }
}


export default connect(state=>({theme:state.actualTheme}))(peoplePlusCreate);