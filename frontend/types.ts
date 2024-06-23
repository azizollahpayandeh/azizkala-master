// types.ts
export interface ProductImage {
    image: string;
  }
  
  export interface ProductType {
    id: number;
    product_name: string;
    price: number;
    images: ProductImage[];
  }
  