import React from 'react';
import {connect} from 'react-redux';
import Intermediate from '../_intermediate';

class stockPlus extends React.Component{
    render(){
        // configuração de telas
        const data = [
            {
                id:0,
                title:"ADICIONAR",
                iconId:"fas fa-arrow-up",
                path:"/popop/stockPlus/addStock",
            },
            {
                id:3,
                title:"REMOVER",
                iconId:"fas fa-arrow-down",
                path:"/popop/stockPlus/removeStock",
            },
            {
                id:1,
                title:"CADASTRAR",
                iconId:"fas fa-user-plus",
                path:"/popop/stockPlus/add",
            },
            {
                id:2,
                title:"LISTAR",
                iconId:"fas fa-list-ul",
                path:"/popop/stockPlus/read",
            },
            
        ];
        const theme = this.props.theme;
        return(
            <div>
                <Intermediate theme={theme} data={data} title="GERENCIE O ESTOQUE" />
            </div>
        );
    }
}


export default connect(state=>({theme:state.actualTheme}))(stockPlus);