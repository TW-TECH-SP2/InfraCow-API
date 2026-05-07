import express from 'express'
import medicoesController from '../controllers/medicoesController.js'
import Auth from '../middlewares/Auth.js'

const medicoesRoutes = express.Router();

medicoesRoutes.get("/medicao", Auth.Autorization, medicoesController.buscarTodasMedicoes);

medicoesRoutes.post("/medicao", Auth.Autorization, medicoesController.registrarMedicao);

medicoesRoutes.delete("/medicao/:id", Auth.Autorization, medicoesController.deletarMedicao);

medicoesRoutes.put("/medicao/:id", Auth.Autorization, medicoesController.atualizarMedicao);

medicoesRoutes.get("/medicao/:id", Auth.Autorization, medicoesController.buscarMedicaoPorID);

export default medicoesRoutes;