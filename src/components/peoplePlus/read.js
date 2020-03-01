import React from 'react';
import {connect} from 'react-redux';
import List from '../_list';
import API from '../services/base';

class peoplePlusRead extends React.Component{
    state={
        popop:<div></div>,
        data:[],
        searchDefaultValue:"",
    }

    close = ()=>{
        this.setState({popop:<div></div>});
    }
    alterLink = (id)=>{
        window.location.href = "/popop/peoplePlus/update/"+id;
    }

    delete = (id)=>{
        console.log(id);
        API.delete('/deletarCliente/'+id).then((response)=>{
            this.close();
            this.componentDidMount();
        });
    }

    search = (e)=>{
        this.setState({searchDefaultValue:e.target.value});

        if(e.target.value !== ""){
            API.get("/pesquisarClientes?nome="+e.target.value).then((response)=>{
                this.setState({data:response.data,});
            });
        }else{
            this.componentDidMount();
        }
        
        
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
                <div className="delete" onClick={()=>this.delete(dataEspecifica.id)}><i className="fas fa-trash-alt"></i></div>
                <div className="alter" onClick={()=>this.alterLink(dataEspecifica.id)}><i className="fas fa-user-edit"></i></div>
                <div className="close" onClick={this.close}><i className="fas fa-times"></i></div>
            </div>



            <div className="special-content">
                <p><span>NOME: </span><br />{dataEspecifica.nome}</p>
                <p><span>CPF: </span><br />{dataEspecifica.CPF}</p>
                {
                ((dataEspecifica.Acompanhante_idAcompanhante !== null && dataEspecifica.Acompanhante_idAcompanhante !== undefined)?
                    <a className="linked" href={"/popop/companionPlus/read/"+dataEspecifica.Acompanhante_idAcompanhante}><p><span>CLIQUE PARA VER O ACOMPANHANTE</span></p></a>:"")
                }
                <p><span>DATA DE NASCIMENTO: </span><br />{dataEspecifica.dataDeNascimento.split("-").reduce(function(p, c){ return c + "-" +p })}</p>
                <p><span>RG: </span><br />{dataEspecifica.RG}</p>
                <p><span>ENDEREÇO: </span><br />{dataEspecifica.endereco}</p>
                <p><span>CEP: </span><br />{dataEspecifica.CEP}</p>
                <p><span>TELEFONE: </span><br />{dataEspecifica.telefone}</p>
                <p><span>NACIONALIDADE: </span><br />{dataEspecifica.nacionalidade}</p>
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
                <div className="list-input">
                    <input placeholder="DIGITE PARA PESQUISAR" onChange={this.search} value={this.state.searchDefaultValue} />
                    <div><i className="fas fa-search"></i></div>
                </div>
                {this.state.data.map(item=>{
                    return(
                        <div key={item.id} onClick={()=>this.popopShow(item.id)} className={"content "+((item.ativo === true)?"":"unable")}>
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