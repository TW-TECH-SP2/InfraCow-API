import express from "express";
const app = express();

import connection from "./src/database/dabase-config.js";
import Usuarios from "./src/models/Usuarios.js";
import Fazendas from "./src/models/Fazendas.js";
import Animais from "./src/models/Animais.js";
import Alertas from "./src/models/Alertas.js"
import Medicoes from "./src/models/Medicoes.js";

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

connection.sync({ alter: true })
  .then(() => console.log("Banco sincronizado com sucesso!"))
  .catch((error) => console.error("Erro ao sincronizar banco: ", error));

const PORT = process.env.PORT ||3000;
app.listen(PORT, () => console.log(`API rodando em http://localhost:${PORT}`));
