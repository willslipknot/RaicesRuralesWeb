import {z} from "zod"

export const registerSchema = z.object({
    username: z.string({required_error: "Nombre de usuario requerido"}),
    password: z.string({required_error: "Contraseña requerido"}).min(8,{message: "La contraseña debe de ser de minimo 8 caracteres"}),
    correo:  z.string({required_error: "Correo requerido"}).email({message:"Correo invalido"}),
    telefono: z.string({ required_error: "El número de teléfono es requerido" }).length(10, { message: "El número de teléfono debe tener exactamente 10 caracteres" })

})

export const loginSchema = z.object({
    username: z.string({required_error: "Nombre de usuario requerido"}),
    password: z.string({required_error: "Contraseña requerida"}).min(8, {message: 'La contraseña debe de ser de minimo 8 caracteres'})
})