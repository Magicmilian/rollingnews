import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Inicio from "./Components/Principal/Inicio";
import CategoriaDinamica from "./Components/CategoriaDinamica/CategoriaDinamica";
import DetalleNoticia from "./Components/DetalleNoticia/DetalleNoticia";
import Header from "./Components/Common/Header";
import Footer from "./Components/Common/Footer";
import AgregarNoticia from "./Components/Noticias/AgregarNoticia";
import EditarNoticia from "./Components/Noticias/EditarNoticia";
import AgregarCategoria from "./Components/CategoriaDinamica/AgregarCategoria";
import EditarCategoria from "./Components/CategoriaDinamica/EditarCategoria";
import Admin from "./Components/Admin/Admin";
import Noticias from "./Components/Noticias/Noticias";
import PaginaError from "./Components/Error404/PaginaError";
import Categorias from "./Components/CategoriaDinamica/Categorias";
import ListaNoticiasxCategoria from "./Components/Noticias/ListaNoticiasxCategoria";
import Nosotros from "./Components/Common/Nosotros";
import Swal from "sweetalert2";

function App() {
  const [recargarTodo, setRecargarTodo] = useState(true);
  const [categorias, setCategorias] = useState([]);
  const [noticias, setNoticias] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [adminUser, setAdminUser] = useState();
  const [datosClima, setDatosClima] = useState({});

  useEffect(() => {
    if (recargarTodo) {
      consultarAPI();
      setRecargarTodo(false);
    }
  }, [recargarTodo]);

  const consultarAPI = async () => {
    try {
      //obtener lista de categorias
      const consulta = await fetch(
        "https://rollingnewsbackend.herokuapp.com/categorias"
      );
      const respuesta = await consulta.json();
      if (consulta.status !== 200) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Ocurrio un error, intentelo nuevamente",
        });
      }
      //Guardar en el state
      setCategorias(respuesta);
    } catch (error) {
      console.log(error);
    }
    try {
      //obtener lista de noticias
      const consulta = await fetch(
        "https://rollingnewsbackend.herokuapp.com/noticias"
      );
      const respuesta = await consulta.json();
      if (consulta.status !== 200) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Ocurrio un error, intentelo nuevamente",
        });
      }
      //Guardar en el state
      setNoticias(respuesta);
    } catch (error) {
      console.log(error);
    }
    try {
      //obtener lista de usuarios
      const consulta = await fetch(
        "https://rollingnewsbackend.herokuapp.com/users"
      );
      const respuesta = await consulta.json();
      if (consulta.status !== 200) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Ocurrio un error, intentelo nuevamente",
        });
      }
      //Guardar en el state
      setUsuarios(respuesta);
    } catch (error) {
      console.log(error);
    }
    try {
      const apikey = "0151d95c40115c254e7086dc68c32c56";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=San+Miguel+de+Tucuman,AR&appid=${apikey}&units=metric`;
      const respuesta = await fetch(url);
      const _resultado = await respuesta.json();
      setDatosClima(_resultado);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Router>
      <Header
        datosClima={datosClima}
        categorias={categorias}
        adminUser={adminUser}
        usuarios={usuarios}
        setAdminUser={setAdminUser}
      ></Header>
      <Switch>
        <Route exact path="/">
          <Inicio datosClima={datosClima} noticias={noticias}></Inicio>
        </Route>
        <Route
          exact
          path="/categoria/:nombreCategoria"
          render={(props) => {
            //codigo a ejecutar antes de renderizar el componente
            //obtener el id de la ruta
            const nombreCategoria = props.match.params.nombreCategoria;
            //buscar el producto que coincida con el id
            const categoriaSeleccionada = categorias.find(
              (categoria) => categoria.nombreCategoria === nombreCategoria
            );
            //mostrar el componente categoriaSeleccionada
            return (
              <CategoriaDinamica
                categoriaSeleccionada={categoriaSeleccionada}
                noticias={noticias}
              ></CategoriaDinamica>
            );
          }}
        ></Route>
        <Route
          exact
          path="/lista/:nombreCategoria"
          render={(props) => {
            //codigo a ejecutar antes de renderizar el componente
            //obtener el id de la ruta
            const nombreCategoria = props.match.params.nombreCategoria;
            //buscar el producto que coincida con el id
            const categoriaSeleccionada = categorias.find(
              (categoria) => categoria.nombreCategoria === nombreCategoria
            );
            //mostrar el componente categoriaSeleccionada
            return (
              <ListaNoticiasxCategoria
                categoriaSeleccionada={categoriaSeleccionada}
                noticias={noticias}
              ></ListaNoticiasxCategoria>
            );
          }}
        ></Route>

        <Route
          exact
          path="/noticia/:idNoticia"
          render={(props) => {
            //codigo a ejecutar antes de renderizar el componente
            //obtener el id de la ruta
            const idNoticia = props.match.params.idNoticia;
            //buscar la noticia que coincida con el id
            const detalleSeleccionada = noticias.find(
              (noticia) => noticia._id === idNoticia
            );
            //mostrar el componente DetalleNoticia
            return (
              <DetalleNoticia
                detalleSeleccionada={detalleSeleccionada}
              ></DetalleNoticia>
            );
          }}
        ></Route>

        <Route exact path="/admin/agregarnoticia">
          <AgregarNoticia
            setRecargarTodo={setRecargarTodo}
            categorias={categorias}
            adminUser={adminUser}
          ></AgregarNoticia>
        </Route>
        <Route
          exact
          path="/admin/editarnoticia/:idNoticia"
          render={(props) => {
            //codigo a ejecutar antes de renderizar el componente
            //obtener el id de la ruta
            const idNoticia = props.match.params.idNoticia;
            //buscar el producto que coincida con el id
            const noticiaSeleccionada = noticias.find(
              (noticia) => noticia._id === idNoticia
            );
            //mostrar el componente editarProducto
            return (
              <EditarNoticia
                categorias={categorias}
                noticia={noticiaSeleccionada}
                setRecargarTodo={setRecargarTodo}
                adminUser={adminUser}
              ></EditarNoticia>
            );
          }}
        ></Route>
        <Route exact path="/admin/agregarcategoria">
          <AgregarCategoria
            adminUser={adminUser}
            setRecargarTodo={setRecargarTodo}
          ></AgregarCategoria>
        </Route>
        <Route
          exact
          path="/admin/editarcategoria/:idCategoria"
          render={(props) => {
            const idCategoria = props.match.params.idCategoria;
            //buscar el producto que coincida con el id
            const categoriaSeleccionada = categorias.find(
              (categoria) => categoria._id === idCategoria
            );
            //mostrar el componente editarProducto
            return (
              <EditarCategoria
                categorias={categorias}
                categoria={categoriaSeleccionada}
                setRecargarTodo={setRecargarTodo}
                adminUser={adminUser}
              ></EditarCategoria>
            );
          }}
        ></Route>
        <Route exact path="/admin">
          <Admin adminUser={adminUser}></Admin>
        </Route>
        <Route exact path="/noticias">
          <Noticias
            noticias={noticias}
            setRecargarTodo={setRecargarTodo}
            adminUser={adminUser}
          ></Noticias>
        </Route>
        <Route exact path="/categorias">
          <Categorias
            categorias={categorias}
            setRecargarTodo={setRecargarTodo}
            adminUser={adminUser}
          ></Categorias>
        </Route>
        <Route exact path="/nosotros">
          <Nosotros></Nosotros>
        </Route>
        <Route exact path="*">
          <PaginaError></PaginaError>
        </Route>
      </Switch>
      <Footer></Footer>
    </Router>
  );
}

export default App;
