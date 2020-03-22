import React from 'react';
import {connect} from 'react-redux';
import Form from '../_form';

class medicalRecordPlusCreate extends React.Component{
    render(){
        // configuração de telas
        const data = [
            {
                name:"dataDeRetorno",
                option:false,
                format:false,
                type:"dataTime",
                placeholder:"DIGITE A DATA DE RETORNO",
                max:"255",
                value:""
            },
            {
                name:"dataDoProcedimento",
                option:false,
                format:false,
                type:"dataTime",
                placeholder:"DIGITE A DATA DO PROCEDIMENTO",
                max:"255",
                value:""
            },
            {
                name:"numeracaoDoDente",
                option:false,
                format:false,
                type:"text",
                placeholder:"DIGITE A NUMERAÇÃO DO DENTE",
                max:"2",
                value:""
            },
            {
                name:"Dentista_idDentista",
                option:["nome","CPF","CRO"],
                parameter:"?nome=",
                format:"",
                type:"select",
                url:"/pesquisarDentista",
                placeholder:"DIGITE O DENTISTA",
                max:"255",
                value:"",
            },
            {
                name:"Consulta_idConsulta",
                option:["nome","hora","tipo"],
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
                <Form theme={theme} data={data} title="CADASTRE O PRONTUÁRIO" url="/cadastrarProntuarios" posUrl="/menu/medicalRecordPlus" update="false"/>
            </div>
        );
    }
}


export default connect(state=>({theme:state.actualTheme}))(medicalRecordPlusCreate);