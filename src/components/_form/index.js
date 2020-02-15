import React from 'react';
import './index.scss';
import API from "../services/base";

export default class form extends React.Component{
    state={
        forSubmit:{sexo:1,CPF:"",RG:"",CEP:"",telefone:"",nome:"",dataDeNascimento:"",endereco:"",nacionalidade:"",ativo:1},
        themeContent:{hipedBallDirection:'0%'}
    }

    handleChange = (e)=>{
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

        }else if(e.target.name === "CEP"){
            let CEP = e.target.value
            .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
            .replace(/(\d{5})(\d)/, '$1-$2'); 
            this.setState({forSubmit:{...this.state.forSubmit,[e.target.name]:CEP}})
        }else if(e.target.name === "telefone"){
            let telefone = e.target.value
            .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
            .replace(/(\d{2})(\d)/, '($1) $2')
            .replace(/(\d{5})(\d)/, '$1-$2'); 

            this.setState({forSubmit:{...this.state.forSubmit,[e.target.name]:telefone}})
        }else{
            this.setState({forSubmit:{...this.state.forSubmit,[e.target.name]:e.target.value}})
        }

    }


    hipedBallHandler = ()=>{
        if(this.state.themeContent.hipedBallDirection === '0%'){
            this.setState({forSubmit:{...this.state.forSubmit,sexo:0},themeContent:{hipedBallDirection:'50%'}})
        }else{
            this.setState({forSubmit:{...this.state.forSubmit,sexo:1},themeContent:{hipedBallDirection:'0%'}})
        }
    }

    submitContent = ()=>{
        console.log(this.state.forSubmit)
        API.post(this.props.url,{params:this.state.forSubmit}).then((response)=>{
            console.log(response.data);
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
        const hipedBall = {
            left:this.state.themeContent.hipedBallDirection,
            width : (parseFloat(hiped.width) / 2) + 'px',
            height: hiped.height,
            borderRadius : (parseFloat(hiped.width) / 2) + 'px',
        }
        return(
            <div className={`form-create form-create-${theme}`}>
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
                                    
                                    <div className='hiped' style={hiped} onClick={this.hipedBallHandler}>
                                        <div className='hipedBall' style={hipedBall}></div>
                                        <b>{((this.state.forSubmit.sexo === 1 || this.state.forSubmit.sexo === undefined)?item.option[0]:item.option[1])}</b>
                                    </div>
                                    
                                </div>
                            );
                        }else{
                            return(
                                <div key={item.name}>
                                    <span>{item.placeholder.split("DIGITE SEU ").reduce(function(p, c){ return c }).split("DIGITE SUA ").reduce(function(p, c){ return c }) + ": "}</span>
                                    <input autoComplete="off" maxLength={((!item.max)?"":item.max)} type={item.type} name={item.name} placeholder={item.placeholder} onChange={this.handleChange} value={this.state.forSubmit[item.name]} />
                                    {((!(item.format))?"":<p>{item.format}</p>)}
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
