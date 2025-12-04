// client/src/layouts/layout.tsx (MODIFICADO)

import {Outlet, Form} from 'react-router-dom' // <-- AÑADIDO: Form

export default function Layout() {
    return (
        <>
            <header className='bg-slate-800'>
                <div className='mx-auto max-w-6xl py-10 flex justify-between items-center'> {/* Modificado: añadido flex y items-center */}
                    <h1 className='text-4xl font-extrabold text-white'>
                        Administrador de Productos
                    </h1>
                    {/* Botón de Cerrar Sesión usando Form y la acción de logout */}
                    <Form method="POST" action="/auth/logout">
                        <button
                            type='submit'
                            className='rounded-md bg-red-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-red-500'
                        >
                            Cerrar Sesión
                        </button>
                    </Form>
                </div>
            </header>

            <main className='mt-10 mx-auto max-w-6xl p-10 bg-white'>
                <Outlet/>
            </main>
            
        </>
    );
}