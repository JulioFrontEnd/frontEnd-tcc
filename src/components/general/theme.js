import React from 'react';
import {connect} from 'react-redux';


class alterTheme extends React.Component{
    async componentDidMount(){
        if(localStorage.getItem('theme') === "dark"){
            await localStorage.setItem('theme',"light")
        }else{
            await localStorage.setItem('theme',"dark")
        }
        window.location.href = "./";
        
    }
    render(){
        return <div><h1>CARREGANDO...</h1></div>;
    }
}


export default connect(state=>({theme:state.actualTheme}))(alterTheme);