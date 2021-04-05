import { combineReducers } from "redux";
import proveedoresReducer from "./proveedoresReducer";
import publicacionesReducer from "./publicacionesReducer";
import autenticacionReducer from "./autenticacionReducer";
import alertaReducer from "./alertaReducer";
import registrarProveedorReducer from "./registrarProveedorReducer";
import graficosReducer from "./graficosReducer";
import publicarReducer from "./publicarReducer";
import productosReducer from "./productosReducer"
import categoriasReducer from './categoriasReducer'
import crearProductoReducer from "./crearProductoReducer";
import editarProductoReducer from './editarProductoReducer'
import eliminarProductoReducer from "./eliminarProductoReducer";
import editarPublicacionReducer from "./editarPublicacionReducer";
import comentariosReducer from "./comentariosReducer";
import crearComentarioReducer from "./crearComentarioReducer";
import editarProveedorReducer from "./editarProveedorReducer";
import calcularTotalReducer from "./calcularTotalReducer";
import pagosReducer from "./pagosReducer";
import registrarClienteReducer from "./registrarClienteReducer";


export default combineReducers({

  //AUTENTICACION
  autenticacion: autenticacionReducer,
  registrarProveedor: registrarProveedorReducer,
  registrarCliente:registrarClienteReducer,

  //PROVEEDORES
  proveedores: proveedoresReducer,
  editarProveedor: editarProveedorReducer,
  //CLIENTES



  //PUBLICACIONES
  publicaciones: publicacionesReducer,
  realizarPublicacion: publicarReducer,
  editarPublicacion: editarPublicacionReducer,

  //COMENTARIOS
  comentarios: comentariosReducer,
  crearComentario: crearComentarioReducer,
  
  //PRODUCTOS
  productos: productosReducer,
  crearProducto: crearProductoReducer,
  editarProducto: editarProductoReducer,
  eliminarProducto: eliminarProductoReducer,

  //CATEGORIAS
  categorias: categoriasReducer,

  //EXTRAS
  alerta: alertaReducer,
  total: calcularTotalReducer,

  //PAGOS
  pagos: pagosReducer,
  //GRAFICOS
  graficos: graficosReducer,
  
});
