import {z} from 'zod'

export const LoginSchema = z.object({
    email: z.string().email({message: 'Invalid email address'}),
    password: z.string().min(1, {message: 'Password is required'})
})

export const RegisterSchema = z.object({
    username: z.string().min(1, {message: 'Name is required'}),
    email: z.string().email({message: 'Invalid email address'}),
    password: z.string().min(1, {message: 'Password is required'}),
    confirmPassword: z.string().min(1, {message: 'Confirm password is required'})
})

export const PreCompanySchema = z.object({
    firstName: z.string().min(1, {message: 'First name is required'}),
    lastName: z.string().min(1, {message: 'Last name is required'}),
    companyName: z.string().min(1, {message: 'Company name is required'})
})