import express from "express";
import morgan from "morgan";
import pool from './db.js';
import authRoutes from './routes/auth.routes.js';


const app = express();
app.use(morgan('dev'));
app.use(express.json()); 
app.use(authRoutes);

export default app;