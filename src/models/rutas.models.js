import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const Actividad = sequelize.define('Actividad', {
    nombre: {
        type: DataTypes.STRING,
        trim: true,
    },
    direccion: {
        type: DataTypes.STRING,
        trim: true,
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false,
        trim: true,
    },
    tipo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        trim: true,
    },
    imagen: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    trim: true,
    },
    },
  {
    schema: 'actividades',
    tableName: 'actividades' , 
    timestamps: false,
  });
  


export default Actividad;

