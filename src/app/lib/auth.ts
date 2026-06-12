import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export const COOKIE_NAME = "kyw_token";

export type AuthPayload = {
  id: string;
  email: string;
  name: string;
  role: "user" | "admin";
};

export function signToken(payload: AuthPayload): string {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is missing");
  }

  return jwt.sign(payload, secret, {
    expiresIn: "7d",
  });
}

export function verifyToken(token: string): AuthPayload | null {
  try {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      return null;
    }

    return jwt.verify(token, secret) as AuthPayload;
  } catch {
    return null;
  }
}

export async function setAuthCookie(payload: AuthPayload) {
  const token = signToken(payload);

  const cookieStore = await cookies();

  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return token;
}

export async function getSession(): Promise<AuthPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  return verifyToken(token);
}

export async function getToken(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAME)?.value ?? null;
}

export async function clearAuthCookie() {
  const cookieStore = await cookies();

  cookieStore.set(COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}

export function getRoleByEmail(email: string): "user" | "admin" {
  const adminEmails = String(process.env.ADMIN_EMAILS || "")
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);

  return adminEmails.includes(email.toLowerCase())
    ? "admin"
    : "user";
}