import { object, string, number, boolean, type Output, array, pipe, transform, unknown } from "valibot";

export const DraftProductsSchema = object({
    name: string(),
    price: number(),
})

export const ProductSchema = object({
    id: number(),
    name: string(),
    price: pipe(unknown(), transform((value) => typeof value === 'string' ? parseFloat(value) : value)),
    availability: boolean(),
})

export const ProductsSchema = array(ProductSchema)
export type Product = Output<typeof ProductSchema>