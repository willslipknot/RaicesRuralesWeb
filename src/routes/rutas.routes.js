import { Router } from "express";
import { authRequire } from '../middlewares/validateToken.js'
import { getAct, getActs, createAct, putAct, deleteAct} from "../controllers/rutas.controller.js";
import { storage } from '../middlewares/storage.js'
import multer from "multer";

const upload = multer({storage}).single('imagen');
const router = Router()

router.get('/actividades',authRequire, getActs);

router.get('/actividades/images',authRequire, getActs);

router.get('/actividad/:id',authRequire, getAct);

router.post('/actividades',authRequire, upload, createAct);

router.delete('/actividad/:id', authRequire, deleteAct);

router.put('/actividad/:id', authRequire, putAct);



export default router