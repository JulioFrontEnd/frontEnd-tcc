import React from 'react';
import {connect} from 'react-redux';
import Intermediate from '../_intermediate';

class collaboratorPlus extends React.Component{
    render(){
        // configuração de telas
        const data = [
            {
                id:1,
                title:"ADICIONAR",
                iconId:"fas fa-user-plus",
                path:"/popop/collaboratorPlus/add",
            },
            {
                id:2,
                title:"LISTAR",
                iconId:"fas fa-list-ul",
                path:"/popop/collaboratorPlus/read",
            },
            
        ];
        const theme = this.props.theme;
        return(
            <div>
                <Intermediate theme={theme} data={data} title="GERENCIE OS FUNCIONÁRIOS" />
            </div>
        );
    }
}


export default connect(state=>({theme:state.actualTheme}))(collaboratorPlus);