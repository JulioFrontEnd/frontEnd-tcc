import React from 'react';
import {connect} from 'react-redux';
import List from '../_list';
import API from '../services/base';
import Popop from '../_popop/index';

class medicalRecordPlusRead extends React.Component{
    
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
        window.location.href = "/popop/medicalRecordPlus/update/"+id;
    }

    delete = (id)=>{
        this.setState({containerSuccess:<Popop theme={this.props.theme} msg={<div className="confirm"><p>TEM CERTEZA?</p><br /><button onClick={()=>this.realDelete(id)}>CONFIRMAR</button></div>} type="error" reload={true} />,});
    }
    realDelete = (id)=>{
        API.delete('/deletarProntuarios/'+id).then(async(response)=>{
            await localStorage.setItem('popop-success-list',"true");
            window.location.reload();
        });
    }

    search = (e)=>{
        this.setState({searchDefaultValue:e.target.value});

        if(e.target.value !== ""){
            API.get("/pesquisarProntuarios?nome="+e.target.value).then((response)=>{
                this.setState({data:response.data,});
            });
        }else{
            this.componentDidMount();
        }
        
        
    }
    popopShowing = (id)=>{
        window.location.href = "/popop/medicalRecordPlus/read/"+id;
    }
    // PRECISA SER CONFIGURADO
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
                <p><span>DATA DO PROCEDIMENTO: </span><br />{dataEspecifica.dataDoProcedimento.split(" ",2).reduce(function(p, c){ return p}).split("-").reduce(function(p, c){ return c + "-" +p })}</p>
                <p><span>DATA DE RETORNO: </span><br />{dataEspecifica.dataDeRetorno.split(" ",2).reduce(function(p, c){ return p}).split("-").reduce(function(p, c){ return c + "-" +p })}</p>
                {
                ((dataEspecifica.Consulta_idConsulta !== null && dataEspecifica.Consulta_idConsulta !== undefined)?
                    <a className="linked" href={"/popop/queryPlus/read/"+dataEspecifica.Consulta_idConsulta}><p><span>CLIQUE PARA VER A CONSULTA</span></p></a>:"")
                }
                {
                ((dataEspecifica.Dentista_idDentista !== null && dataEspecifica.Dentista_idDentista !== undefined)?
                    <a className="linked" href={"/popop/dentistPlus/read/"+dataEspecifica.Dentista_idDentista}><p><span>CLIQUE PARA VER O DENTISTA</span></p></a>:"")
                }
            </div>
        </div>;

        this.setState({
            popop:divder,
        });
    }
    
    
    async componentDidMount(){
        await API.get('/listarProntuarios').then((response)=>{
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
            
            <List theme={theme} title="LISTA DE PRONTUÁRIOS" popop={this.state.popop}>
                {this.state.containerSuccess}
                <div className="list-input">
                    <input placeholder="DIGITE PARA PESQUISAR" onChange={this.search} value={this.state.searchDefaultValue} />
                    <div><i className="fas fa-search"></i></div>
                </div>
                {this.state.data.map(item=>{
                    return(
                        <div key={item.id} onClick={()=>this.popopShowing(item.id)} className="content">
                            <p className="principal"><span>NOME:</span> {item.nome}</p>
                            <p className="secondary"><span>DATA:</span> {item.dataDoProcedimento.split(" ",2).reduce(function(p, c){ return p}).split("-").reduce(function(p, c){ return c + "-" +p })}</p>
                            <p className="secondary"><span>RETORNO:</span> {item.dataDeRetorno.split(" ",2).reduce(function(p, c){ return c+" "+p.split("-").reduce(function(p, c){ return c + "-" +p })})}</p>
                        </div>
                    );
                })}
            </List>
        );
    }
}


export default connect(state=>({theme:state.actualTheme}))(medicalRecordPlusRead);