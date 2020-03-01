import React from 'react';
import './index.scss';
import API from "../services/base";

export default class form extends React.Component{
    state={
        forSubmit:{},
        containerError:<span></span>,
        preload:false,
    }

    componentDidUpdate(){
        if(this.state.preload === false && this.props.update === "true"){
            this.beValue();
            this.setState({preload:true});
        }
    }
    componentDidMount(){
        if(this.state.preload === false && this.props.update === "false"){
            this.beValue();
            this.setState({preload:true});
        }
    }
    
    closePopop = ()=>{
        this.setState({containerError:<span></span>,})
    }

    handleChange = (e,aditional = "")=>{
        /*
            If para changes especiais
        */
        

        if(e.target.name === "CPF"){
            let cpf = e.target.value
              .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
              .replace(/(\d{3})(\d)/, '$1.$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
              .replace(/(\d{3})(\d)/, '$1.$2')
              .replace(/(\d{3})(\d{1,2})/, '$1-$2')
              .replace(/(-\d{2})\d+?$/, '$1');
            this.setState({forSubmit:{...this.state.forSubmit,[e.target.name]:cpf}})

        }else if(e.target.name.split("_").reduce(function(p, c){ return p }) === "search"){
            this.setState({forSubmit:{...this.state.forSubmit,[e.target.name]:e.target.value}})
            API.get(aditional.url+aditional.parameter+e.target.value).then((response)=>{
                this.setState({container:
                    response.data.map(item=>{
                        return(
                            <div key={item.id} onClick={()=>this.popopShow(item.id)} className={"content "+((item.ativo === true)?"":"unable")}>
                                <p className="principal"><span>{aditional.option[0]}:</span><br></br>{item[aditional.option[0]]}</p>
                                <p className="secondary"><span>{aditional.option[1]}:</span><br></br>{item[aditional.option[1]]}</p>
                            </div>
                        );
                    })});
            });

        }else if(e.target.name.substring(0,4) === "data"){
            let data = e.target.value
            .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
            .replace(/(\d{2})(\d)/, '$1-$2')
            .replace(/(\d{2})(\d)/, '$1-$2'); 

            this.setState({forSubmit:{...this.state.forSubmit,[e.target.name]:data.split("-").reduce(function(p, c){ return c + "-" +p })}});
        }else if(e.target.name === "CEP"){
            let CEP = e.target.value
            .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
            .replace(/(\d{5})(\d)/, '$1-$2'); 
            this.setState({forSubmit:{...this.state.forSubmit,[e.target.name]:CEP}})
        }else if(e.target.name === "telefone"){
            let telefone = e.target.value
            .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
            .replace(/(\d{3})(\d)/, '($1) $2')
            .replace(/(\d{5})(\d)/, '$1-$2'); 

            this.setState({forSubmit:{...this.state.forSubmit,[e.target.name]:telefone}})
        }else{
            this.setState({forSubmit:{...this.state.forSubmit,[e.target.name]:e.target.value}})
        }

    }


    hipedBallHandler = (a)=>{
        if(this.state.forSubmit[a] === 1){
            this.setState({forSubmit:{...this.state.forSubmit,[a]:0}})
        }else{
            this.setState({forSubmit:{...this.state.forSubmit,[a]:1}})
        }
    }

    beValue = async ()=>{
        const data = await this.props.data;
        data.map((item)=>this.setState({forSubmit:{...this.state.forSubmit,[item.name]:item.value,}}));
    }

    submitContent = async ()=>{
        const data = await this.props.data;
        let url = await this.props.url + "?";
        
        await data.map((item)=>{
            return(
                url = url + item.name + "=" + ((this.state.forSubmit[item.name]===undefined)?"":this.state.forSubmit[item.name]) + "&"
            );
        });
        
        url = await url.substring(0,(url.length - 1));
        console.log(url);
        API.post(url).then((response)=>{
            window.location.href = this.props.posUrl;
        }).catch((error)=>{
            this.setState({error:error.response.data});
            this.setState({containerError:<div className="popop-error">
                <div onClick={this.closePopop}><i className="fas fa-times"></i></div>
                <h3>OPPS...</h3>
                <b>Algum dado inserido está incorreto, por favor preencha novamente!</b>
            </div>,});
        });
    }

    render(){
        const data = this.props.data;
        const theme = this.props.theme;
        const hiped = {
            width:'75px',
            height:'25px',
            borderRadius:'75px',
            position: 'relative',
        };
        return(
            <div className={`form-create form-create-${theme}`}>
                {this.state.containerError}
                <div>
                    <h2>{this.props.title}</h2>
                </div>
                
                {/*
                * MAP DOS INPUTS
                */}

                {
                    data.map((item)=>{
                        if(item.type === "binary"){
                            return(
                                <div key={item.name}>
                                    <span>{item.placeholder.split("DIGITE SEU ").reduce(function(p, c){ return c }).split("DIGITE SUA ").reduce(function(p, c){ return c }) + ": "}</span>
                                    
                                    <div className='hiped' style={hiped} onClick={()=>this.hipedBallHandler(item.name)}>
                                        <div className='hipedBall' style={({
                                            left:((this.state.forSubmit[item.name]===1)?"0%":"50%"),
                                            width : (parseFloat(hiped.width) / 2) + 'px',
                                            height: hiped.height,
                                            borderRadius : (parseFloat(hiped.width) / 2) + 'px',
                                        })}></div>
                                        <b>{((this.state.forSubmit[item.name]===0 || this.state.forSubmit[item.name]===undefined)?item.option[1]:item.option[0])}</b>
                                    </div>
                                    
                                </div>
                            );
                        }else if(item.type === "hidden"){
                            return <span key={item.name}></span>
                        }else if(item.name === "dataDeNascimento"){
                            return(
                                <div key={item.name}>
                                    <span>{item.placeholder.split("DIGITE SEU ").reduce(function(p, c){ return c }).split("DIGITE SUA ").reduce(function(p, c){ return c }) + ": "}</span>
                                    <input autoComplete="off" maxLength={((!item.max)?"":item.max)} type="text" 
                                    name={item.name} placeholder={item.placeholder} onChange={this.handleChange} 
                                    value={((this.state.forSubmit[item.name] !== undefined)?this.state.forSubmit[item.name].split("-").reduce(function(p, c){ return c + "-" +p }):"")} 
                                    className={((this.state.error === undefined)?"":((this.state.error[item.name] === undefined)?"":"error"))} />
                                     {/* ====== FORMAT ======== */}
                                     <div className="error-logger">{((this.state.error === undefined)?((!(item.format))?"":<p>{item.format}</p>):((this.state.error[item.name] === undefined)?((!(item.format))?"":<p>{item.format}</p>):<p>{this.state.error[item.name]}</p>))}</div>
                                </div>
                            );
                        }else if(item.type === "select"){
                            return(
                                <div key={item.name}>
                                    {/* ====== TITULO ======== */}
                                    <span>{item.placeholder.split("DIGITE SEU ").reduce(function(p, c){ return c }).split("DIGITE SUA ").reduce(function(p, c){ return c }) + ": "}</span>
                                    
                                    {/* ====== INPUT ======== */}
                                    <input autoComplete="off" maxLength={((!item.max)?"":item.max)} type="text" 
                                    name={("search_"+item.name)} placeholder={item.placeholder} onChange={(e)=>this.handleChange(e,item)} 

                                    value={((this.state.forSubmit["search_"+item.name] !== undefined)?this.state.forSubmit["search_"+item.name]:"")} 
                                    className={((this.state.error === undefined)?"":((this.state.error[item.name] === undefined)?"":"error"))} />

                                    {/* ====== VALORES ======== */}
                                    <div className="input_search_value">
                                        {this.state.container}
                                    </div>

                                    {/* ====== FORMAT ======== */}
                                    <div className="error-logger">{((this.state.error === undefined)?((!(item.format))?"":<p>{item.format}</p>):((this.state.error[item.name] === undefined)?((!(item.format))?"":<p>{item.format}</p>):<p>{this.state.error[item.name]}</p>))}</div>
                                </div>
                            );
                        }else{
                            return(
                                <div key={item.name}>
                                    <span>{item.placeholder.split("DIGITE SEU ").reduce(function(p, c){ return c }).split("DIGITE SUA ").reduce(function(p, c){ return c }) + ": "}</span>
                                    <input autoComplete="off" maxLength={((!item.max)?"":item.max)} type={item.type} name={item.name} 
                                    placeholder={item.placeholder} onChange={this.handleChange} 
                                    value={((this.state.forSubmit[item.name] !== undefined)?this.state.forSubmit[item.name]:"")} 
                                    className={((this.state.error === undefined)?"":((this.state.error[item.name] === undefined)?"":"error"))} />
                                     {/* ====== FORMAT ======== */}
                                     <div className="error-logger">{((this.state.error === undefined)?((!(item.format))?"":<p>{item.format}</p>):((this.state.error[item.name] === undefined)?((!(item.format))?"":<p>{item.format}</p>):<p>{this.state.error[item.name]}</p>))}</div>
                                </div>
                            ); 
                        }
                    })
                }

                <div>
                    <button onClick={this.submitContent}>ENVIAR</button>
                </div>
            </div>
        );
    }
}