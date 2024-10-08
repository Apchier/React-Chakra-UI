import { useState } from "react"
import axiosInstance from "../../libs/axios"
import { Category, CategoryResponse } from "../../types/Type"

export const useUpdateCategory = () => {
  const [state, setState] = useState<Omit<CategoryResponse, 'mutate'>>({
    data: null,
    loading: false,
    error: null,
    message: '',
    status: '',
  })

  const mutate = async (data: Category) => {
    setState(prev => ({ ...prev, loading: true }))
    try {
      const response = await axiosInstance.put(`/categories/${data.id}`, data)
      setState({
        data: response.data.data,
        loading: false,
        error: null,
        message: response.data.message,
        status: response.data.status
      })
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error : new Error('An unknown error occurred')
      }))
    }
  }

  return {
    ...state,
    mutate
  }
}