import React from 'react';
import ReactToPrint from 'react-to-print';
import './index.scss';
import {connect} from 'react-redux';
import logo from '../../img/icone-min.png';
import API from '../services/base';
 

/**
 * {((dataEspecifica.dataDeRetorno !== null && dataEspecifica.dataDeRetorno !== undefined)?<p className="secondary"><span>DATA DE RETORNO:</span> {dataEspecifica.dataDeRetorno.split(" ",2).reduce(function(p, c){ return c+" "+p.split("-").reduce(function(p, c){ return c + "-" +p })})}</p>:"")}
                <p><span>DATA DO PROCEDIMENTO: </span><br />{dataEspecifica.dataDoProcedimento.split(" ",2).reduce(function(p, c){ return c+" "+p.split("-").reduce(function(p, c){ return c + "-" +p })})}</p>
                {
                ((dataEspecifica.Consulta_idConsulta !== null && dataEspecifica.Consulta_idConsulta !== undefined)?
                    <a className="linked" href={"/popop/queryPlus/read/"+dataEspecifica.Consulta_idConsulta}><p><span>CLIQUE PARA VER A CONSULTA</span></p></a>:"")
                }
                {
                ((dataEspecifica.Dentista_idDentista !== null && dataEspecifica.Dentista_idDentista !== undefined)?
                    <a className="linked" href={"/popop/dentistPlus/read/"+dataEspecifica.Dentista_idDentista}><p><span>CLIQUE PARA VER O DENTISTA</span></p></a>:"")
    }
 */

class ComponentToPrint extends React.Component {
  render() {
      if(this.props.data.queryInformation !== undefined){
        console.log(this.props.data)
        return (
            <div>
                <div className="special-content">
                    <div className="logotype">
                        <img alt='logo' src={logo} />
                    </div>
                    <div className="contentMain" style={({backgroundColor:"red",})}>
                        <span>IMPRESSÃO AINDA NÃO FOI TOTALMENTE PROGRAMADA</span>
                    </div>
                </div>
            </div>
        );
      }else{
        return (
            <div>
                <div className="special-content">
                    <h2>CARREGANDO...</h2>
                </div>
            </div>
        );
      }
    
  }
}
 
class medicalRecordPlusPrint extends React.Component {
    state={
        data:{}
    }
    async componentDidMount(){
        let {id} = this.props.match.params;
        await API.get('/editarProntuarios/'+id).then(
            async (response)=>{
                
                const dentistInformation =
                await API.get('/editarDentista/'+response.data[0].Dentista_idDentista).then(
                    (Responsedentist)=>{
                        return Responsedentist.data[0];
                    }
                );

                const queryInformation =
                await API.get('/editarConsulta/'+response.data[0].Consulta_idConsulta).then(
                    async (Responsequery)=>{
                        const procedureinsoformation =
                        await API.get('/editarProcedimento/'+Responsequery.data.Procedimento_idProcedimento).then(
                            (Responseprocedure)=>{
                                return Responseprocedure.data;
                            }
                        );


                        const clientInformation =
                        await API.get('/editarCliente/'+Responsequery.data.Cliente_idCliente).then(
                            (Responsepeople)=>{
                                return Responsepeople.data[0];
                            }
                        );
                        return ({dataQuery:{
                            query:Responsequery.data,
                            client:clientInformation,
                            procedure:procedureinsoformation
                        }})
                    }
                );

                this.setState({
                    data:{
                        queryInformation,
                        dentistInformation,
                        medicalRecord:response.data[0],
                    }
                    }
                )
            }
        );
    }
  render() {
    return (
      <div className={"print"}>
        <ReactToPrint
          trigger={() => <button className="btn-print">IMPRIMIR</button>}
          content={() => this.componentRef}
        />
        <ComponentToPrint ref={el => (this.componentRef = el)} data={this.state.data}/>
      </div>
    );
  }
}

export default connect(state=>({theme:state.actualTheme}))(medicalRecordPlusPrint);