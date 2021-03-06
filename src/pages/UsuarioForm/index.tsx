import React, { ChangeEvent, useState, useEffect } from 'react';
import { Breadcrumb, Button, Form, FormFile } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MaskedFormControl from 'react-bootstrap-maskedinput'


import api from '../../services/api';
import imageDefault from './images/avatar.png';
import { useHistory, useParams } from 'react-router-dom';



interface IUsuario {
    nome: string;
    dataNascimento: string;
    foto: string ;
  }

const UsuarioForm: React.FC = () => {

    const notifySuccesss = () => toast.success("Operação Realizada com Sucesso!", {
        position: toast.POSITION.BOTTOM_RIGHT
      });
      const notifyError = () => toast.error("Ocorreu um problema na requisição, contate o Administrador!", {
        position: toast.POSITION.BOTTOM_RIGHT
      });
      const notifyError500 = () => toast.error("A imagem que está tentando enviar e muito grande o ideal é 2mb!", {
        position: toast.POSITION.BOTTOM_RIGHT
      });

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
            if(response.status == 204){
                notifySuccesss();
            }else{
                notifyError();
            }
        }else{
            const response = await api.post('/usuarios', model);
            if(response.status == 200){
                notifySuccesss();
            }else if(response.status == 500){
                notifyError500();
            }else{
               notifyError();
            }
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
        <Form.Text className="text-muted">O tamanho máximo permitido da imagem e de 50KB.</Form.Text>
    </Form.Group>
      <Form.Group controlId="nome">
          <Form.Label>Nome</Form.Label>
          <Form.Control type="text" name="nome" value={model.nome} onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)}/>
      </Form.Group>
      <Form.Group controlId="nome">
          <Form.Label>Data de Nascimento</Form.Label>
          <MaskedFormControl mask='11/11/1111' type="text" name="dataNascimento" value={model.dataNascimento} onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)} />
      </Form.Group>
      <Button variant="primary" type="submit">
            Salvar
      </Button>
  </Form>             
  </div>
  );
}

export default UsuarioForm;