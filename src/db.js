import pkg from 'sequelize';
const { Sequelize } = pkg;

const sequelize = new Sequelize({
  dialect: 'postgres',
  username: 'postgres',
  password: 'wills',
  database: 'raicesrurales',
  host: 'localhost',
  port: 5432,

});

export default sequelize;
