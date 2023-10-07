import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const User = sequelize.define('User', {
    nombre: {
        type: DataTypes.STRING,
        trim: true,
    },
    apellido: {
        type: DataTypes.STRING,
        trim: true,
    },
    telefono: {
        type: DataTypes.STRING,
        allowNull: false,
        trim: true,
    },
    correo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        trim: true,
    },
    username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    trim: true,
    },
    password: {
    type: DataTypes.STRING,
    allowNull: false,
    }, 
    tipoUser: {
        type: DataTypes.STRING,
        allowNull: false,
        }, 
    },
  {
    schema: 'usuarios',
    tableName: 'usuarios' , 
    timestamps: false,
  });
  


export default User;

