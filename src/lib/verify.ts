import {jwtVerify} from "jose";

export async function verifyToken(token: string) {
    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET)
        const {payload} = await jwtVerify(token, secret);
        return {success: true, payload}
    } catch (e) {
        return {success: false, error: e}
    }
}