import React from 'react';
import {connect} from 'react-redux';
import List from '../_list';
import API from '../services/base';
import Popop from '../_popop/index';

class cashierPlusRead extends React.Component{
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
        window.location.href = "/popop/collaboratorPlus/update/"+id;
    }


    delete = (id)=>{
        this.setState({containerSuccess:<Popop theme={this.props.theme} msg={<div className="confirm"><p>TEM CERTEZA?</p><br /><button onClick={()=>this.realDelete(id)}>CONFIRMAR</button></div>} type="error" reload={true} />,});
    }
    realDelete = (id)=>{
        API.delete('/deletarColaboradores/'+id).then(async(response)=>{
            await localStorage.setItem('popop-success-list',"true");
            this.props.history.goBack();
        });
    }

    search = (e)=>{
        this.setState({searchDefaultValue:e.target.value});

        if(e.target.value !== ""){
            API.get("/pesquisarColaboradores?nome="+e.target.value).then((response)=>{
                this.setState({data:response.data,});
            });
        }else{
            this.componentDidMount();
        }
        
        
    }
    popopShowing = (id)=>{
        window.location.href = "/popop/cashierPlus/read/"+id;
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
                <p><span>VALOR: </span><br />{((dataEspecifica.valor/100).toFixed(2)).toString().replace(".", ",")}</p>
                <p><span>TIPO DE ENTRADA: </span><br />{((dataEspecifica.tipoDeEntrada === true)?"Entrada":"Saída")}</p>
                {((dataEspecifica.id_Colaborador !== null && dataEspecifica.id_Colaborador !== undefined)?
                    <a className="linked" href={"/popop/collaboratorPlus/read/"+dataEspecifica.id_Colaborador}><p><span>CLIQUE PARA VER O COLABORADOR</span></p></a>:"")
                }
                {
                ((dataEspecifica.id_Consulta  !== null && dataEspecifica.id_Consulta  !== undefined)?
                    <a className="linked" href={"/popop/queryPlus/read/"+dataEspecifica.id_Consulta }><p><span>CLIQUE PARA VER A CONSULTA</span></p></a>:"")
                }
            </div>
        </div>;

        this.setState({
            popop:divder,
        });
    }
    
    
    async componentDidMount(){
        await API.get('/ListarCaixa').then((response)=>{
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
        await API.get('/saldoTotal').then((response)=>{
            this.setState({saldo:response.data.saldo,});
        });
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
            
            <List theme={theme} title="HISTÓRICO DO CAIXA" popop={this.state.popop}>
                {this.state.containerSuccess}
                <div>
                    <h2>SALDO: {((this.state.saldo/100).toFixed(2)).toString().replace(".", ",")}</h2>
                </div>
                {this.state.data.map(item=>{
                    return(
                        <div key={item.id} onClick={()=>this.popopShowing(item.id)} className={"content "+((item.tipoDeEntrada === true)?"":"saida")}>
                            <p className="principal"><span>COLABORADOR:</span> {item.nome}</p>
                            <p className="secondary"><span>Valor:</span> {((item.valor/100).toFixed(2)).toString().replace(".", ",")}</p>
                        </div>
                    );
                })}
            </List>
        );
    }
}


export default connect(state=>({theme:state.actualTheme}))(cashierPlusRead);