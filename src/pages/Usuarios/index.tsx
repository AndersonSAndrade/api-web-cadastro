import React, { useState, useEffect } from 'react';
import { Breadcrumb, Button, Image, Table } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';

import moment from 'moment';
import './index.css';

interface IUsuario {
  codigo: number;
  nome: string;
  dataNascimento: string;
  foto: string;
}

const Usuarios: React.FC = () => {

  const [usuarios, setUsuarios] = useState<IUsuario[]>([]);
  const history = useHistory();

  useEffect(() => {
    loadUsuarios()
  },[]);

  async function loadUsuarios(){
      const response = await api.get('/usuarios');
      console.log(response);
      setUsuarios(response.data);
  }

  function formatData(date: Date){
    return moment(date).format("DD/MM/YYYY");
  }

  function newUsuario(){
    history.push('/usuarios/cadastro');
  }

  function editUsuario(id: number){
    history.push(`/usuarios/cadastro/${id}`);
  }

  async function deleteUsuario(id: number){
    await api.delete(`/usuarios/${id}`);
    loadUsuarios();
  }


  return(
    <div className="container">
      <br/>
      <Breadcrumb>
      <div className="top-user">
        <div className="links">
            <Breadcrumb.Item active>Listando Usuário</Breadcrumb.Item>
         </div>
         <div className="btn-new">
            <Button variant="dark" size="sm" onClick={newUsuario}>Novo Usuário</Button>
         </div>
      </div>
      </Breadcrumb>
      <br/>



      <Table striped bordered hover className="text-center">
        <thead>
          <tr>
            <th>ID</th>
            <th>Foto</th>
            <th>Nome</th>
            <th>Data Nascimento</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>

        {
          usuarios.map(usuario => (
            <tr key={usuario.codigo}>
              <td>{ usuario.codigo }</td>
              <td>
                <Image src={usuario.foto} roundedCircle width="40px" />
              </td>
              <td>{ usuario.nome }</td>
              <td>{ usuario.dataNascimento }</td>
              <td>
                <Button variant="outline-warning" size="sm" onClick={() => editUsuario(usuario.codigo)}>Editar</Button>{' '}
                <Button variant="outline-danger" size="sm" onClick={() => deleteUsuario(usuario.codigo)}>Deletar</Button>{' '}
              </td>
            </tr>
          ))
        }

          
        </tbody>
      </Table>

    </div>

  );
}

export default Usuarios;