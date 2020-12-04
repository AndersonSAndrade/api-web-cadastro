import React, { ChangeEvent, useState, useEffect } from 'react';
import { Breadcrumb, Button, Form, FormFile } from 'react-bootstrap';

import api from '../../services/api';
import imageDefault from './images/avatar.png';
import { useHistory, useParams } from 'react-router-dom';



interface IUsuario {
    nome: string;
    dataNascimento: string;
    foto: string ;
  }

const UsuarioForm: React.FC = () => {

    const history = useHistory();
    const { id } = useParams<{ id: string }>();

    const [model, setModel] = useState<IUsuario>({
        nome: "",
        dataNascimento: "",
        foto: "" ,
    });

    useEffect(() => {
        if(id !== undefined){
            findUsario(id);
        }
     }, [id])

    function updateModel(e: ChangeEvent<HTMLInputElement>){
        setModel({
            ... model,
            [e.target.name]: e.target.value
        })
    }
   
    async function onSubmit(e: ChangeEvent<HTMLFormElement>){
        e.preventDefault();
        if(id !== undefined){
            const response = await api.put(`/usuarios/${id}`, model);
        }else{
            const response = await api.post('/usuarios', model);
        }
        voltar();
    }

    async function findUsario(id: string){
        const response = await api.get(`/usuarios/${id}`);
        setModel({
            nome: response.data.nome,
            dataNascimento: response.data.dataNascimento,
            foto: response.data.foto
        })
    }

  // Handles file upload event and updates state
  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const  base64: string = await convertBase64(file) as string;
    {model.foto = base64}
  };

  

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  function voltar(){
    history.goBack();
  }
   

  return(
    <div className="container">
    <br/>
    <Breadcrumb>
    <div className="top-user">
      <div className="links">
          <Breadcrumb.Item active>Novo Usuário</Breadcrumb.Item>
       </div>
       <div className="btn-new">
          <Button variant="dark" size="sm" onClick={voltar}>Voltar</Button>
       </div>
    </div>
    </Breadcrumb>
    <br/>

    <div className="container">
        <img src={model.foto} width="100px"/>
    </div>

  <Form onSubmit={onSubmit}>
    <Form.Group>
        <FormFile.Label>Gostaria de Adicionar um Avatar?</FormFile.Label>
        <Form.File id="avatar" className="img"  onChange={(e) => {uploadImage(e)}}/>
    </Form.Group>
      <Form.Group controlId="nome">
          <Form.Label>Nome</Form.Label>
          <Form.Control type="text" name="nome" value={model.nome} onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)}/>
      </Form.Group>
      <Form.Group controlId="nome">
          <Form.Label>Data de Nascimento</Form.Label>
          <Form.Control type="text" name="dataNascimento" value={model.dataNascimento} onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)} />
      </Form.Group>
      <Button variant="primary" type="submit">
            Salvar
      </Button>
  </Form>             
  </div>
  );
}

export default UsuarioForm;