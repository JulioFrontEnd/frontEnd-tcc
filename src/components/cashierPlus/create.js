import React from 'react';
import {connect} from 'react-redux';
import Form from '../_form';

class cashierPlusCreate extends React.Component{
    render(){
        // configuração de telas
        const data = [
            {
                name:"valor",
                option:false,
                format:"VALOR COMPLETO EX: 12,00",
                type:"text",
                placeholder:"DIGITE O VALOR",
                max:"255",
                value:""
            },
            {
                name:"tipoDeEntrada",
                option:["Entrada","Baixa"],
                format:false,
                type:"binary",
                placeholder:"TIPO DE TRANSAÇÂO",
                max:"255",
                value:1
            },
            {
                name:"colaborador",
                option:["nome","CPF"],
                parameter:"?nome=",
                format:"",
                type:"select",
                url:"/pesquisarColaboradores",
                placeholder:"DIGITE O COLABORADOR",
                max:"255",
                value:"",
            },
            {
                name:"consulta",
                option:["nome","hora","CPF","tipo"],
                parameter:"?nome=",
                format:"",
                type:"select",
                url:"/pesquisarConsultas",
                placeholder:"DIGITE A CONSULTA ( PELO NOME DO CLIENTE )",
                max:"255",
                value:"",
            },
        ];
        const theme = this.props.theme;
        return(
            <div>
                <Form theme={theme} data={data} title="CONTROLE O CAIXA" url="/EntradaCaixa" posUrl="/menu/cashierPlus" update="false" />
            </div>
        );
    }
}


export default connect(state=>({theme:state.actualTheme}))(cashierPlusCreate);