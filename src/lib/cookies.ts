'use server'
import { cookies } from "next/headers";
import jwt from 'jsonwebtoken'

const cookie = cookies()

interface User {
    id: string,
    email: string
}

export async function getUser(): Promise<User> {
    const { value = null } = cookie.get('refToken') || {}
    if (!value) {
        throw new Error("User not logged in")
    }
    try {
        return jwt.verify(value, process.env.JWT_REFRESH_SECRET) as User
    } catch (e) {
        throw new Error("An error occurred while fetching user data - " + e.message)
    }
}

export async function getLoginStatus(): Promise<boolean> {
    const { value = null } = cookie.get('refToken') || {}
    if (!value) {
        return false;
    }
    try {
        return Boolean((jwt.verify(value, process.env.JWT_REFRESH_SECRET) as User))
    } catch (e) {
        return false
    }
}


