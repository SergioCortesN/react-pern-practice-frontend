import {Form, useNavigate, type ActionFunctionArgs, redirect, useFetcher} from "react-router-dom"
import type { Product } from "../types"
import { formatCurrency } from "../utils"
import { deleteProduct } from "../services/ProductService"

type ProductDetailsProps = {
    product: Product
}

export async function action({params} : ActionFunctionArgs){
    if(params.id) {
        await deleteProduct(+params.id)
        return redirect('/')
    }
    return redirect('/')
}

export default function ProductDetails({product} : ProductDetailsProps) {

    const fetcher = useFetcher()
    const navigate = useNavigate()

    const isAvailable = product.availability
    return (
        <tr className="border-b">
            <td className="p-3 text-lg text-gray-800">
                {product.name}
            </td>

            <td className="p-3 text-lg text-gray-800">
                {formatCurrency(Number(product.price))}
            </td>

            <td className="p-3 text-lg text-gray-800">
                <fetcher.Form method="POST">
                    <button
                    type="submit"
                    name="id"
                    value={product.id}
                    className={`${isAvailable ? 'text-black' : 'text-red-600'} rounded-lg p-2 text-xs uppercase 
                    font-bold w-full border border-black-100 hover:cursor-pointer`}
                    >
                        {isAvailable ? "Disponible" : "No Disponible"}
                    </button>
                    <input type="hidden" name="id" value={product.id} />
                    <input type="hidden" name="availability" value={(!isAvailable).toString()} />
                </fetcher.Form>
                
            </td>

            <td className="p-3 text-lg text-gray-800">
                <div>
                    <button
                        onClick={() => navigate(`productos/${product.id}/editar`)}
                    className="rounded-lg bg-indigo-600 p-2 text-xs font-bold text-white w-full font-bold text-center"
                    >Editar</button>

                    <Form
                    className="w-full"
                    method="POST"
                    action={`productos/${product.id}/eliminar`}
                    onSubmit={(e) => {
                        if (!confirm('¿Eliminar?')) {
                            e.preventDefault()
                        }
                    }}
                    >
                        <input type="submit" 
                        value='Eliminar'
                        className="rounded-lg bg-red-600 p-2 text-xs font-bold text-white w-full font-bold text-center"
                        />
                    </Form>
                </div>
            </td>
        </tr>
    )
}


