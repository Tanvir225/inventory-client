
import { useEffect, useState } from 'react';
import useAxios from './useAxios';

const useCategories = () => {

    // axios instance hook
    const axios = useAxios();

    //state for products
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    //fetch categories
    const fetchCategories = async () => {
        try {
            setLoading(true);
            const response = await axios.get("/categories");
            setCategories(response?.data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(error);
        }
    };

    //add category
    const addCategory = async (category) => {
        try {
            const response = await axios.post("/categories", category);
            setCategories([...categories, response.data.data]);
        } catch (error) {
            setError(error);
        }
    }

    //update category
    const updateCategory = async (category) => {
        try {
            const response = await axios.patch(`/categories/${category.id}`, category);
            const newCategories = categories.map((c) => {
                if (c.id === category.id) {
                    return response.data.data;
                }
                return c;
            });
            setCategories(newCategories);
        } catch (error) {
            setError(error);
        }
    }

    //delete category
    const deleteCategory = async (id) => {
        try {
            await axios.delete(`/categories/${id}`);
            const newCategories = categories.filter((c) => c.id !== id);
            setCategories(newCategories);
        } catch (error) {
            setError(error);
        }
    }

    // useEffect to fetch categories on component mount


    // Auto-fetch products when the hook is used
    useEffect(() => {
        fetchCategories();
    }, []);

    return { categories, loading, error, addCategory, updateCategory, deleteCategory };
};

export default useCategories;


