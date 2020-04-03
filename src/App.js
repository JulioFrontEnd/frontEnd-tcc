import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {Provider} from "react-redux";
import ThemeStore from './components/reducers/theme';
import Menu from './components/menu';
import BottomMenu from './components/bottomMenu';
import mainPage from './components/mainPage';
import userPage from './components/user';
import back from './components/back';

// PLUS CRUD ( INDEX )
import peoplePlus from './components/peoplePlus';
import companionPlus from './components/companionPlus';
import dentistPlus from './components/dentistPlus';
import procedurePlus from './components/procedurePlus';
import collaboratorPlus from './components/collaboratorPlus';
import queryPlus from './components/queryPlus';
import medicalRecordPlus from './components/medicalRecordPlus';

import providerPlus from './components/providerPlus';
import materialPlus from './components/materialPlus';
import stockPlus from './components/stockPlus';

// CREATE CRUD (CREATE)
import peoplePlusCreate from './components/peoplePlus/create.js';
import companionPlusCreate from './components/companionPlus/create.js';
import collaboratorPlusCreate from './components/collaboratorPlus/create.js';
import dentistPlusCreate from './components/dentistPlus/create.js';
import procedurePlusCreate from './components/procedurePlus/create.js';
import queryPlusCreate from './components/queryPlus/create.js';
import medicalRecordPlusCreate from './components/medicalRecordPlus/create.js';

import providerPlusCreate from './components/providerPlus/create.js';
import materialPlusCreate from './components/materialPlus/create.js';
import stockPlusCreate from './components/stockPlus/create.js';

// READ CRUD (READ AND DELETE)
import peoplePlusRead from './components/peoplePlus/read.js';
import companionPlusRead from './components/companionPlus/read.js';
import dentistPlusRead from './components/dentistPlus/read.js';
import collaboratorPlusRead from './components/collaboratorPlus/read.js';
import procedurePlusRead from './components/procedurePlus/read.js';
import queryPlusRead from './components/queryPlus/read.js';
import medicalRecordPlusRead from './components/medicalRecordPlus/read.js';

import providerPlusRead from './components/providerPlus/read.js';
import materialPlusRead from './components/materialPlus/read.js';
import stockPlusRead from './components/stockPlus/read.js';


// UPDATE CRUD (UPDATE)
import peoplePlusUpdate from './components/peoplePlus/update.js';
import companionPlusUpdate from './components/companionPlus/update.js';
import collaboratorPlusUpdate from './components/collaboratorPlus/update.js';
import dentistPlusUpdate from './components/dentistPlus/update.js';
import procedurePlusUpdate from './components/procedurePlus/update.js';
import queryPlusUpdate from './components/queryPlus/update.js';
import medicalRecordPlusUpdate from './components/medicalRecordPlus/update.js';

import providerPlusUpdate from './components/providerPlus/update.js';
import materialPlusUpdate from './components/materialPlus/update.js';


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
            <Route exact path="/popop/peoplePlus/read/:id?" component={peoplePlusRead} />
            <Route exact path="/popop/peoplePlus/update/:id" component={peoplePlusUpdate} />
            {/* CRUD ACOMPANHANTE */}
            <Route exact path="/menu/companionPlus" component={companionPlus} />
            <Route exact path="/popop/companionPlus/add" component={companionPlusCreate} />
            <Route exact path="/popop/companionPlus/read/:id?" component={companionPlusRead} />
            <Route exact path="/popop/companionPlus/update/:id" component={companionPlusUpdate} />
            {/* CRUD COLLABORATOR */}
            <Route exact path="/menu/collaboratorPlus" component={collaboratorPlus} />
            <Route exact path="/popop/collaboratorPlus/add" component={collaboratorPlusCreate} />
            <Route exact path="/popop/collaboratorPlus/read/:id?" component={collaboratorPlusRead} />
            <Route exact path="/popop/collaboratorPlus/update/:id" component={collaboratorPlusUpdate} />
            {/* CRUD DENTISTA */}
            <Route exact path="/menu/dentistPlus" component={dentistPlus} />
            <Route exact path="/popop/dentistPlus/add" component={dentistPlusCreate} />
            <Route exact path="/popop/dentistPlus/read/:id?" component={dentistPlusRead} />
            <Route exact path="/popop/dentistPlus/update/:id" component={dentistPlusUpdate} />
            {/* CRUD PROCEDIMENTO */}
            <Route exact path="/menu/procedurePlus" component={procedurePlus} />
            <Route exact path="/popop/procedurePlus/add" component={procedurePlusCreate} />
            <Route exact path="/popop/procedurePlus/read/:id?" component={procedurePlusRead} />
            <Route exact path="/popop/procedurePlus/update/:id" component={procedurePlusUpdate} />
            {/* CRUD CONSULTA */}
            <Route exact path="/menu/queryPlus" component={queryPlus} />
            <Route exact path="/popop/queryPlus/add" component={queryPlusCreate} />
            <Route exact path="/popop/queryPlus/read/:id?" component={queryPlusRead} />
            <Route exact path="/popop/queryPlus/update/:id" component={queryPlusUpdate} />
            {/* CRUD PRONTUÁRIO */}
            <Route exact path="/menu/medicalRecordPlus" component={medicalRecordPlus} />
            <Route exact path="/popop/medicalRecordPlus/add" component={medicalRecordPlusCreate} />
            <Route exact path="/popop/medicalRecordPlus/read/:id?" component={medicalRecordPlusRead} />
            <Route exact path="/popop/medicalRecordPlus/update/:id" component={medicalRecordPlusUpdate} />
            {/* CRUD FORNECEDOR */}
            <Route exact path="/menu/providerPlus" component={providerPlus} />
            <Route exact path="/popop/providerPlus/add" component={providerPlusCreate} />
            <Route exact path="/popop/providerPlus/read/:id?" component={providerPlusRead} />
            <Route exact path="/popop/providerPlus/update/:id" component={providerPlusUpdate} />
            {/* CRUD MATERIAL */}
            <Route exact path="/menu/materialPlus" component={materialPlus} />
            <Route exact path="/popop/materialPlus/add" component={materialPlusCreate} />
            <Route exact path="/popop/materialPlus/read/:id?" component={materialPlusRead} />
            <Route exact path="/popop/materialPlus/update/:id" component={materialPlusUpdate} />
            {/* CRUD ESTOQUE */}
            <Route exact path="/menu/stockPlus" component={stockPlus} />
            <Route exact path="/popop/stockPlus/add" component={stockPlusCreate} />
            <Route exact path="/popop/stockPlus/read/:id?" component={stockPlusRead} />


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
