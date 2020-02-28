import React from 'react';
import {connect} from 'react-redux';
import API from "../services/base";
import Form from '../_form';

class companionPlusUpdate extends React.Component{
    state = {
        data:[]
    }
    async componentDidMount(){
        let {id} = this.props.match.params;
        let values = await API.get('/editarAcompanhante/'+id).then((Response)=>{return Response.data});

        this.setState({data:[
            {
                name:"nome",
                option:false,
                format:false,
                type:"text",
                placeholder:"DIGITE SEU NOME",
                max:"255",
                value:values[0].nome
            },
            {
                name:"CEP",
                option:false,
                format:"xxxxx-xxx",
                type:"text",
                placeholder:"DIGITE SEU CEP",
                max:"9",
                value:values[0].CEP
            },
            {
                name:"telefone",
                option:false,
                format:"(xx) xxxxx-xxxx",
                type:"text",
                placeholder:"DIGITE SEU CELULAR",
                max:"16",
                value:values[0].telefone
            },
            {
                name:"dataDeNascimento",
                option:false,
                format:"DD-MM-AAAA",
                type:"date",
                placeholder:"DATA DE NASCIMENTO",
                max:"10",
                value:values[0].dataDeNascimento
            },
            {
                name:"endereco",
                option:false,
                format:false,
                type:"text",
                placeholder:"DIGITE SEU ENDEREÇO",
                max:"255",
                value:values[0].endereco
            },
            {
                name:"nacionalidade",
                option:false,
                format:false,
                type:"text",
                placeholder:"DIGITE SUA NACIONALIDADE",
                max:"255",
                value:values[0].nacionalidade
            },
            {
                name:"sexo",
                option:["Masculino","Feminino"],
                format:false,
                type:"binary",
                placeholder:"DIGITE SEU SEXO",
                max:"255",
                value:((values[0].sexo === true)?1:0)
            },
            {
                name:"ativo",
                option:"",
                format:false,
                type:"hidden",
                placeholder:"",
                value:((values[0].ativo === true)?1:0),
                max:"255",
            },
            {
                name:"responsavel",
                option:["Sim","Não"],
                format:false,
                type:"binary",
                placeholder:"DIGITE SEU RESPONSAVEL?",
                max:"255",
                value:((values[0].value === true)?1:0),
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
                <Form theme={theme} data={data} title="Atualize o cliente" url={"/atualizarCliente/"+id} posUrl="/menu/peoplePlus" update="true"/>
            </div>
        );
    }
}


export default connect(state=>({theme:state.actualTheme}))(companionPlusUpdate);