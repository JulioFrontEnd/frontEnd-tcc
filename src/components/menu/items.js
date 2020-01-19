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
            },{
                id:2,
                name:"Configurações",
                icon:"fas fa-cog",
                link:"/popop/config",
            },{
                id:3,
                name:"Contato",
                icon:"fas fa-id-badge",
                link:"/popop/contact",
            }
        ];
        return(
                Items.map((item)=>{
                    let style = {
                        animation: "menu-items ."+item.id+"s",
                    }
                return(
                    <div className="menu-item" key={item.id} style={style}>
                        <i className={item.icon}></i>
                        <Link to={item.link}>{item.name}</Link>
                    </div>
                );
                })
        );
    }
}

