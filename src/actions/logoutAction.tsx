// client/src/actions/logoutAction.tsx (Archivo Nuevo)

import { redirect, type ActionFunctionArgs } from "react-router-dom";
import { logoutUser } from "../services/AuthService";

export async function action({ request }: ActionFunctionArgs) {
    // Elimina el token de localStorage
    logoutUser();

    // Redirigir a la página de login
    return redirect('/login');
}