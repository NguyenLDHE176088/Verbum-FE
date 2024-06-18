'use client'

import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {useForm} from "react-hook-form";
import {RegisterSchema} from "@/schema/auth";
import {z} from 'zod'
import {zodResolver} from "@hookform/resolvers/zod";
import {Button} from "@/components/ui/button";
import VerbumLogo from "../../../public/verbum_logo.png";
import Image from "next/image";
import Link from "next/link";
import {useState} from "react";
import {register} from "@/data/auth";
import FormError from "@/components/auth/form-error";
import {useTransition} from "react";
import {redirect} from "next/navigation";

export default function RegisterForm() {
    const [error, setError] = useState<string | null>(null)
    const [isPending, startTransaction] = useTransition();
    const form = useForm<z.infer<typeof RegisterSchema>>({
            resolver: zodResolver(RegisterSchema),
            defaultValues: {
                username: '',
                email: '',
                password: '',
                confirmPassword: ''
            }
        }
    );
    const onSubmit = (value: z.infer<typeof RegisterSchema>) => {
        startTransaction(async () => {
            const body = {
                username: value.username,
                email: value.email,
                password: value.password,
                confirmPassword: value.confirmPassword
            }
            const response = await register(body);
            if (response.error) {
                setError(response.error.message)
            }
            if (response.success) {
                redirect('/auth/login')
            }
        })
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='w-1/3 flex flex-col gap-4'>
                <div className='flex flex-col gap-2 justify-center items-center'>
                    <Image src={VerbumLogo} alt='Verbum Logo' width={70}/>
                    <h2 className='text-lg font-semibold'>Welcome to Verbum!</h2>
                    <p>Already a user? <Link className='text-[#265DC8] underline' href='/auth/login'>Login</Link></p>
                </div>
                <FormField control={form.control} render={({field}) => (
                    <FormItem>
                        <FormLabel>User Name</FormLabel>
                        <FormControl>
                            <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )} name='username'/>

                <FormField control={form.control} render={({field}) => (
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input placeholder="example@gmail.com" {...field} />
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )} name='email'/>

                <FormField control={form.control} render={({field}) => (
                    <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                            <Input  {...field} type='password'/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )} name='password'/>

                <FormField control={form.control} render={({field}) => (
                    <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                            <Input {...field} type='password'/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )} name='confirmPassword'/>
                <FormError message={error}/>
                <Button className='rounded-3xl' type='submit' disabled={isPending}>Register</Button>
            </form>
        </Form>
    );
}
