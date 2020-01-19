import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {Provider} from "react-redux";
import ThemeStore from './components/reducers/theme';
import Menu from './components/menu';
import BottomMenu from './components/bottomMenu';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Provider store={ThemeStore}>
          {/*
            SWITCH DE ROTAS FIXAS DO TOPO DAS PÁGINAS
          */}
          <Switch>
            <Route path="/menu" component={Menu} />
          </Switch>
          
          {/*
            SWITCH DE ROTAS DE PAGINAS DINÂMICAS
          */}
          <Switch>
            <Route exact path="/" render={()=>{window.location.href = "/menu";}}/>
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
  );
}

export default App;
