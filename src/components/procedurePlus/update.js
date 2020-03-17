import React from 'react';
import {connect} from 'react-redux';
import API from "../services/base";
import Form from '../_form';

class procedurePlusUpdate extends React.Component{
    state = {
        data:[],
    }
    async componentDidMount(){
        let {id} = this.props.match.params;
        let values = await API.get('/editarProcedimento/'+id).then((Response)=>{return Response.data});

        this.setState({data:[
            {
                name:"tipo",
                option:false,
                format:false,
                type:"text",
                placeholder:"DIGITE O TIPO",
                max:"255",
                value:values.tipo
            },
            {
                name:"valor",
                option:false,
                format:"valor completo, exemplo: 1500,00",
                type:"text",
                placeholder:"DIGITE O PREÇO",
                max:"255",
                value:((values.valor/100).toFixed(2)).toString().replace(".", ",")
            },
            {
                name:"descricao",
                option:false,
                format:"Conte um pouco sobre o procedimento.",
                type:"text",
                placeholder:"DIGITE A DESCRIÇÃO",
                max:"255",
                value:values.descricao
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
                <Form theme={theme} data={data} title="ATUALIZE O PROCEDIMENTO" url={"/atualizarProcedimento/"+id} posUrl="/menu/procedurePlus" update="true"/>
            </div>
        );
    }
}


export default connect(state=>({theme:state.actualTheme}))(procedurePlusUpdate);