import React from 'react';
import {connect} from 'react-redux';
import API from "../services/base";
import Form from '../_form';

class materialPlusUpdate extends React.Component{
    state = {
        data:[]
    }
    async componentDidMount(){
        let {id} = this.props.match.params;
        let values = await API.get('/editarMaterial/'+id).then((Response)=>{return Response.data});

        this.setState({data:[
            {
                name:"nome",
                option:false,
                format:false,
                type:"text",
                placeholder:"DIGITE SEU NOME",
                max:"255",
                value:values.nome
            },
            {
                name:"codigo",
                option:false,
                format:"",
                type:"text",
                placeholder:"DIGITE O CODIGO DO PRODUTO",
                max:"255",
                value:values.codigo
            },
            {
                name:"preco",
                option:false,
                format:"Valor completo EX: 100,00",
                type:"text",
                placeholder:"DIGITE O PREÇO",
                max:"255",
                value:((values.preco/100).toFixed(2)).toString().replace(".", ",")
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
                value:values.Fornecedor_idFornecedor,
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
                <Form theme={theme} data={data} title="Atualize o Material" url={"/atualizarMaterial/"+id} posUrl="/menu/materialPlus" update="true"/>
            </div>
        );
    }
}


export default connect(state=>({theme:state.actualTheme}))(materialPlusUpdate);