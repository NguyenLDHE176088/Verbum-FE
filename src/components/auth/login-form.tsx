'use client'

import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {useForm} from "react-hook-form";
import {LoginSchema} from "@/schema/auth";
import {z} from 'zod'
import {zodResolver} from "@hookform/resolvers/zod";
import {Button} from "@/components/ui/button";
import VerbumLogo from "../../../public/verbum_logo.png";
import Image from "next/image";
import Link from "next/link";
import {useState, useTransition} from "react";
import {login} from "@/data/auth";
import FormError from "@/components/auth/form-error";
import {redirect} from "next/navigation";

export default function LoginForm() {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | null>(null)
    const form = useForm<z.infer<typeof LoginSchema>>({
            resolver: zodResolver(LoginSchema),
            defaultValues: {
                email: '',
                password: ''
            }
        }
    );
    const onSubmit = (value: z.infer<typeof LoginSchema>) => {
        startTransition(async () => {
            const response = await login(value)
            if (response.error) {
                setError('Invalid username or password')
            }
            if (response.success) {
                localStorage.setItem('isCompany', response.success.isHasCompany)
                redirect('/')
            }
        })
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='w-1/3 flex flex-col gap-4'>
                <div className='flex flex-col gap-2 justify-center items-center'>
                    <Image src={VerbumLogo} alt='Verbum Logo' width={70}/>
                    <h2 className='text-lg font-semibold'>Welcome to Verbum!</h2>
                    <p>New here? <Link className='text-[#265DC8] underline' href='/auth/register'>Signup</Link></p>
                </div>
                <FormField control={form.control} render={({field}) => (
                    <FormItem>
                        <FormLabel>Username</FormLabel>
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
                            <Input placeholder="*******" {...field} type='password'/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )} name='password'/>
                <FormError message={error}/>
                <Button className='rounded-3xl' disabled={isPending}>Login</Button>
            </form>
        </Form>
    );
}
