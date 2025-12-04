// client/src/actions/logoutAction.tsx (Archivo Nuevo)

import { redirect } from "react-router-dom";
import { logoutUser } from "../services/AuthService";

export async function action() {
    // Elimina el token de localStorage
    logoutUser();

    // Redirigir a la página de login
    return redirect('/login');
}