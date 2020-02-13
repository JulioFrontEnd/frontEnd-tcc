import React from 'react';
import {connect} from 'react-redux';
import './index.scss';

class Back extends React.Component{

    return = async ()=>{
        await localStorage.setItem('bottomMenu_classNames',"home");
        this.props.history.goBack();
    }
    render(){
        const theme = this.props.theme;

        return(
            <div className={`back back-${theme}`} onClick={this.return}>
                <i className="fas fa-arrow-left"></i>
            </div>
        
        );
    }
}

export default connect(state=>({theme:state.actualTheme}))(Back);
