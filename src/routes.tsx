import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Usuarios from './pages/Usuarios';
import UsuarioForm from './pages/UsuarioForm'


const Routes: React.FC = () => {
  return(
      <Switch>
          <Route path="/" exact component={ Home } />
          <Route path="/usuarios" exact component={ Usuarios } />
          <Route path="/usuarios/cadastro" exact component={ UsuarioForm }  />
          <Route path="/usuarios/cadastro/:id" exact component={ UsuarioForm }  />
      </Switch>
      
  );
}

export default Routes;