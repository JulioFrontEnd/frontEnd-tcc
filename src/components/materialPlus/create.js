import React from 'react';
import {connect} from 'react-redux';
import Form from '../_form';

class materialPlusCreate extends React.Component{
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
                name:"codigo",
                option:false,
                format:"",
                type:"text",
                placeholder:"DIGITE O CODIGO DO PRODUTO",
                max:"255",
                value:""
            },
            {
                name:"preco",
                option:false,
                format:"Valor completo EX: 100,00",
                type:"text",
                placeholder:"DIGITE O PREÇO",
                max:"255",
                value:""
            },
            {
                name:"Fornecedor_idFornecedor",
                option:["nome","cnpj"],
                parameter:"?nome=",
                format:"",
                type:"select",
                url:"/pesquisarFornecedores",
                placeholder:"DIGITE O FORNECEDOR",
                max:"255",
                value:"",
            },
            
        ];
        const theme = this.props.theme;
        return(
            <div>
                <Form theme={theme} data={data} title="ADICIONE O MATERIAL" url="/cadastrarMaterial" posUrl="/menu/materialPlus" update="false"/>
            </div>
        );
    }
}


export default connect(state=>({theme:state.actualTheme}))(materialPlusCreate);