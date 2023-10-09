import { Router } from "express";
import { authRequire } from '../middlewares/validateToken.js'
import { getCond, getConds, putCond, deleteCond, createCond } from "../controllers/cond.controller.js";
const router = Router()

router.get('/conductores',authRequire, getConds);

router.get('/conductor/:id',authRequire, getCond);

router.post('/conductores',authRequire, createCond);

router.delete('/conductor/:id', authRequire, deleteCond);

router.put('/conductor/:id', authRequire, putCond);



export default router