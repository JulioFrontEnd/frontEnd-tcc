import React from 'react';
import {connect} from 'react-redux';
import API from "../services/base";
import Form from '../_form';

class providerPlusUpdate extends React.Component{
    state = {
        data:[]
    }
    async componentDidMount(){
        let {id} = this.props.match.params;
        let values = await API.get('/editarFornecedores/'+id).then((Response)=>{return Response.data});

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
                name:"cnpj",
                option:false,
                format:"xx.xxx.xxx/xxxx-xx",
                type:"text",
                placeholder:"DIGITE SEU CNPJ",
                max:"18",
                value:values.cnpj
            },
            {
                name:"CEP",
                option:false,
                format:"xxxxx-xxx",
                type:"text",
                placeholder:"DIGITE SEU CEP",
                max:"9",
                value:values.CEP
            },
            {
                name:"telefone",
                option:false,
                format:"(xxx) xxxxx-xxxx",
                type:"text",
                placeholder:"DIGITE SEU CELULAR",
                max:"16",
                value:values.telefone
            },
            {
                name:"endereco",
                option:false,
                format:false,
                type:"text",
                placeholder:"DIGITE SEU ENDEREÇO",
                max:"255",
                value:values.endereco
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
                <Form theme={theme} data={data} title="ATUALIZE O FORNECEDOR" url={"/atualizarFornecedores/"+id} posUrl="/menu/providerPlus" update="true"/>
            </div>
        );
    }
}


export default connect(state=>({theme:state.actualTheme}))(providerPlusUpdate);