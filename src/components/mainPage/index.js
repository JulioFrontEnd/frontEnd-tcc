import React from 'react';
import {connect} from 'react-redux';
import Intermediate from '../_intermediate';

class MainPage extends React.Component{
    render(){
        // configuração de telas
        const data = [
            {
                id:1,
                title:"Clientes",
                iconId:"fas fa-user-plus",
                path:"/menu/peoplePlus",
            },
            {
                id:2,
                title:"Acompanhante",
                iconId:"fas fa-user-friends",
                path:"/menu/companionPlus",
            },
            {
                id:3,
                title:"Funcionários",
                iconId:"fas fa-user-tie",
                path:"/menu/collaboratorPlus",
            },
            {
                id:4,
                title:"Dentistas",
                iconId:"fas fa-user-md",
                path:"/menu/dentistPlus",
            },
        ];
        const theme = this.props.theme;
        return(
            <div>
                <Intermediate theme={theme} data={data} title="ACESSO RÁPIDO" />
            </div>
        );
    }
}


export default connect(state=>({theme:state.actualTheme}))(MainPage);