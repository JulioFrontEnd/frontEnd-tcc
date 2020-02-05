import React from 'react';
import './index.scss';

class Intermediate extends React.Component{

    redirectTo(link){
        window.location.href = link;
    }

    render(){
        // configuração de telas
        const data = this.props.data;

        const theme = this.props.theme;
        return(
            <div className={`main-page main-page-${theme} global-theme-${theme}`}>
                /
                <h2>{this.props.title}</h2>
                <div className="option-menu">
                {
                    data.map(item=>{
                        return( 
                            <div key={item.id} className="content" onClick={()=>this.redirectTo(item.path)}>
                                <div className="content-all">
                                <div>
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