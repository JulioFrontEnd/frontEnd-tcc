import React from 'react';
import {connect} from 'react-redux';
import API from "../services/base";
import Form from '../_form';

class medicalRecordPlusUpdate extends React.Component{
    state = {
        data:[],
    }
    async componentDidMount(){
        let {id} = this.props.match.params;
        let values = await API.get('/editarProntuarios/'+id).then((Response)=>{return Response.data});
        this.setState({data:[
            {
                name:"dataDeRetorno",
                option:false,
                format:false,
                type:"dataTime",
                placeholder:"DIGITE A DATA DE RETORNO",
                max:"255",
                value:values[0].dataDeRetorno
            },
            {
                name:"dataDoProcedimento",
                option:false,
                format:false,
                type:"dataTime",
                placeholder:"DIGITE A DATA DO PROCEDIMENTO",
                max:"255",
                value:values[0].dataDoProcedimento
            },
            {
                name:"numeracaoDoDente",
                option:false,
                format:false,
                type:"text",
                placeholder:"DIGITE A NUMERAÇÃO DO DENTE",
                max:"2",
                value:values[0].numeracaoDoDente,
            },
            {
                name:"Dentista_idDentista",
                option:["nome","CPF","CRO"],
                parameter:"?nome=",
                format:"",
                type:"hidden",
                url:"/pesquisarDentista",
                placeholder:"DIGITE O DENTISTA",
                max:"255",
                value:values.Dentista_idDentista,
            },
            {
                name:"Consulta_idConsulta",
                option:["nome","hora","tipo"],
                parameter:"?nome=",
                format:"",
                type:"hidden",
                url:"/pesquisarConsultas",
                placeholder:"DIGITE A CONSULTA ( PELO NOME DO CLIENTE )",
                max:"255",
                value:values.Consulta_idConsulta,
            },
        ]})
    }
    render(){
        const {id} = this.props.match.params;
        // configuração de telas
        const data = this.state.data;
        
        const theme = this.props.theme;
        return(
            <div>
                <Form theme={theme} data={data} title="ATUALIZE O PRONTUÁRIO" url={"/atualizarProntuarios/"+id} posUrl="/menu/medicalRecordPlus" update="true"/>
            </div>
        );
    }
}


export default connect(state=>({theme:state.actualTheme}))(medicalRecordPlusUpdate);