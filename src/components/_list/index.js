import React from 'react';
import './index.scss';



export default class list extends React.Component{
    state={
        popop:<div></div>,
        list:[],
    }
    
    
    componentDidMount(){
        this.setState({theme:this.props.theme,popop:this.props.popop});
    }
    render(){
        
        return(
            <div className={`list list-${this.state.theme}`}>
                {this.props.popop}
                <div>
                    <div>
                        <h2>{this.props.title}</h2>
                    </div>
                    {this.props.children}
                </div>
            </div>
        );
    }
}
