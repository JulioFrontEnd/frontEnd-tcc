import React from 'react';
import {connect} from 'react-redux';
import List from '../_list';
import API from '../services/base';

class peoplePlusRead extends React.Component{
    state={
        popop:<div></div>,
        data:[],
    }

    close = ()=>{
        this.setState({popop:<div></div>});
    }

    delete = (id)=>{
        API.delete('/delete/'+id).then((response)=>{
            this.close();
            this.componentDidMount();
        });
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
                <div className="delete" onClick={()=>this.delete(id)}><i className="fas fa-trash-alt"></i></div>
                <div className="alter"><i className="fas fa-user-edit"></i></div>
                <div className="close" onClick={this.close}><i className="fas fa-times"></i></div>
            </div>



            <div className="special-content">
                <p><span>NOME: </span><br />{dataEspecifica.nome}</p>
                <p><span>CPF: </span><br />{dataEspecifica.CPF}</p>
                <p><span>DATA DE NASCIMENTO: </span><br />{dataEspecifica.dataDeNascimento.split("-").reduce(function(p, c){ return c + "-" +p })}</p>
                <p><span>RG: </span><br />{dataEspecifica.RG}</p>
                <p><span>ENDEREÇO: </span><br />{dataEspecifica.endereco}</p>
                <p><span>CEP: </span><br />{dataEspecifica.CEP}</p>
                <p><span>TELEFONE: </span><br />{dataEspecifica.telefone}</p>
                <p><span>NACIOALIDADE: </span><br />{dataEspecifica.nacionalidade}</p>
                <p><span>SEXO: </span><br />{((dataEspecifica.sexo)?"Masculino":"Feminino")}</p>
                <p><span>SITUAÇÃO: </span><br />{((dataEspecifica.ativo)?"ATIVO NO SISTEMA":"DESATIVADO NO SISTEMA")}</p>
                <p><span>DATA DE CADASTRO: </span><br />{dataEspecifica.created_at.split(" ",2).reduce(function(p, c){ return p}).split("-").reduce(function(p, c){ return c + "-" +p })}</p>
            </div>
        </div>;

        this.setState({
            popop:divder,
        });
    }
    
    
    componentDidMount(){
        API.get('/listarCliente').then((response)=>{
            this.setState({data:response.data,});
        });
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
                            <p className="secondary"><span>CPF:</span> {item.CPF}</p>
                        </div>
                    );
                })}
            </List>
        );
    }
}


export default connect(state=>({theme:state.actualTheme}))(peoplePlusRead);