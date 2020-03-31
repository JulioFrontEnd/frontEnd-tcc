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
            {
                id:5,
                title:"Procedimentos",
                iconId:"fas fa-clipboard-list",
                path:"/menu/procedurePlus",
            },
            {
                id:6,
                title:"Consultas",
                iconId:"fas fa-clipboard-check",
                path:"/menu/queryPlus",
            },
            {
                id:7,
                title:"Prontuário",
                iconId:"fas fa-laptop-medical",
                path:"/menu/medicalRecordPlus",
            },
            {
                id:8,
                title:"Fornecedor",
                iconId:"fas fa-truck-loading",
                path:"/menu/providerPlus",
            },
            {
                id:9,
                title:"Material",
                iconId:"fas fa-boxes",
                path:"/menu/materialPlus",
            },
            {
                id:10,
                title:"Estoque",
                iconId:"fas fa-cubes",
                path:"/menu/stockPlus",
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