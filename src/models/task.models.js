import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const Tareas = sequelize.define('Task', {
    title: {
        type: DataTypes.STRING,
        trim: true,
    },
    description: {
        type: DataTypes.STRING,
        trim: true,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
        trim: true,
     
    },
    },
  {
    schema: 'usuarios',
    tableName:"tareas" , 
    timestamps: false,
  });
  


export default Tareas;

