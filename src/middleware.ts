import {NextRequest, NextResponse} from "next/server";
import {verifyToken} from "@/lib/verify";
import {authRoutes} from "../route";
import {refreshToken} from "@/data/auth";

export async function middleware(request: NextRequest) {
    const pathName = request.nextUrl.pathname
    const token = request.cookies.get('token')?.value
    const refToken = request.cookies.get('refToken')?.value
    const isAuthRoute = authRoutes.includes(pathName)
    const nextResponse = NextResponse.next()

    if (isAuthRoute) {
        return NextResponse.next()
    }

    if (!token) {
       return await refreshToken(nextResponse, refToken, request)
    }

    const verify = await verifyToken(token)
    if (!verify.success) {
        return await refreshToken(nextResponse, refToken, request)
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};