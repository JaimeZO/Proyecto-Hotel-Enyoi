const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); //importa tu conexion a sequelize

const usuario = sequelize.define('usuario',{
    nombre: {
        type: DataTypes.STRING,
        allowNull: false, 
    },
    correo: {
        type: DataTypes.STRING,
        allowNull: false, 
        unique: true
    },
    clave: {
        type: DataTypes.STRING,
        allowNull: false, 
    },
    telefono: {
        type: DataTypes.STRING,
        allowNull: false, 
    },
    direccion: {
        type: DataTypes.STRING,
        allowNull: false, 
    },
    tipo: {
        type: DataTypes.ENUM('cliente', 'administrador'),
        defaultValue: 'cliente'
    }
}, {
    tableName: 'usuarios',
    timestamps: false //Desactiva la creacion automatica de createdAT y updatedAT
});

module.exports = usuario;