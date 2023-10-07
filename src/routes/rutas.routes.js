import { Router } from "express";
import { authRequire } from '../middlewares/validateToken.js'
import { getAct, getActs, createAct, putAct, deleteAct } from "../controllers/rutas.controller.js";
const router = Router()

router.get('/actividades',authRequire, getActs);

router.get('/actividad/:id',authRequire, getAct);

router.post('/actividades',authRequire, createAct);

router.delete('/actividad/:id', authRequire, deleteAct);

router.put('/actividad/:id', authRequire, putAct);



export default router