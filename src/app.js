import express from "express";
import morgan from "morgan";
import authRoutes from './routes/auth.routes.js';
import actRoutes from './routes/rutas.routes.js';
import condRoutes from './routes/cond.routes.js';
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rutaImagenes = path.resolve(__dirname, 'C:/Users/wills/Documents/Proyecto Web/Raices/client/src/assets/images');

const app = express();
app.use('/images', express.static(rutaImagenes));

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(express.json({ limit: '50mb' }));
app.use(morgan('dev'));
app.use(express.json()); 
app.use(cookieParser());
app.use(authRoutes);
app.use(actRoutes);
app.use(condRoutes);


export default app;