import { Router } from "express";
import {login, register, logout, profile, verifyToken, putUser} from '../controllers/auth.controller.js'
import { authRequire } from '../middlewares/validateToken.js'
import {validateSchema} from '../middlewares/validator.Middleware.js'
import {registerSchema, loginSchema} from '../schemas/auth.Schema.js'

const router = Router()

router.post('/register',validateSchema(registerSchema), register)

router.post('/login',validateSchema(loginSchema), login)

router.post('/logout', logout)

router.get('/verify', verifyToken)

router.get('/profile',authRequire, profile)

router.put('/profile/:id', authRequire, putUser);

export default router