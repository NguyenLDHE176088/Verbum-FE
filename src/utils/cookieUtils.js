"use server"
import { cookies } from "next/headers"

export async function clearCookies(name) {
    if (cookies().has(name)) {
        cookies().delete(name);
    }
}
