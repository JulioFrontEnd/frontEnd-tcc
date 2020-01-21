import React from 'react';
import {connect} from 'react-redux';
import './index.scss';

class MainPage extends React.Component{

    redirectTo(link){
        window.location.href = link;
    }

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
        ];










        const theme = this.props.theme;
        return(
            <div className={`main-page main-page-${theme}`}>
                /
                <h2>ACESSO RÁPIDO</h2>
                <div className="option-menu">
                {
                    data.map(item=>{
                        return( 
                            <div key={item.id} className="content" onClick={()=>this.redirectTo(item.path)}>
                                <div>
                                    <i className={item.iconId}></i>
                                </div>
                                <p>{item.title}</p>
                            </div>
                        )
                    })
                }
                </div>
            </div>
        );
    }
}


export default connect(state=>({theme:state.actualTheme}))(MainPage);