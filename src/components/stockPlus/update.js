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
            <div className="icons-popop">
                <div className="close" onClick={()=>this.close(refresh)}><i className="fas fa-times"></i></div>
            </div>
            <div className="special-content">
                <p><span>QUANTIDADE: </span><br />{dataEspecifica.quantidade}</p>
                <p><span>DATA: </span><br />{dataEspecifica.created_at.split(" ",2).reduce(function(p, c){ return p}).split("-").reduce(function(p, c){ return c + "-" +p })}</p>
                {
                ((dataEspecifica.Colaborador_idColaborador !== null && dataEspecifica.Colaborador_idColaborador !== undefined)?
                    <a className="linked" href={"/popop/collaboratorPlus/read/"+dataEspecifica.Colaborador_idColaborador}><p><span>CLIQUE PARA VER O COLABORADOR</span></p></a>:"")
                }
                {
                ((dataEspecifica.Estoque_idEstoque !== null && dataEspecifica.Estoque_idEstoque !== undefined)?
                    <a className="linked" href={"/popop/stockPlus/read/"+dataEspecifica.Estoque_idEstoque}><p><span>CLIQUE PARA VER O ESTOQUE</span></p></a>:"")
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
            this.setState({data:response.data.entrada,classStyle:"",dataAll:response.data});
        });
    }

    primaryData = ()=>{
        this.setState({data:this.state.dataAll.entrada,classStyle:"",});
    }
    secondaryData = async ()=>{
        this.setState({data:this.state.dataAll.saida,classStyle:"saida",});
    }
    render(){
        // configuração de telas
        const theme = this.props.theme;
        return(
            
            <List theme={theme} title="Histórico de alterações" popop={this.state.popop}>
                {this.state.containerSuccess}
                <div className="content"  onClick={()=>this.primaryData()}>
                    <div className="btn-primary">ENTRADAS</div>
                </div>
                <div className="content saida" onClick={()=>this.secondaryData()}>
                    <div className="btn-danger">SAÍDAS</div>
                </div>
                
                {this.state.data.map(item=>{
                    return(
                        <div key={item.id} onClick={()=>this.popopShow(item.id)} className={"content "+this.state.classStyle}>
                            <p className="principal"><span>QUANTIDADE:</span> {item.quantidade}</p>
                            <p className="secondary"><span>DATA:</span> {item.created_at.split(" ",2).reduce(function(p, c){ return p}).split("-").reduce(function(p, c){ return c + "-" +p })}</p>
                        </div>
                    );
                })}
            </List>
        );
    }
}


export default connect(state=>({theme:state.actualTheme}))(stockPlusRead);