import { Sequelize } from "sequelize";
import connection from "../database/dabase-config";
import Medicoes from "./Medicoes";

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