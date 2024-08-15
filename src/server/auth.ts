import HttpCall from "@/configs/http.config";
import { setCookie } from "@/helpers/logic/security";
import { User } from "@/models/apis/user";
import { redirect, RedirectType } from "next/navigation";

const chanel_auth = process.env.CHANEL_AUTH;
export async function registerApi(userData: User): Promise<any> {
    try {
        const res = await HttpCall({
            method: 'POST',
            url: `${chanel_auth}/register`,
            body: userData
        });
        if (!res?.ok) {
            throw new Error(`HTTP error! status: ${res?.status}`);
        }
        return await res.json();
    } catch (error) {
        console.error('Error during registration:', error);
        throw error;
    }
}

export async function loginApi(formData: FormData): Promise<any> {
    'use server'
    const identifier = formData.get('identifier')?.toString();
    const password = formData.get('password')?.toString();
    const res = await HttpCall({
        method: 'POST',
        url: `${chanel_auth}/login`,
        body: {
            identifier: identifier,
            password: password
        }
    });
    if (await res?.status === 200) {
        const userRes = await res.json();
        setCookie({
            key: 'access_token',
            value: userRes?.jwtToken?.accessToken,
            expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
            path: '/',
            httpOnly: true,
            secure: false,
            maxAge: Number(process.env.EXPIRES_ACCESS_TOKEN)
        })
        setCookie({
            key: 'refresh_token',
            value: userRes?.jwtToken?.refreshToken,
            expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
            path: '/',
            httpOnly: true,
            secure: false,
            maxAge: Number(process.env.EXPIRES_REFRESH_TOKEN)
        })
        redirect('/', RedirectType.replace)
    }
}