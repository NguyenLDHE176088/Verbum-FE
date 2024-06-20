"use server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

interface User {
  id: string;
  email: string;
}

export async function getUserIdFromCookie(): Promise<string> {
  const cookieStore = cookies();
  const refreshToken = cookieStore.get("refToken");

  if (!refreshToken) {
    throw new Error("User not logged in");
  }

  try {
    const decoded = jwt.verify(
      refreshToken.value,
      process.env.JWT_REFRESH_SECRET as string
    ) as User;
    return decoded.id;
  } catch (e) {
    throw new Error("An error occurred while fetching user ID - " + e.message);
  }
}
