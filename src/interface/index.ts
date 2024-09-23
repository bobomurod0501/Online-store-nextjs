export interface ProductsType {
    id:number,
    title:string,
    description:string,
    image:string,
    price:number,
    category:string,
    rating:{rate:number, count:number},
    quantity:number
}