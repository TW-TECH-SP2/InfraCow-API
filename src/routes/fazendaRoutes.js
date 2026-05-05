import express from 'express'
import fazendaController from '../controllers/fazendaController.js'

const fazendaRoutes = express.Router();

fazendaRoutes.get("/fazendas", fazendaController.buscarTodasFazendas);

fazendaRoutes.post("/fazendas", fazendaController.registrarFazenda);

fazendaRoutes.delete("/fazendas/:id", fazendaController.deletarFazenda);

fazendaRoutes.put("/fazendas/:id", fazendaController.atualizarFazenda);

fazendaRoutes.get("/fazendas/:id", fazendaController.buscarFazendaPorID);

export default fazendaRoutes;