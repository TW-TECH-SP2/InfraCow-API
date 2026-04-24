import { Sequelize } from "sequelize";
import connection from "../database/dabase-config";

const Usuarios = connection.define('usuarios', {
    id_usuario: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    senha: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

export default Usuarios;