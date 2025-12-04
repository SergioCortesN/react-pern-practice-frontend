import { DraftProductsSchema, ProductSchema, ProductsSchema } from "../types" // <-- Importaciones de Valor
import type { Product } from "../types"
import axios from "axios";
import { safeParse } from "valibot"
import { toBoolean } from "../utils";
import { getAuthConfig, API_URL, isAuthError } from "./AuthService"; // <-- MODIFICADO: Importar getAuthConfig, API_URL e isAuthError

type ProductData = {
    [k: string]: FormDataEntryValue;
}

export async function addProduct(data: ProductData) {
    try {
        const result = safeParse(DraftProductsSchema, {
            name: data.name,
            price: Number(data.price)
        }) 
        if(result.success){
            const url = `${API_URL}/api/products` 
            await axios.post(url, {
                name: result.output.name,
                price: result.output.price
            }, getAuthConfig()) // <-- AÑADIDO: getAuthConfig()
        } else {
            throw new Error('Datos no validos')
        }
    } catch (error) {
        console.log(error)
        throw error;
    }
}

export async function getProducts() {
    try {
        const url = `${API_URL}/api/products` 
        const { data } = await axios.get(url, getAuthConfig()) // <-- AÑADIDO: getAuthConfig()
        const result = safeParse(ProductsSchema, data.data)
        if(result.success){
            return result.output
        } else {
            throw new Error('Datos no validos')
        }
    } catch (error) {
        console.error("Error al obtener los productos:", error)
        if (isAuthError(error)) { // Manejar error de autenticación
            return null; // Retorna null para que el router lo maneje
        }
        // Si no es un error de autenticación, retorna un array vacío o lanza el error
        return []; 
    }
}

export async function getProductById(id: Product['id']) {
    try {
        const url = `${API_URL}/api/products/${id}` 
        const { data } = await axios.get(url, getAuthConfig()) // <-- AÑADIDO: getAuthConfig()
        const result = safeParse(ProductSchema, data.data)
        if(result.success){
            return result.output
        } else {
            throw new Error('Datos no validos')
        }
        
    } catch (error) {
        console.error("Error al obtener el producto:", error)
        if (isAuthError(error)) { // Manejar error de autenticación
            return null; // Retorna null para que el router lo maneje
        }
        return null;
    }
}

export async function updateProduct( data: ProductData, id: Product['id']) {
    try {
        const result = safeParse(ProductSchema, {
           id,
           name: data.name,
           price: Number(data.price),
           availability: toBoolean(data.availability?.toString() ?? '')
        })
        
        if(result.success) {
            const url = `${API_URL}/api/products/${id}`
            await axios.put(url, result.output, getAuthConfig()) // <-- AÑADIDO: getAuthConfig()
        } 
    } catch (error) {
        console.log(error)
        throw error;
    }
}

export async function deleteProduct(id: Product['id']) {
    try {
        const url = `${API_URL}/api/products/${id}` 
        await axios.delete(url, getAuthConfig()) // <-- AÑADIDO: getAuthConfig()
    } catch (error) {
        console.log(error)
        throw error;
    }
}

export async function updateProductAvailability(id: Product['id'], availability: boolean) {
    try {
        const url = `${API_URL}/api/products/${id}` 
        await axios.patch(url, { availability }, getAuthConfig()) // <-- AÑADIDO: getAuthConfig()
    } catch (error) {
        console.log(error)
        throw error;
    }
}