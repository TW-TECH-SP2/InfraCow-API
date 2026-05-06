import express from 'express'
import fazendaController from '../controllers/fazendaController.js'
import Auth from '../middlewares/Auth.js'

const fazendaRoutes = express.Router();

fazendaRoutes.get("/fazendas", Auth.Autorization,fazendaController.buscarTodasFazendas);

fazendaRoutes.post("/fazendas", Auth.Autorization, fazendaController.registrarFazenda);

fazendaRoutes.delete("/fazendas/:id", Auth.Autorization, fazendaController.deletarFazenda);

fazendaRoutes.put("/fazendas/:id", Auth.Autorization, fazendaController.atualizarFazenda);

fazendaRoutes.get("/fazendas/:id", Auth.Autorization, fazendaController.buscarFazendaPorID);

export default fazendaRoutes;