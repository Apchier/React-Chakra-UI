import { useEffect, useState } from "react"
import { ProductState } from "../../types/Type"
import axiosInstance from "../../libs/axios";

export const useProducts = (limit: number, page: number): ProductState => {
    const [state, setState] = useState<ProductState>({
        data: null,
        loading: false,
        error: null,
        message: '',
        status: ''
    });

    useEffect(() => {
        const fetchProduct = async () => {
            setState(prev => ({ ...prev, loading: true }));
            try {
                const response = await axiosInstance.get(`/products`, {
                    params: { limit, page }
                });
                const totalPages = Math.ceil(response.data.data.total / limit);
                setState({
                    data: { ...response.data, totalPages },
                    loading: false,
                    error: null,
                    message: response.data.message,
                    status: response.data.status
                });
            } catch (err) {
                setState(prev => ({
                    ...prev,
                    loading: false,
                    error: err instanceof Error ? err : new Error('An error occurred while fetching categories'),
                }));
            }
        };

        fetchProduct();
    }, [limit, page]);

    return state;
}