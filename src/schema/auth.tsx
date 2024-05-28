import {z} from 'zod'

export const LoginSchema = z.object({
    email: z.string().email({message: 'Invalid email address'}),
    password: z.string().min(1, {message: 'Password is required'})
})

export const RegisterSchema = z.object({
    email: z.string().email({message: 'Invalid email address'}),
    password: z.string().min(1, {message: 'Password is required'}),
    confirmPassword: z.string().min(1, {message: 'Confirm password is required'})
}).refine(data => data.password !== data.confirmPassword, {
    message: 'Password must be equal confirm password'
})