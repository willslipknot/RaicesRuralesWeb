import { Router } from "express";
import {login, register, logout, profile} from '../controllers/auth.controller.js'
import { authRequire } from '../middlewares/validateToken.js'
import {validateSchema} from '../middlewares/validator.Middleware.js'
import {registerSchema, loginSchema} from '../schemas/auth.Schema.js'

const router = Router()

router.post('/register',validateSchema(registerSchema), register)

router.post('/login',validateSchema(loginSchema), login)

router.post('/logout', logout)

router.get('/profile',authRequire, profile)

export default router