import {z} from 'zod'

export const LoginSchema = z.object({
    email: z.string().email({message: 'Invalid email address'}),
    password: z.string().min(1, {message: 'Password is required'})
})

export const RegisterSchema = z.object({
    name: z.string().min(1, {message: 'Name is required'}),
    email: z.string().email({message: 'Invalid email address'}),
    password: z.string().min(1, {message: 'Password is required'}),
    confirmPassword: z.string().min(1, {message: 'Confirm password is required'})
})
