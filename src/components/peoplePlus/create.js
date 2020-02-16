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
                name:"RG",
                option:false,
                format:"Apenas numeros",
                type:"text",
                placeholder:"DIGITE SEU RG",
                max:"7",
            },
            {
                name:"telefone",
                option:false,
                format:"(xx) xxxxx-xxxx",
                type:"text",
                placeholder:"DIGITE SEU CELULAR",
                max:"16",
            },
            {
                name:"dataDeNascimento",
                option:false,
                format:"MM/DD/AAAA",
                type:"date",
                placeholder:"DATA DE NASCIMENTO",
                max:false,
            },
            {
                name:"endereco",
                option:false,
                format:false,
                type:"text",
                placeholder:"DIGITE SEU ENDEREÇO",
                max:"255",
            },
            {
                name:"nacionalidade",
                option:false,
                format:false,
                type:"text",
                placeholder:"DIGITE SUA NACIONALIDADE",
                max:"255",
            },
            {
                name:"sexo",
                option:["Masculino","Feminino"],
                format:false,
                type:"binary",
                placeholder:"DIGITE SEU SEXO",
                max:"255",
            },
            {
                name:"ativo",
                option:"",
                format:false,
                type:"hidden",
                placeholder:"",
                value:1,
                max:"255",
            },
        ];
        const theme = this.props.theme;
        return(
            <div>
                <Form theme={theme} data={data} title="ADICIONE O CLIENTE" url="/cadastrarCliente" posUrl="/popop/peoplePlus/read"/>
            </div>
        );
    }
}


export default connect(state=>({theme:state.actualTheme}))(peoplePlusCreate);