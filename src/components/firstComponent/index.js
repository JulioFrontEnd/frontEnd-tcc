import React from 'react';
import './index.scss';
export default class Index extends React.Component{

    state = {
        color:"red",
    }

    alterarCor = ()=>{
        if(this.state.color === 'red'){
            this.setState({color:"blue"});
        }else{
            this.setState({color:"red"});
        }
    }

    render(){
        const color = {
            color: this.state.color
        }
        
        return(
            <div className="myFirstDiv">
                <h1 onClick={this.alterarCor} style={color}>
                    HELLO WORLD!
                </h1>
                <h2>
                    And hello Brazil!
                </h2>
            </div>
        );
    }
}