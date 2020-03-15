import React from 'react';
import './index.scss';
import Popop from '../_popop/index';

class Intermediate extends React.Component{
    state = {
        containerSuccess:<span></span>,
    }
    redirectTo(link){
        window.location.href = link;
    }
    componentDidMount(){
        const success = localStorage.getItem('popop-success');
        console.log(success)

        if(success === "true"){
            localStorage.setItem('popop-success',"false");
            this.setState({containerSuccess:<Popop theme={this.props.theme} msg="Os dados foram enviados com sucesso." type="success" />,});
        }
    }

    render(){
        // configuração de telas
        const data = this.props.data;
        const theme = this.props.theme;

        return(
            <div className={`main-page main-page-${theme} global-theme-${theme}`}>
                /
                {this.state.containerSuccess}
                <h2>{this.props.title}</h2>
                <div className="option-menu">
                {
                    data.map(item=>{
                        return( 
                            <div key={item.id} className="content" onClick={()=>this.redirectTo(item.path)}>
                                <div className="content-all">
                                <div className="icon">
                                    <i className={item.iconId}></i>
                                </div>
                                    <p>{item.title}</p>
                                </div>
                            </div>
                        )
                    })
                }
                </div>
            </div>
        );
    }
}


export default Intermediate;