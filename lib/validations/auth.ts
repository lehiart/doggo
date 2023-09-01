import * as z from 'zod'

export const userAuthSchema = z.object({
  email: z.string().email({
    message: 'El email no es válido',
  }),
  password: z.string().min(1, { message: 'La contraseña es requerida' }),
})

export const userRegisterSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'El nombre debe ser por lo menos de 2 caracteres' }),
  email: z.string().email({
    message: 'El email no es válido',
  }),
  password: z
    .string()
    .min(5, { message: 'La contraseña debe ser por lo menos de 5 caracteres' }),
})
