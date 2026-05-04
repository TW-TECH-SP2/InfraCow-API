import { Sequelize } from "sequelize";
import connection from "../database/dabase-config.js";
import Medicoes from "./Medicoes.js";

const Alertas = connection.define('alertas', {
    id_alertas: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    perigos: {
        type: Sequelize.STRING,
        allowNull: false
    },
    anotacoes: {
        type: Sequelize.STRING,
        allowNull: false
    }

})

export default Alertas;