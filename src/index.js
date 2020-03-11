import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.scss';
import * as serviceWorker from './serviceWorker';
import API from "./components/services/base";


if(sessionStorage.getItem('loading-page') !== 'true'){
	ReactDOM.render(
		<div id="loading-screen">
			
			<img src={"loading.gif"} id="loading-gif" alt="loading..." />
		</div>,
		document.getElementById('root')
	);
}

API.get('/listarCliente').then(async (response)=>{
	await sessionStorage.setItem('loading-page','true');
	ReactDOM.render(
		<App />,
		document.getElementById('root')
	);
});



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
