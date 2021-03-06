import React from 'react';
import './index.scss';
import API from "../services/base";
import Popop from '../_popop/index';

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

        }else if(e.target.name === "cnpj"){
            let cpf = e.target.value
              .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
              .replace(/^(\d{2})(\d)/,"$1.$2") // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
              .replace(/^(\d{2})\.(\d{3})(\d)/,"$1.$2.$3")
              .replace(/\.(\d{3})(\d)/,".$1/$2")
              .replace(/(\d{4})(\d)/,"$1-$2");
            this.setState({forSubmit:{...this.state.forSubmit,[e.target.name]:cpf}})

        }else if(e.target.name.split("_").reduce(function(p, c){ return p }) === "search"){
            this.setState({forSubmit:{...this.state.forSubmit,[e.target.name]:e.target.value}})
            API.get(aditional.url+aditional.parameter+e.target.value).then((response)=>{
                this.setState({[aditional.name]:
                    response.data.map(item=>{
                        return(
                            <div key={item.id} id={"Content_id_"+aditional.name+"_"+item.id} onClick={async ()=>{
                                    await this.setState({forSubmit:{...this.state.forSubmit, [aditional.name]:item.id}});
                                    let x = await document.querySelectorAll(".content-"+aditional.name);
                                    let i = await 0;
                                    if(!(document.getElementById("Content_id_"+aditional.name+"_"+item.id).classList.contains('selected'))){
                                        for (i = 0; i < x.length; i++) {
                                            await x[i].classList.remove("selected");
                                        }
                                        await document.getElementById("Content_id_"+aditional.name+"_"+item.id).classList.add("selected");
                                    }else{
                                        this.setState({forSubmit:{...this.state.forSubmit, [aditional.name]:""}});
                                        for (i = 0; i < x.length; i++) {
                                            await x[i].classList.remove("selected");
                                        }
                                    }
                                    
                                    
                                    
                                    
                                

                                    

                                }} className={"content content-"+aditional.name}>
                                <p className="principal"><span>{aditional.option[0]}:</span><br></br>{item[aditional.option[0]]}</p>
                                <p className="secondary"><span>{aditional.option[1]}:</span><br></br>{
                                    //config de valores
                                    ((aditional.option[1] === 'valor' )?
                                    (item[aditional.option[1]]/100).toFixed(2).toString().replace(".", ","):

                                    // config de datetime
                                    ((aditional.option[1] === "hora")?
                                    item[aditional.option[1]].split(" ",2).reduce(function(p, c){ return c+" "+p.split("-").reduce(function(p, c){ return c + "-" +p })}):

                                    //DEFAULT
                                    item[aditional.option[1]])
                                )} </p>
                                {((aditional.option[2]!==undefined)?<p className="secondary"><span>{aditional.option[2]}:</span><br></br>{item[aditional.option[2]]}</p>:"")}
                                {((aditional.option[3]!==undefined)?<p className="secondary"><span>{aditional.option[3]}:</span><br></br>{item[aditional.option[3]]}</p>:"")}
                            </div>
                        );
                    })});
            });

        }else if(e.target.name.substring(0,4) === "data"){
            let data = e.target.value
            .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
            .replace(/(\d{2})(\d)/, '$1-$2')
            .replace(/(\d{2})(\d)/, '$1-$2');
            if(aditional.type === 'dataTime'){
                this.setState({forSubmit:{...this.state.forSubmit,
                [e.target.name]:data.split("-").reduce(function(p, c){ return c + "-" +p })}},
                ()=>{
                    this.setState({forSubmit:{...this.state.forSubmit,
                        [aditional.name]:this.state.forSubmit['data'+aditional.name]+" "+this.state.forSubmit['hora'+aditional.name]+":00",}},)
                });
            }else{
                this.setState({forSubmit:{...this.state.forSubmit,[e.target.name]:data.split("-").reduce(function(p, c){ return c + "-" +p })}});
            }
            
        }else if(e.target.name.substring(0,4) === "hora"){
            
            let data = e.target.value
            .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
            .replace(/(\d{2})(\d)/, '$1:$2'); 
            
            if(aditional.type === 'dataTime'){
                this.setState({forSubmit:{...this.state.forSubmit,
                    [e.target.name]:data.split("-").reduce(function(p, c){ return c + "-" +p })}},
                    ()=>{
                        this.setState({forSubmit:{...this.state.forSubmit,
                            [aditional.name]:this.state.forSubmit['data'+aditional.name]+" "+this.state.forSubmit['hora'+aditional.name]+":00",}},)
                });
            }else{
                this.setState({forSubmit:{...this.state.forSubmit,[e.target.name]:data}});
            }
        }else if(e.target.name === "CEP"){
            let CEP = e.target.value
            .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
            .replace(/(\d{5})(\d)/, '$1-$2'); 
            this.setState({forSubmit:{...this.state.forSubmit,[e.target.name]:CEP}})
        }else if(e.target.name === "RG" || e.target.name === "numeracaoDoDente" || e.target.name === "quantidade"){
            let CEP = e.target.value
            .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
            this.setState({forSubmit:{...this.state.forSubmit,[e.target.name]:CEP}})
        }else if(e.target.name === "salario" || e.target.name === "valor" || e.target.name === "preco"){
            function money(v){
                v=v.replace(/\D/g,"") // permite digitar apenas numero
                v=v.replace(/(\d{1})(\d{1,2})$/,"$1,$2") // coloca virgula antes dos ultimos 4 digitos
                return v;
                }
            let salario = money(e.target.value);
            this.setState({forSubmit:{...this.state.forSubmit,[e.target.name]:salario}})
        }else if(e.target.name === "PIS"){
            let PIS = e.target.value
            .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
            .replace(/(\d{3})(\d)/, '$1.$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
            .replace(/^(\d{3})\.(\d{5})(\d)/, "$1.$2.$3")
            .replace(/(\d{3})\.(\d{5})\.(\d{2})(\d)/, "$1.$2.$3-$4");
            this.setState({forSubmit:{...this.state.forSubmit,[e.target.name]:PIS}})
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
        data.map((item)=>{
            if(item.type !== "dataTime"){
                return(this.setState({forSubmit:{...this.state.forSubmit,[item.name]:item.value,}}));
            }else{
                return(this.setState({forSubmit:{...this.state.forSubmit,[item.name]:item.value,["hora"+item.name]:item.value.substr(-8,5),["data"+item.name]:item.value.substr(0,10)}}));
            } 
        });
    }


    submitContent = async ()=>{
        const data = await this.props.data;
        let url = await this.props.url + "?";
        function isNumber(n) {
            return !isNaN(parseFloat(n)) && isFinite(n);
        }
        await data.map((item)=>{
            if((item.name === "salario" || item.name === "valor" || item.name === "preco") && !(isNumber(this.state.forSubmit[item.name]))){
                return(
                    ((this.state.forSubmit[item.name]===undefined || this.state.forSubmit[item.name]==="" )?"": url = url + item.name + "=" + ((this.state.forSubmit[item.name].replace(/,/, '').length > 2)?this.state.forSubmit[item.name].replace(/,/, ''):this.state.forSubmit[item.name].replace(/,/, '')+"0") + "&")     
                );
            }else{
                return(
                    ((this.state.forSubmit[item.name]===undefined || this.state.forSubmit[item.name]==="" )?"": url = url + item.name + "=" + this.state.forSubmit[item.name] + "&")     
                );
            }
        });
        
        url = await url.substring(0,(url.length - 1));
        console.log(url);
        API.post(url).then(async(response)=>{
            await localStorage.setItem('popop-success',"true");
            window.location.href = this.props.posUrl;
        }).catch((error)=>{
            this.setState({error:error.response.data});
            this.setState({containerError:<Popop theme={this.props.theme} msg="Algum dado inserido está incorreto, por favor preencha novamente!" type="error" />,});
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
                                    <span>{item.placeholder.split("DIGITE A ").reduce(function(p, c){ return c }).split("DIGITE O ").reduce(function(p, c){ return c }).split("DIGITE SEU ").reduce(function(p, c){ return c }).split("DIGITE SUA ").reduce(function(p, c){ return c }) + ": "}</span>
                                    
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
                        }else if(item.type === "date"){
                            return(
                                <div key={item.name}>
                                    <span>{item.placeholder.split("DIGITE A ").reduce(function(p, c){ return c }).split("DIGITE O ").reduce(function(p, c){ return c }).split("DIGITE SEU ").reduce(function(p, c){ return c }).split("DIGITE SUA ").reduce(function(p, c){ return c }) + ": "}</span>
                                    
                                    <input autoComplete="off" maxLength={((!item.max)?"":item.max)} type="text" 
                                    name={item.name} placeholder={item.placeholder} onChange={this.handleChange} 
                                    value={((this.state.forSubmit[item.name] !== undefined)?this.state.forSubmit[item.name].split("-").reduce(function(p, c){ return c + "-" +p }):"")} 
                                    className={((this.state.error === undefined)?"":((this.state.error[item.name] === undefined)?"":"error"))} />
                                     {/* ====== FORMAT ======== */}
                                     <div className="error-logger">{((this.state.error === undefined)?((!(item.format))?"":<p>{item.format}</p>):((this.state.error[item.name] === undefined)?((!(item.format))?"":<p>{item.format}</p>):<p>{this.state.error[item.name]}</p>))}</div>
                                </div>
                            );
                        }else if(item.type === "dataTime"){
                            return(
                                <div key={item.name}>
                                <span>{item.placeholder.split("DIGITE A ").reduce(function(p, c){ return c }).split("DIGITE O ").reduce(function(p, c){ return c }).split("DIGITE SEU ").reduce(function(p, c){ return c }).split("DIGITE SUA ").reduce(function(p, c){ return c }) + ": "}</span>                                    
                                
                                {/* ====== INPUT ======== */}
                                <input autoComplete="off" type="text" maxLength="5"
                                name={("hora"+item.name)} placeholder="HH:MM" onChange={(e)=>this.handleChange(e,item)} 
                                value={((this.state.forSubmit["hora"+item.name] !== undefined)?this.state.forSubmit["hora"+item.name].split("-").reduce(function(p, c){ return c + "-" +p }):"")} 
                                className={((this.state.error === undefined)?"":((this.state.error[item.name] === undefined)?"":"error"))} />

                                <input autoComplete="off" type="text" maxLength="10"
                                name={("data"+item.name)} placeholder="DD-MM-AAAA" onChange={(e)=>this.handleChange(e,item)} 
                                value={((this.state.forSubmit["data"+item.name] !== undefined)?this.state.forSubmit["data"+item.name].split("-").reduce(function(p, c){ return c + "-" +p }):"")} 
                                className={((this.state.error === undefined)?"":((this.state.error[item.name] === undefined)?"":"error"))} />
                                
                                {/* ====== FORMAT ======== */}
                                <div className="error-logger">{((this.state.error === undefined)?((!(item.format))?"":<p>{item.format}</p>):((this.state.error[item.name] === undefined)?((!(item.format))?"":<p>{item.format}</p>):<p>{this.state.error[item.name]}</p>))}</div>
                            </div>
                            );
                        }else if(item.type === "select"){
                            return(
                                <div key={item.name}>
                                    <span>{item.placeholder.split("DIGITE A ").reduce(function(p, c){ return c }).split("DIGITE O ").reduce(function(p, c){ return c }).split("DIGITE SEU ").reduce(function(p, c){ return c }).split("DIGITE SUA ").reduce(function(p, c){ return c }) + ": "}</span>                                    
                                    
                                    {/* ====== INPUT ======== */}
                                    <input autoComplete="off" maxLength={((!item.max)?"":item.max)} type="text" 
                                    name={("search_"+item.name)} placeholder={item.placeholder} onChange={(e)=>this.handleChange(e,item)} 

                                    value={((this.state.forSubmit["search_"+item.name] !== undefined)?this.state.forSubmit["search_"+item.name]:"")} 
                                    className={((this.state.error === undefined)?"":((this.state.error[item.name] === undefined)?"":"error"))} />

                                    {/* ====== VALORES ======== */}
                                    <div className="input_search_value">
                                        {this.state[item.name]}
                                    </div>

                                    {/* ====== FORMAT ======== */}
                                    <div className="error-logger">{((this.state.error === undefined)?((!(item.format))?"":<p>{item.format}</p>):((this.state.error[item.name] === undefined)?((!(item.format))?"":<p>{item.format}</p>):<p>{this.state.error[item.name]}</p>))}</div>
                                </div>
                            );
                        }else{
                            return(
                                <div key={item.name}>
                                    <span>{item.placeholder.split("DIGITE A ").reduce(function(p, c){ return c }).split("DIGITE O ").reduce(function(p, c){ return c }).split("DIGITE SEU ").reduce(function(p, c){ return c }).split("DIGITE SUA ").reduce(function(p, c){ return c }) + ": "}</span>                                    
                                    
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