'use client'

import {NextRequest, NextResponse} from "next/server";

interface RegisterFormProps {
    username: string
    email: string
    password: string
    confirmPassword: string
}

interface LoginFormProps {
    email?: string
    password?: string
}

export async function register(body: RegisterFormProps) {
    if (body.password !== body.confirmPassword) {
        return {error: {message: 'Passwords do not match'}}
    }
    const response = await fetch('http://localhost:9999/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    if (!response.ok) {
        return {error: await response.json()}
    }
    return {success: await response.json()}
}

export async function login(body: LoginFormProps) {
    const response = await fetch('http://localhost:9999/auth/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
    })
    if (!response.ok) {
        return {error: await response.json()}
    }
    return {success: await response.json()}
}

export async function refreshToken(nextResponse: NextResponse, refToken: string, request: NextRequest) {
    const response = await fetch('http://localhost:9999/auth/refresh-token', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({refToken: refToken})
    })
    if (response.status === 500) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
    }
    const data = await response.json()
    nextResponse.cookies.set('token', data.token)
    return nextResponse
}