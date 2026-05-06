import express from 'express'
import animalController from '../controllers/animalController.js'
import Auth from '../middlewares/Auth.js'

const animalRoutes = express.Router();

animalRoutes.get("/animais", Auth.Autorization, animalController.buscarTodosAnimais);

animalRoutes.post("/animais", Auth.Autorization, animalController.registrarAnimal);

animalRoutes.delete("/animais/:id", Auth.Autorization, animalController.deletarAnimal);

animalRoutes.put("/animais/:id", Auth.Autorization, animalController.atualizarAnimal);

animalRoutes.get("/animais/:id", Auth.Autorization, animalController.buscarAnimalPorID);

export default animalRoutes;