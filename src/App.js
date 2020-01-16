import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Index from './components/firstComponent';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Index} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
