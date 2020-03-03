import React from 'react';
import {connect} from 'react-redux';
import API from "../services/base";
import Form from '../_form';

class collaboratorPlusUpdate extends React.Component{
    state = {
        data:[]
    }
    async componentDidMount(){
        let {id} = this.props.match.params;
        let values = await API.get('/editarColaboradores/'+id).then((Response)=>{return Response.data});

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
                name:"cargo",
                option:false,
                format:false,
                type:"text",
                placeholder:"DIGITE SEU CARGO",
                max:"255",
                value:values[0].cargo
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
                name:"dataDeAdmissao",
                option:false,
                format:"DD-MM-AAAA",
                type:"date",
                placeholder:"DATA DE ADMISSÂO",
                max:"10",
                value:values[0].dataDeAdmissao
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
                name:"conta",
                option:false,
                format:false,
                type:"text",
                placeholder:"DIGITE SUA CONTA",
                max:"255",
                value:values[0].conta
            },
            {
                name:"digito",
                option:false,
                format:false,
                type:"text",
                placeholder:"Dígito da conta",
                max:"1",
                value:values[0].digito
            },
            {
                name:"tipoDaConta",
                option:false,
                format:false,
                type:"text",
                placeholder:"DIGITE O TIPO DA CONTA",
                max:"255",
                value:values[0].tipoDaConta
            },
            {
                name:"agencia",
                option:false,
                format:false,
                type:"text",
                placeholder:"DIGITE SUA AGENCIA",
                max:"4",
                value:values[0].agencia
            },
            {
                name:"banco",
                option:false,
                format:false,
                type:"text",
                placeholder:"DIGITE SEU BANCO",
                max:"255",
                value:values[0].banco
            },
            {
                name:"salario",
                option:false,
                format:false,
                type:"text",
                placeholder:"DIGITE SEU SALÁRIO",
                max:"255",
                value:((values[0].salario/100).toFixed(2)).toString().replace(".", ",")
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
                option:["Sim","Não"],
                format:false,
                type:"binary",
                placeholder:"ATIVO",
                value:((values[0].ativo === true)?1:0),
                max:"255",
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
                <Form theme={theme} data={data} title="Atualize o Funcionário" url={"/atualizarColaboradores/"+id} posUrl="/menu/collaboratorPlus" update="true"/>
            </div>
        );
    }
}


export default connect(state=>({theme:state.actualTheme}))(collaboratorPlusUpdate);