import express from 'express'
import usuarioController from '../controllers/usuarioController.js'

const usuarioRoutes = express.Router();

usuarioRoutes.post("/usuario", usuarioController.criarUsuario);

usuarioRoutes.post("/login", usuarioController.loginUsuario);

usuarioRoutes.get("/usuarios", usuarioController.getUsuarioLogado);

usuarioRoutes.put("/usuarios/:id", usuarioController.updateUsuario);

export default usuarioRoutes;