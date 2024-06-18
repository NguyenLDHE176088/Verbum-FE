import {NextRequest, NextResponse} from "next/server";
import {verifyToken} from "@/lib/verify";
import {authRoutes} from "../route";

export async function middleware(request: NextRequest) {
    const pathName = request.nextUrl.pathname
    const token = request.cookies.get('token')?.value
    const isAuthRoute = authRoutes.includes(pathName)

    if (isAuthRoute) {
        return NextResponse.next()
    }

    if (!token) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    const verify = await verifyToken(token)
    if (!verify.success) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};