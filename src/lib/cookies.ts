'use server'
import {cookies} from "next/headers";
import jwt from 'jsonwebtoken'

const cookie = cookies()

interface User {
    id: string,
    email: string
}

export async function getUser(): Promise<User> {
    const {value} = cookie.get('refToken')
    if (!value) {
        throw new Error("User not logger in")
    }
    try {
        return jwt.verify(value, process.env.JWT_REFRESH_SECRET) as User
    } catch (e) {
        throw new Error("An error occurred while fetching user data - " + e.message)
    }
}

