import React from 'react';
import {connect} from 'react-redux';
import Form from '../_form';

class providerPlusCreate extends React.Component{
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
                name:"cnpj",
                option:false,
                format:"xx.xxx.xxx/xxxx-xx",
                type:"text",
                placeholder:"DIGITE SEU CNPJ",
                max:"18",
                value:""
            },
            {
                name:"CEP",
                option:false,
                format:"xxxxx-xxx",
                type:"text",
                placeholder:"DIGITE SEU CEP",
                max:"9",
                value:""
            },
            {
                name:"telefone",
                option:false,
                format:"(xxx) xxxxx-xxxx",
                type:"text",
                placeholder:"DIGITE SEU CELULAR",
                max:"16",
                value:""
            },
            {
                name:"endereco",
                option:false,
                format:false,
                type:"text",
                placeholder:"DIGITE SEU ENDEREÇO",
                max:"255",
                value:""
            },
        ];
        const theme = this.props.theme;
        return(
            <div>
                <Form theme={theme} data={data} title="ADICIONE O FORNECEDOR" url="/cadastrarFornecedores" posUrl="/menu/providerPlus" update="false"/>
            </div>
        );
    }
}


export default connect(state=>({theme:state.actualTheme}))(providerPlusCreate);