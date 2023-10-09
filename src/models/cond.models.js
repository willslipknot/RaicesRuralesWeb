import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const Conductor = sequelize.define('Conductor', {
    nombre: {
        type: DataTypes.STRING,
        trim: true,
    },
    apellido: {
        type: DataTypes.STRING,
        trim: true,
    },
    licencia: {
        type: DataTypes.STRING,
        allowNull: false,
        trim: true,
    },
    placas: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        trim: true,
    },
    tipoVehiculo: {
        type: DataTypes.STRING,
        allowNull: false,
        }, 
    },
  {
    schema: 'usuarios',
    tableName: 'conductores' , 
    timestamps: false,
  });
  


export default Conductor;

