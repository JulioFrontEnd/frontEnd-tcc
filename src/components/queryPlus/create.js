import React from 'react';
import {connect} from 'react-redux';
import Form from '../_form';

class queryPlusCreate extends React.Component{
    render(){
        // configuração de telas
        const data = [
            {
                name:"hora",
                option:false,
                format:false,
                type:"dataTime",
                placeholder:"DIGITE A HORA DE ATENDIMENTO",
                max:"255",
                value:""
            },
            {
                name:"Colaborador_idColaborador",
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
                name:"Cliente_idCliente",
                option:["nome","CPF"],
                parameter:"?nome=",
                format:"",
                type:"select",
                url:"/pesquisarClientes",
                placeholder:"DIGITE O CLIENTE",
                max:"255",
                value:"",
            },
            {
                name:"Procedimento_idProcedimento",
                option:["tipo","valor"],
                parameter:"?nome=",
                format:"",
                type:"select",
                url:"/pesquisarProcedimentos",
                placeholder:"DIGITE O PROCEDIMENTO",
                max:"255",
                value:"",
            },
        ];
        const theme = this.props.theme;
        return(
            <div>
                <Form theme={theme} data={data} title="MARQUE A CONSULTA" url="/cadastrarConsulta" posUrl="/menu/peoplePlus" update="false"/>
            </div>
        );
    }
}


export default connect(state=>({theme:state.actualTheme}))(queryPlusCreate);