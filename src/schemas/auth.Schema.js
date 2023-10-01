import {z} from "zod"

export const registerSchema = z.object({
    username: z.string({required_error: "Nombre de usuario requerido"}),
    password: z.string({required_error: "Contraseña requerido"}).min(8,{required_error: "La contraseña debe de ser de minimo 8 caracteres"}),
    correo:  z.string({required_error: "Correo requerido"}).email({required_error: "Correo invalido"}),
    telefono: z.number({required_error: "El numero de telefono es requerido"}).max(10, {required_error: "Son 10 caracteres"}).min(10, {required_error: "Son 10 caracteres"})

})

export const loginSchema = z.object({
    username: z.string({required_error: "Nombre de usuario requerido"}),
    password: z.string({required_error: "Contraseña requerido"}).min(8,{required_error: "La contraseña debe de ser de minimo 8 caracteres"}),
})