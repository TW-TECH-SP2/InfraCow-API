import express from 'express'
import usuarioController from '../controllers/usuarioController.js'
import Auth from '../middlewares/Auth.js'

const usuarioRoutes = express.Router();

usuarioRoutes.post("/usuario", usuarioController.criarUsuario);

usuarioRoutes.post("/login", usuarioController.loginUsuario);

usuarioRoutes.get("/usuarios", Auth.Autorization, usuarioController.getUsuarioLogado);

usuarioRoutes.put("/usuarios/:id", Auth.Autorization,usuarioController.updateUsuario);

export default usuarioRoutes;