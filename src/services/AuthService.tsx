import axios, { type AxiosRequestConfig } from "axios";
import { object, string } from "valibot"; 
import type { Output } from "valibot";

export const API_URL = import.meta.env.VITE_API_URL;

export const LoginSchema = object({
    email: string(),
    password: string(),
});

export type LoginCredentials = Output<typeof LoginSchema>

type AuthResponse = {
    token: string;
}

export async function loginUser(credentials: LoginCredentials): Promise<void> {
    try {
        const url = `${API_URL}/api/auth/login`; 
        const { data } = await axios.post<AuthResponse>(url, credentials);
        
        localStorage.setItem('AUTH_TOKEN', data.token);

    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
            throw new Error('Credenciales inválidas');
        }
        console.error("Error al iniciar sesión:", error);
        throw new Error('Hubo un error al intentar iniciar sesión');
    }
}

export function getToken(): string | null {
    return localStorage.getItem('AUTH_TOKEN');
}

export function logoutUser(): void {
    localStorage.removeItem('AUTH_TOKEN');
}

export const getAuthConfig = (): AxiosRequestConfig => {
    const token = getToken();
    return {
        headers: {
            Authorization: token ? `Bearer ${token}` : '',
        }
    };
}

// Función auxiliar para manejar errores de autenticación
export const isAuthError = (error: unknown) => {
    if (axios.isAxiosError(error) && (error.response?.status === 401 || error.response?.status === 403)) {
        console.log("Error de autenticación detectado.");
        return true;
    }
    return false;
}