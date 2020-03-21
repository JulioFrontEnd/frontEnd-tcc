import React from 'react';
import {connect} from 'react-redux';
import Form from '../_form';

class medicalRecordPlusCreate extends React.Component{
    render(){
        // configuração de telas
        const data = [
            {
                name:"tipo",
                option:false,
                format:false,
                type:"text",
                placeholder:"DIGITE O TIPO",
                max:"255",
                value:""
            },
            {
                name:"valor",
                option:false,
                format:"valor completo, exemplo: 1500,00",
                type:"text",
                placeholder:"DIGITE O PREÇO",
                max:"255",
                value:""
            },
            {
                name:"descricao",
                option:false,
                format:"Conte um pouco sobre o procedimento.",
                type:"text",
                placeholder:"DIGITE A DESCRIÇÃO",
                max:"255",
                value:""
            },
        ];
        const theme = this.props.theme;
        return(
            <div>
                <Form theme={theme} data={data} title="CADASTRE O PRONTUÁRIO" url="/cadastrarDentista" posUrl="/menu/medicalRecordPlus" update="false"/>
            </div>
        );
    }
}


export default connect(state=>({theme:state.actualTheme}))(medicalRecordPlusCreate);