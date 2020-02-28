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
import companionPlus from './components/companionPlus';
import peoplePlusCreate from './components/peoplePlus/create.js';
import companionCreate from './components/companionPlus/create.js';
import peoplePlusRead from './components/peoplePlus/read.js';
import companionPlusRead from './components/companionPlus/read.js';
import peoplePlusUpdate from './components/peoplePlus/update.js';
import companionPlusUpdate from './components/companionPlus/update.js';

function App() {
  return (
    <div>
    <div id="message">
      <div className="ICONE"><i className="fas fa-mobile-alt"></i></div>
        
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
            {/* ROTAS Principais */}
            <Route exact path="/" render={()=>{window.location.href = "/menu";}}/>
            <Route exact path="/menu" component={mainPage} />
            <Route exact path="/popop/user" component={userPage} />
            {/* CRUD CLIENTE */}
            <Route exact path="/menu/peoplePlus" component={peoplePlus} />
            <Route exact path="/popop/peoplePlus/add" component={peoplePlusCreate} />
            <Route exact path="/popop/peoplePlus/read" component={peoplePlusRead} />
            <Route exact path="/popop/peoplePlus/update/:id" component={peoplePlusUpdate} />
            {/* CRUD ACOMPANHANTE */}
            <Route exact path="/menu/companionPlus" component={companionPlus} />
            <Route exact path="/popop/companionPlus/add" component={companionCreate} />
            <Route exact path="/popop/companionPlus/read" component={companionPlusRead} />
            <Route exact path="/popop/companionPlus/update/:id" component={companionPlusUpdate} />
            
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
