import jwt from "jsonwebtoken";
import usuarioController from "../controllers/usuarioController.js";

const JWTSecret = usuarioController.JWTSecret;

const Autorization = (req, res, next) => {
  const authtoken = req.headers["authorization"] || req.headers["autorization"];
  if (authtoken != undefined) {
    const bearer = authtoken.split(" ");
    const token = bearer[1];

    jwt.verify(token, usuarioController.JWTSecret, (error, data) => {
      if (error) {
        return res.status(401).json({ error: "Token inválido ou expirado" });
      } else {
        req.token = token;
        req.usuarioLogado = {
          id: data.id,
          email: data.email,
        };
        next();
      }
    });
  } else {
    res.status(401).json({ error: "Token inválido" });
  }
};

export default { Autorization };
