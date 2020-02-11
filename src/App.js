import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {Provider} from "react-redux";
import ThemeStore from './components/reducers/theme';
import Menu from './components/menu';
import BottomMenu from './components/bottomMenu';
import mainPage from './components/mainPage';
import userPage from './components/user';
import back from './components/back';
import peoplePlus from './components/peoplePlus';
import peoplePlusAdd from './components/peoplePlus/create.js';


function App() {
  return (
    <div>
    <div id="message">
        <i className="fas fa-mobile-alt"></i>
        <div>POR FAVOR, DEIXE O CELULAR EM PÉ</div>
        <p>Esse sistema foi pensado para telas verticais.</p>
    </div>
    <div id="App">
      
      <BrowserRouter>
        <Provider store={ThemeStore}>
          {/*
            SWITCH DE ROTAS FIXAS DO TOPO DAS PÁGINAS
          */}
          <Switch>
            <Route path="/menu" component={Menu} />
            <Route path="/popop" component={back} />
          </Switch>
          
          {/*
            SWITCH DE ROTAS DE PAGINAS DINÂMICAS
          */}
          <Switch>
            {/* ROTAS DE LOGIN */}
            <Route exact path="/" render={()=>{window.location.href = "/menu";}}/>

            {/* ROTAS MENU */}
            <Route exact path="/menu" component={mainPage} />
            <Route exact path="/menu/peoplePlus" component={peoplePlus} />

            {/* ROTAS POPOP */}
            <Route exact path="/popop/user" component={userPage} />
            <Route exact path="/popop/peoplePlus/add" component={peoplePlusAdd} />
            
          </Switch>
          {/*
            SWITCH DE ROTAS FIXAS DE BAIXO DAS PÁGINAS
          */}
          <Switch>
            <Route path="/menu" component={BottomMenu} />
          </Switch>
        </Provider>
      </BrowserRouter>
    </div>
    </div>
  );
}

export default App;
