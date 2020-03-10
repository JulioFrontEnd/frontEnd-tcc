import React from 'react';
import './index.scss';

export default class popopShow extends React.Component{
    state = {
        clear:{
            display:'flex',
        }
    }
    closePopop = ()=>{
        this.setState({clear:{display:'none'}})
        if(this.props.reload === true){
            window.location.reload();
        }
    }
    render(){
        const theme = ((this.props.theme===undefined)?"dark":this.props.theme);
        const type = ((this.props.type===undefined)?"sucess":this.props.type);
        return(
            <section className={"popop popop-"+type+"-"+theme} style={this.state.clear}>
                <span onClick={this.closePopop}><i className="fas fa-times"></i></span>
                <h3>{((type === 'error')?"ATENÇÂO!":"SUCESSO!")}</h3>
                <b>{this.props.msg}</b>
            </section>
        );
    }
}