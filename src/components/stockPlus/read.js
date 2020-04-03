import React from 'react';
import {connect} from 'react-redux';
import List from '../_list';
import API from '../services/base';
import Popop from '../_popop/index';

class stockPlusRead extends React.Component{
    
    state={
        popop:<div></div>,
        data:[],
        searchDefaultValue:"",
        containerSuccess:<span></span>,

    }

    close = (refresh=false)=>{
        if(refresh){
            this.props.history.goBack();
        }else{
            this.setState({popop:<div></div>});
        }
    }
    alterLink = (id)=>{
        window.location.href = "/popop/stockPlus/update/"+id;
    }

    delete = (id)=>{
        this.setState({containerSuccess:<Popop theme={this.props.theme} msg={<div className="confirm"><p>TEM CERTEZA?</p><br /><button onClick={()=>this.realDelete(id)}>CONFIRMAR</button></div>} type="error" reload={true} />,});
    }
    realDelete = (id)=>{
        API.delete('/deletarEstoque/'+id).then(async(response)=>{
            await localStorage.setItem('popop-success-list',"true");
            this.props.history.goBack();
        });
    }

    search = (e)=>{
        this.setState({searchDefaultValue:e.target.value});

        if(e.target.value !== ""){
            API.get("/pesquisarEstoque?nome="+e.target.value).then((response)=>{
                this.setState({data:response.data,});
            });
        }else{
            this.componentDidMount();
        }
        
        
    }
    
    // PRECISA SER CONFIGURADO
    popopShowing = (id)=>{
        window.location.href = "/popop/stockPlus/read/"+id;
    }
    popopShow = async (id,refresh=false)=>{
        const datas = await this.state.data;

        const dataEspecifica = await datas.find((d=>{
            return d.id === id;
        }));


        const divder = 
        <div className={"popop-read popop-read-"+this.props.theme}>
            <div className="icons-popop">
                <div className="delete" onClick={()=>this.delete(dataEspecifica.id)}><i className="fas fa-trash-alt"></i></div>
                <div className="alter" onClick={()=>this.alterLink(dataEspecifica.id)}><i className="fas fa-user-edit"></i></div>
                <div className="close" onClick={()=>this.close(refresh)}><i className="fas fa-times"></i></div>
            </div>



            <div className="special-content">
                <p><span>NOME: </span><br />{dataEspecifica.nome}</p>
                <p><span>QUANTIDADE: </span><br />{dataEspecifica.quantidade}</p>
                <p><span>CODIGO: </span><br />{dataEspecifica.codigo}</p>
                <p><span>DATA: </span><br />{dataEspecifica.data.split(" ",2).reduce(function(p, c){ return p}).split("-").reduce(function(p, c){ return c + "-" +p })}</p>

                {
                ((dataEspecifica.Material_idMaterial !== null && dataEspecifica.Material_idMaterial !== undefined)?
                    <a className="linked" href={"/popop/materialPlus/read/"+dataEspecifica.Material_idMaterial}><p><span>CLIQUE PARA VER O MATERIAL</span></p></a>:"")
                }
                {
                ((dataEspecifica.Fornecedor_idFornecedor !== null && dataEspecifica.Fornecedor_idFornecedor !== undefined)?
                    <a className="linked" href={"/popop/providerPlus/read/"+dataEspecifica.Fornecedor_idFornecedor}><p><span>CLIQUE PARA VER O FORNECEDOR</span></p></a>:"")
                }
            </div>
        </div>;

        this.setState({
            popop:divder,
        });
    }
    
    
    async componentDidMount(){
        await API.get('/listarEstoque').then((response)=>{
            this.setState({data:response.data,});
        });
        const {id} = this.props.match.params;
        if(id !== undefined){
            this.state.data.map(item=>{
                if(item.id === parseInt(id)){
                    return this.popopShow(parseInt(id),true);
                }else{
                    return false
                }
            })
        }
        const success = localStorage.getItem('popop-success-list');
        // eslint-disable-next-line
        if(success === "true"){
            localStorage.setItem('popop-success-list',"false");
            this.setState({containerSuccess:<Popop theme={this.props.theme} msg="Dado deletado com sucessso!" type="success" reload={true} />,});
        }
    }
    render(){
        // configuração de telas
        const theme = this.props.theme;
        return(
            
            <List theme={theme} title="LISTA DE MATERIAIS" popop={this.state.popop}>
                {this.state.containerSuccess}
                <div className="list-input">
                    <input placeholder="DIGITE PARA PESQUISAR" onChange={this.search} value={this.state.searchDefaultValue} />
                    <div><i className="fas fa-search"></i></div>
                </div>
                {this.state.data.map(item=>{
                    return(
                        <div key={item.id} onClick={()=>this.popopShowing(item.id)} className="content">
                            <p className="principal"><span>NOME:</span> {item.nome}</p>
                            <p className="secondary"><span>QUANTIDADE:</span> {item.quantidade}</p>
                        </div>
                    );
                })}
            </List>
        );
    }
}


export default connect(state=>({theme:state.actualTheme}))(stockPlusRead);