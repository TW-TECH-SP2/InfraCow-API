import express from "express";
const app = express();

import connection from "./src/database/dabase-config";

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

connection.sync({ alter: true })
  .then(() => console.log("Banco sincronizado com sucesso!"))
  .catch((error) => console.error("Erro ao sincronizar banco: ", error));

const PORT = 3000;
app.listen(PORT, () => console.log(`API rodando em http://localhost:${port}`));
