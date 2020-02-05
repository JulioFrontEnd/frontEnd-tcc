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
                title:"Clientes",
                iconId:"fas fa-user-plus",
                path:"/menu/peoplePlus",
            },
            {
                id:3,
                title:"Clientes",
                iconId:"fas fa-user-plus",
                path:"/menu/peoplePlus",
            },
            {
                id:4,
                title:"Clientes",
                iconId:"fas fa-user-plus",
                path:"/menu/peoplePlus",
            },
            {
                id:4,
                title:"Clientes",
                iconId:"fas fa-user-plus",
                path:"/menu/peoplePlus",
            },
            {
                id:4,
                title:"Clientes",
                iconId:"fas fa-user-plus",
                path:"/menu/peoplePlus",
            },
            {
                id:4,
                title:"Clientes",
                iconId:"fas fa-user-plus",
                path:"/menu/peoplePlus",
            },
            {
                id:4,
                title:"Clientes",
                iconId:"fas fa-user-plus",
                path:"/menu/peoplePlus",
            },{
                id:4,
                title:"Clientes",
                iconId:"fas fa-user-plus",
                path:"/menu/peoplePlus",
            },{
                id:4,
                title:"Clientes",
                iconId:"fas fa-user-plus",
                path:"/menu/peoplePlus",
            },{
                id:4,
                title:"Clientes",
                iconId:"fas fa-user-plus",
                path:"/menu/peoplePlus",
            },{
                id:4,
                title:"Clientes",
                iconId:"fas fa-user-plus",
                path:"/menu/peoplePlus",
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