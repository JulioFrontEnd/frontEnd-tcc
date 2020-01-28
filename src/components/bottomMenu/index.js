import React from 'react';
import {connect} from 'react-redux';
import './index.scss';

class BottomMenu extends React.Component{

    state = {
        classBottomMenu:"",
        classNames:{
            history:0,
            home:1,
            user:0,
        }
    }

    async componentDidMount(){
       let item = await ((localStorage.getItem('bottomMenu_classNames'))?localStorage.getItem('bottomMenu_classNames'):"home");
        await this.setState({
            classNames:""
        });

        this.setState({
            classNames:{
                [item]:1,
            }
        })
        
        window.onscroll = () => this.handleScroll();
    }

    handleScroll = ()=>{
        if(document.documentElement.scrollTop > 10){
            this.setState({classBottomMenu:"menu-disabled-content"});
        }else{
            this.setState({classBottomMenu:""});
        }
    }

    selectOption = async (valor,path="/menu")=>{

        await this.setState({
            className:""
        });
        await this.setState({classNames:{
            [valor]:1,
        }});

        await localStorage.setItem('bottomMenu_classNames',valor);
        
        window.location.href = path;
    }

    render(){
        const theme = this.props.theme;
        return(
            <div className={`bottom-menu bottom-menu-${theme} ${this.state.classBottomMenu}`}>
                <div onClick={()=>this.selectOption("history","/menu/history")} className={((this.state.classNames.history)?"clicked":"")}>
                    <i className="fas fa-history"></i>
                </div>
                
                <div onClick={()=>this.selectOption("home")} className={((this.state.classNames.home)?"clicked":"")}>
                    <i className="fas fa-home"></i>
                </div>

                <div onClick={()=>this.selectOption("user","/popop/user")} className={((this.state.classNames.user)?"clicked":"")}>
                    <i className="fas fa-user"></i>
                </div>
            </div>
        
        );
    }
}

export default connect(state=>({theme:state.actualTheme}))(BottomMenu);
