import React,{useEffect} from "react";
import { withRouter } from "react-router-dom"; //Sirve para redireccionar a una pagina
import ListGroup from "react-bootstrap/ListGroup";
import Categoria from "./Categoria";

const Categorias = (props) => {
  useEffect(() => {
    if(props.adminUser !== true){
      props.history.push("/");
    }
  });
  return (
    <section className="container my-4">
      <h1 className="text-center">Todas las Categorias</h1>
      <ListGroup>
        {props.categorias.map((itemCategoria) => (
          <Categoria key={itemCategoria._id} categoria={itemCategoria} setRecargarTodo={props.setRecargarTodo}></Categoria>
        ))}
      </ListGroup>
    </section>
  );
};

export default withRouter(Categorias);
