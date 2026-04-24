import express from "express";
const app = express();

import connection from "./src/database/dabase-config";
import Usuarios from "./src/models/Usuarios";
import Fazendas from "./src/models/Fazendas";
import Animais from "./src/models/Animais";
import Alertas from "./src/models/Alertas"
import Medicoes from "./src/models/Medicoes";

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

connection.sync({ alter: true })
  .then(() => console.log("Banco sincronizado com sucesso!"))
  .catch((error) => console.error("Erro ao sincronizar banco: ", error));

const PORT = 3000;
app.listen(PORT, () => console.log(`API rodando em http://localhost:${port}`));
