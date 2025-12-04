// client/src/router.tsx (MODIFICADO)

import {createBrowserRouter, redirect, type LoaderFunctionArgs} from 'react-router-dom' // <-- AÑADIDO: redirect y LoaderFunctionArgs
import Layout from './layouts/layout'
import Products, {loader as productsLoader, action as updateAvailabilityAction} from './views/Products'
import NewProduct, {action as newProductAction} from './views/NewProduct'
import EditProduct, {loader as editProductLoader, action as editProductAction} from './views/EditProduct'
import {action as deleteProductAction} from './components/ProductDetails'
import Login, {action as loginAction} from './views/login' 
import { getToken } from './services/AuthService' 
import { action as logoutAction } from './actions/logoutAction' 

// Loader/Guard Global para verificar la autenticación
export async function checkAuthLoader({request} : LoaderFunctionArgs) {
    const token = getToken();
    const url = new URL(request.url);

    // Si NO hay token
    if (!token) {
        // Redirigir a /login, excepto si ya estamos allí o en alguna acción no relacionada con productos
        if (url.pathname !== '/login' && !url.pathname.endsWith('/auth/logout')) {
            return redirect('/login');
        }
        return null; 
    }
    
    // Si HAY token y estamos en /login, redirigir a /
    if (token && url.pathname === '/login') {
        return redirect('/');
    }

    return null; // Continuar con la carga de la ruta
}

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        loader: checkAuthLoader, // <-- AÑADIDO GUARD A LA RUTA PADRE
        children: [
            {
                index: true,
                element: <Products/>,
                loader: productsLoader,
                action: updateAvailabilityAction
            },
            {
                path: 'productos/nuevo',
                element: <NewProduct/>,
                action: newProductAction
            },
            {
                path: 'productos/:id/editar',//resource oriented design
                element: <EditProduct/>,
                loader: editProductLoader,
                action: editProductAction
            },
            {
                path: 'productos/:id/eliminar',
                action: deleteProductAction
            },
            {
                path: '/auth/logout', // NUEVA RUTA SOLO PARA LA ACCIÓN DE CERRAR SESIÓN
                action: logoutAction 
            }
        ]
    },
    {
        path: '/login', // NUEVA RUTA PARA EL LOGIN
        element: <Login/>,
        action: loginAction,
        loader: checkAuthLoader // Para evitar que un usuario logueado acceda al login
    }
])