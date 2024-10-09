export type Product = {
    name: string;
    id?: string;
    price: number;
    description: string;
    category_id: string;
    image: string;
    category?: Category;
}


export type ProductResponse = {
    mutate: (data: Product) => Promise<void>;
    data: Product | null;
    loading: boolean;
    error: Error | null;
    message: string;
    status: string;
}

export type Category = {
    id?: string;
    name: string;
    description: string;
    data: Product[];
    products: Product[];
    categories: Category[];
}

export type CategoryResponse = {
    mutate: (data: Category) => Promise<void>;
    data: Category | null
    loading: boolean
    error: Error | null
    message: string
    status: string
}
