import React from 'react';
import {connect} from 'react-redux';
import Form from '../_form';

class stockPlusCreate extends React.Component{
    render(){
        // configuração de telas
        const data = [
            {
                name:"Material_idMaterial ",
                option:["nome","preco"],
                parameter:"?nome=",
                format:"",
                type:"select",
                url:"/pesquisarMateriais",
                placeholder:"DIGITE O MATERIAL",
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
            {
                name:"data",
                option:false,
                format:false,
                type:"date",
                placeholder:"DIGITE A DATA",
                max:"10",
                value:""
            },
        ];
        const theme = this.props.theme;
        return(
            <div>
                <Form theme={theme} data={data} title="CRIE O ESTOQUE" url="/cadastrarEstoque" posUrl="/menu/stockPlus" update="false"/>
            </div>
        );
    }
}


export default connect(state=>({theme:state.actualTheme}))(stockPlusCreate);