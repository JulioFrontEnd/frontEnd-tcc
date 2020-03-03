import React from 'react';
import {connect} from 'react-redux';
import Form from '../_form';

class collaboratorPlusCreate extends React.Component{
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
                value:""
            },
            {
                name:"cargo",
                option:false,
                format:false,
                type:"text",
                placeholder:"DIGITE SEU CARGO",
                max:"255",
                value:""
            },
            {
                name:"CPF",
                option:false,
                format:"xxx.xxx.xxx-xx",
                type:"text",
                placeholder:"DIGITE SEU CPF",
                max:"14",
                value:""
            },
            {
                name:"PIS",
                option:false,
                format:"XXX.XXXXX.XX-X",
                type:"text",
                placeholder:"DIGITE SEU PIS",
                max:"14",
                value:""
            },
            {
                name:"CEP",
                option:false,
                format:"xxxxx-xxx",
                type:"text",
                placeholder:"DIGITE SEU CEP",
                max:"9",
                value:""
            },
            {
                name:"RG",
                option:false,
                format:"Apenas numeros",
                type:"text",
                placeholder:"DIGITE SEU RG",
                max:"7",
                value:""
            },
            {
                name:"telefone",
                option:false,
                format:"(xxx) xxxxx-xxxx",
                type:"text",
                placeholder:"DIGITE SEU CELULAR",
                max:"16",
                value:""
            },
            {
                name:"dataDeNascimento",
                option:false,
                format:"DD-MM-AAAA",
                type:"date",
                placeholder:"DATA DE NASCIMENTO",
                max:"10",
                value:""
            },
            {
                name:"dataDeAdmissao",
                option:false,
                format:"DD-MM-AAAA",
                type:"date",
                placeholder:"DATA DE ADMISSÂO",
                max:"10",
                value:""
            },
            {
                name:"endereco",
                option:false,
                format:false,
                type:"text",
                placeholder:"DIGITE SEU ENDEREÇO",
                max:"255",
                value:""
            },
            {
                name:"nacionalidade",
                option:false,
                format:false,
                type:"text",
                placeholder:"DIGITE SUA NACIONALIDADE",
                max:"255",
                value:""
            },
            {
                name:"conta",
                option:false,
                format:false,
                type:"text",
                placeholder:"DIGITE SUA CONTA",
                max:"255",
                value:""
            },
            {
                name:"digito",
                option:false,
                format:false,
                type:"text",
                placeholder:"Dígito da conta",
                max:"1",
                value:""
            },
            {
                name:"tipoDaConta",
                option:false,
                format:false,
                type:"text",
                placeholder:"DIGITE O TIPO DA CONTA",
                max:"255",
                value:""
            },
            {
                name:"agencia",
                option:false,
                format:false,
                type:"text",
                placeholder:"DIGITE SUA AGENCIA",
                max:"4",
                value:""
            },
            {
                name:"banco",
                option:false,
                format:false,
                type:"text",
                placeholder:"DIGITE SEU BANCO",
                max:"255",
                value:""
            },
            {
                name:"salario",
                option:false,
                format:false,
                type:"text",
                placeholder:"DIGITE SEU SALÁRIO",
                max:"255",
                value:""
            },
            {
                name:"sexo",
                option:["Masculino","Feminino"],
                format:false,
                type:"binary",
                placeholder:"DIGITE SEU SEXO",
                max:"255",
                value:1
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
                <Form theme={theme} data={data} title="ADICIONE O FUNCIONÁRIO" url="/cadastrarColaboradores" posUrl="/menu/collaboratorPlus" update="false" />
            </div>
        );
    }
}


export default connect(state=>({theme:state.actualTheme}))(collaboratorPlusCreate);