import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {Provider} from "react-redux";
import ThemeStore from './components/reducers/theme';
import Menu from './components/menu';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Provider store={ThemeStore}>
          {/*
            SWITCH DE ROTAS FIXAS DO TOPO DAS PÁGINAS
          */}
          <Switch>
            <Route exact path="/" component={Menu} />
          </Switch>
          {/*
            SWITCH DE ROTAS DE PAGINAS DINÂMICAS
          */}
          
        </Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
