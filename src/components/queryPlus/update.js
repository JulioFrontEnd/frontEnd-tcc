import React from 'react';
import {connect} from 'react-redux';
import API from "../services/base";
import Form from '../_form';

class queryPlusUpdate extends React.Component{
    state = {
        data:[],
    }
    async componentDidMount(){
        let {id} = this.props.match.params;
        let values = await API.get('/editarConsulta/'+id).then((Response)=>{return Response.data});
        this.setState({data:[
            {
                name:"hora",
                option:false,
                format:false,
                type:"dataTime",
                placeholder:"DIGITE A HORA DE ATENDIMENTO",
                max:"255",
                value:values.hora,
            },
            {
                name:"Colaborador_idColaborador",
                option:["nome","CPF"],
                parameter:"?nome=",
                format:"",
                type:"hidden",
                url:"/pesquisarColaboradores",
                placeholder:"DIGITE O COLABORADOR",
                max:"255",
                value:values.Colaborador_idColaborador,
            },
            {
                name:"Cliente_idCliente",
                option:["nome","CPF"],
                parameter:"?nome=",
                format:"",
                type:"hidden",
                url:"/pesquisarClientes",
                placeholder:"DIGITE O CLIENTE",
                max:"255",
                value:values.Cliente_idCliente,
            },
            {
                name:"Procedimento_idProcedimento",
                option:["tipo","valor"],
                parameter:"?nome=",
                format:"",
                type:"hidden",
                url:"/pesquisarProcedimentos",
                placeholder:"DIGITE O PROCEDIMENTO",
                max:"255",
                value:values.Procedimento_idProcedimento,
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
                <Form theme={theme} data={data} title="ATUALIZE A CONSULTA" url={"/atualizarConsulta/"+id} posUrl="/menu/queryPlus" update="true"/>
            </div>
        );
    }
}


export default connect(state=>({theme:state.actualTheme}))(queryPlusUpdate);