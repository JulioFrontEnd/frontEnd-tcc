import React from 'react';
import {Link} from 'react-router-dom';

export default class ListItems extends React.Component{
    render(){

        // My Menu Items
        const Items = [
            {
                id:1,
                name:"Home",
                icon:"fas fa-home",
                link:"/menu/",
            }
            ,{
                id:2,
                name:"Alterar tema",
                icon:"fas fa-sun",
                link:"/alterarTema",
            }
        ];
        return(
                Items.map((item)=>{
                    let style = {
                        animation: "menu-items ."+item.id+"s",
                    }
                return(
                    <div className="menu-item" key={item.id} style={style}>
                        <span className="icon-item">
                            <i className={item.icon}></i>
                        </span>
                        <Link to={item.link}>{item.name}</Link>
                    </div>
                );
                })
        );
    }
}

