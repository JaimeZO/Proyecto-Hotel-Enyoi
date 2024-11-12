//config/database.js
const { sequelize } = require('sequelize');

//confuguracion de conexion a la base de datos
const sequelize = new Sequelize('hotel', 'root', 'vj05091101', {
    host: '127.0.0.1', //cambia el host si tu servidor de base de datos esta en otro lado
    dialect: 'mysql',
    logging: true, //DEsactiva el log de consultas si prefieres que no se vean en la consola
});

module.exports = sequelize;