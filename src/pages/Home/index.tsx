import React from 'react';
import { Button, Jumbotron } from 'react-bootstrap';

const Home: React.FC = () => {
  return(

    <div className="container">
      <br/>
      <Jumbotron>
        <h1>Cadastro de Usuários</h1>
        <p>
          Back-End CRUD com, GET, POST, DELETE, UPDATE E UPLOAD. Api com Spring Boot, JPA Hibernate, MySQL com Flyway, 
          Swagger, Bean Validation, Lombok para geração de construtores, gets e settes. 
        </p>
        <p>
          Front-End com React, Bootstrap, Typscrypt. 
        </p>
        <p>
          <Button variant="primary">Github</Button>
        </p>
      </Jumbotron>
    </div>

  );
}

export default Home;