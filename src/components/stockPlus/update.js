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

    
    // PRECISA SER CONFIGURADO
    popopShowing = (id)=>{
        window.location.href = "/popop/stockPlus/update/"+id;
    }
    popopShow = async (id,refresh=false)=>{
        const datas = await this.state.data;

        const dataEspecifica = await datas.find((d=>{
            return d.id === id;
        }));


        const divder = 
        <div className={"popop-read popop-read-"+this.props.theme}>
            <div className="special-content">
                <p><span>NOME: </span><br />{dataEspecifica.nome}</p>
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
        
        const {id} = this.props.match.params;
        API.get('/listarEntradaSaida/'+id).then((response)=>{
            this.setState({data:response.data,});
        });
    }
    render(){
        // configuração de telas
        const theme = this.props.theme;
        return(
            
            <List theme={theme} title="Histórico de alterações" popop={this.state.popop}>
                {this.state.containerSuccess}
                {this.state.data.map(item=>{
                    return(
                        <div key={item.id} onClick={()=>this.popopShow(item.id)} className="content">
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