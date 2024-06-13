'use server'
import {cookies} from "next/headers";
import jwt from 'jsonwebtoken'

const cookie = cookies()

export async function getUser() {
    const {value} = cookie.get('refToken')
    if (!value) {
        throw new Error("User not logger in")
    }
    return jwt.verify(value, process.env.JWT_REFRESH_SECRET);
}