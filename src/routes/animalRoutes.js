import express from 'express'
import animalController from '../controllers/animalController.js'

const animalRoutes = express.Router();

animalRoutes.get("/animais", animalController.buscarTodosAnimais);

animalRoutes.post("/animais", animalController.registrarAnimal);

animalRoutes.delete("/animais/:id", animalController.deletarAnimal);

animalRoutes.put("/animais/:id", animalController.atualizarAnimal);

animalRoutes.get("/animais/:id", animalController.buscarAnimalPorID);

export default animalRoutes;