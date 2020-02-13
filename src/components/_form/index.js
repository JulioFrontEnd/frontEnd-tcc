import React from 'react';
import './index.scss';

/**
 * <div>
    <input type='text' name="cpf" placeholder="Put Here your CPF" />
    <p>xxx.xxx.xxx-xx</p>
    </div>
 * 
 */

export default class form extends React.Component{
    state={
        forSubmit:{}
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

    render(){
        const data = this.props.data;
        const theme = this.props.theme;
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
                        if(item.name === "binary"){
                            return(
                                <div key={item.name}>
                                    Nothing
                                </div>
                            );
                        }else{
                            return(
                                <div key={item.name}>
                                    <input autocomplete="off" maxLength={item.max} type={item.type} name={item.name} placeholder={item.placeholder} onChange={this.handleChange} value={this.state.forSubmit[item.name]} />
                                    {((!(item.format))?"":<p>{item.format}</p>)}
                                </div>
                            ); 
                        }
                    })
                }

                <div>
                    <button>ENVIAR</button>
                </div>
            </div>
        );
    }
}
