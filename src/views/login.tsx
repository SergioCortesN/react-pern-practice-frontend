// client/src/views/Login.tsx (CORREGIDO)

import { Form, useActionData, type ActionFunctionArgs, redirect} from 'react-router-dom'
import ErrorMessage from '../components/ErrorMessage'
// Separamos LoginCredentials, que es un tipo, de los valores (funciones/schemas)
import { loginUser, LoginSchema } from '../services/AuthService'; 
import type { LoginCredentials } from '../services/AuthService'; // <-- CORRECCIÓN AQUÍ
import { is } from 'valibot';

export async function action({request} : ActionFunctionArgs){
    const formData = Object.fromEntries(await request.formData());

    if(Object.values(formData).includes('')){
        return { error: 'Todos los campos son obligatorios' }
    }

    // Validación básica del formato de datos
    if (!is(LoginSchema, formData)) {
        return { error: 'Formato de email/contraseña inválido' }
    }

    try {
        await loginUser(formData as LoginCredentials);
        // Redirigir a la página principal tras un login exitoso
        return redirect('/');
    } catch (error) {
        // Capturar el error del servicio para mostrarlo
        return { error: error instanceof Error ? error.message : 'Error desconocido al iniciar sesión' };
    }
}
    
export default function Login() {
    // Captura el resultado de la función action, si es un objeto {error: string}
    const actionData = useActionData() as { error: string } | undefined;

    return (
        <div className='max-w-md mx-auto mt-20'>
            <div className='flex justify-center'>
                <h2 className='text-4xl font-black text-slate-500'>Iniciar Sesión</h2>
            </div>

            {actionData?.error && <ErrorMessage>{actionData.error}</ErrorMessage>}

            <Form className="mt-10 p-10 bg-white shadow-md rounded-lg" method='POST' noValidate>
                <div className="mb-4">
                    <label
                        className="text-gray-800"
                        htmlFor="email"
                    >
                        Email:
                    </label>
                    <input
                        id="email"
                        type="email"
                        className="mt-2 block w-full p-3 bg-gray-50"
                        placeholder="Tu Email"
                        name="email"
                        defaultValue={'admin@gmail.com'}
                    />
                </div>
                <div className="mb-4">
                    <label
                        className="text-gray-800"
                        htmlFor="password"
                    >
                        Contraseña:
                    </label>
                    <input
                        id="password"
                        type="password"
                        className="mt-2 block w-full p-3 bg-gray-50"
                        placeholder="Tu Contraseña"
                        name="password"
                        defaultValue={'123456'}
                    />
                </div>
                
                <input
                    type="submit"
                    className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded hover:bg-indigo-700"
                    value="Iniciar Sesión"
                />
            </Form>
        </div>
    );
}