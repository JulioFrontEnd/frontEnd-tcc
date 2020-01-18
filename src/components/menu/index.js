import React from 'react';
import {connect} from 'react-redux';
import logo from '../../img/icone.png';
import './index.scss';
import ListItems from './items';


class Menu extends React.Component{
    state = {
        enabled_menu:false,
        
        // MENU FADE
        style_menu:{

        },
    }

    alternateMenu = ()=>{
        this.setState({enabled_menu:(!(this.state.enabled_menu))});
    }

    render(){
        // HTML DO MENU
        const theme = this.props.theme;
        return(
            <div className={`menu menu-${theme}`}>
                <div className={((this.state.enabled_menu)?"menu-enabled-content":"menu-disabled-content")}>
                    <div className="close" onClick={this.alternateMenu}>
                        <i className="fas fa-times"></i>
                    </div>
                    <ListItems />
                </div>
                <div className={`menu-container`}>
                    <div className="logo">
                        <img alt='logo' src={logo} />
                    </div>
                    <div className="icon-bars" onClick={this.alternateMenu}>
                        <i className="fas fa-bars"></i>
                    </div>
                </div>

            </div>
        );
    }
}


export default connect(state=>({theme:state.actualTheme}))(Menu);