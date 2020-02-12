import React from 'react';
import {connect} from 'react-redux';
import Intermediate from '../_intermediate';

class peoplePlus extends React.Component{
    render(){
        // configuração de telas
        const data = [
            {
                id:1,
                title:"ADICIONAR",
                iconId:"fas fa-user-plus",
                path:"/popop/peoplePlus/add",
            },
            {
                id:2,
                title:"LISTAR",
                iconId:"fas fa-user-plus",
                path:"/popop/peoplePlus/read",
            },
            
        ];
        const theme = this.props.theme;
        return(
            <div>
                <Intermediate theme={theme} data={data} title="GERENCIE OS CLIENTES" />
            </div>
        );
    }
}


export default connect(state=>({theme:state.actualTheme}))(peoplePlus);