import React from 'react';
import Main from './component/main/Main';
import { HashRouter, Route, Switch } from 'react-router-dom'

function App() {
  return (
    <HashRouter>
      <Switch>
        <Route exact path='/' component={Main} />
      </Switch>
    </HashRouter>
  );
}

export default App;
