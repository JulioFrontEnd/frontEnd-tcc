import React from 'react';
import {connect} from 'react-redux';
import Form from '../_form';

class stockPlusAdd extends React.Component{
    render(){
        // configuração de telas
        const data = [
            {
                name:"Estoque_idEstoque",
                option:["nome","quantidade"],
                parameter:"?nome=",
                format:"",
                type:"select",
                url:"/pesquisarEstoque",
                placeholder:"DIGITE O ESTOQUE",
                max:"255",
                value:"",
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
                name:"quantidade",
                option:false,
                format:false,
                type:"text",
                placeholder:"DIGITE A QUANTIDADE",
                max:"255",
                value:""
            },
            
        ];
        const theme = this.props.theme;
        return(
            <div>
                <Form theme={theme} data={data} title="ABASTECIMENTO DE ESTOQUE" url="/Entrada" posUrl="/menu/stockPlus" update="false"/>
            </div>
        );
    }
}


export default connect(state=>({theme:state.actualTheme}))(stockPlusAdd);