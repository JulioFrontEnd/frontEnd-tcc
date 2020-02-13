import React from 'react';
import {connect} from 'react-redux';
import List from '../_list';

class peoplePlusRead extends React.Component{
    state={
        popop:<div></div>,
        data:[],
    }

    close = ()=>{
        this.setState({popop:<div></div>})
    }
    // PRECISA SER CONFIGURADO
    popopShow = async (id)=>{
        const datas = await this.state.data;

        const dataEspecifica = await datas.find((d=>{
            return d.id === id;
        }));

        const divder = 
        <div className={"popop-read popop-read-"+this.props.theme}>
            <div className="icons-popop">
                <div className="delete"><i className="fas fa-trash-alt"></i></div>
                <div className="alter"><i className="fas fa-user-edit"></i></div>
                <div className="close" onClick={this.close}><i className="fas fa-times"></i></div>
            </div>



            <div className="special-content">
                <p><span>NOME: </span>{dataEspecifica.nome}</p>
                <p><span>CPF: </span>{dataEspecifica.cpf}</p>
                <p><span>RG: </span>{dataEspecifica.cpf}</p>
                <p><span>CEP: </span>{dataEspecifica.cpf}</p>
                <p><span>CEP: </span>{dataEspecifica.cpf}</p>
                <p><span>CEP: </span>{dataEspecifica.cpf}</p>
                <p><span>CEP: </span>{dataEspecifica.cpf}</p>
                <p><span>CEP: </span>{dataEspecifica.cpf}</p>
                <p><span>TELEFONE: </span>{dataEspecifica.cpf}</p>   
            </div> 
        </div>;

        this.setState({
            popop:divder,
        });
    }
    
    
    componentDidMount(){
        this.setState({data:[
            {
                id:1,
                nome:"Julio Silva",
                cpf:"XXX.XXX.XXX-XX"
            },{
                id:2,
                nome:"Jonathan Vinicius",
                cpf:"XXX.XXX.XXX-XX"
            },{
                id:3,
                nome:"Guilherme Augusto",
                cpf:"XXX.XXX.XXX-XX"
            },{
                id:4,
                nome:"Frederico Matias",
                cpf:"XXX.XXX.XXX-XX"
            },{
                id:5,
                nome:"Joseph Jostar",
                cpf:"XXX.XXX.XXX-XX"
            },{
                id:6,
                nome:"Outro nome ai",
                cpf:"XXX.XXX.XXX-XX"
            },{
                id:7,
                nome:"Ricardo Ohara",
                cpf:"XXX.XXX.XXX-XX"
            },
        ]})
    }
    render(){
        // configuração de telas
        const theme = this.props.theme;
        return(
            
            <List theme={theme} title="LISTA DE CLIENTES" popop={this.state.popop}>
                {this.state.data.map(item=>{
                    return(
                        <div key={item.id} onClick={()=>this.popopShow(item.id)} className="content">
                            <p className="principal"><span>NOME:</span> {item.nome}</p>
                            <p className="secondary"><span>CPF:</span> {item.cpf}</p>
                        </div>
                    );
                })}
            </List>
        );
    }
}


export default connect(state=>({theme:state.actualTheme}))(peoplePlusRead);