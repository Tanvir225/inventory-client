import { useEffect, useState } from "react";
import useAxios from "./useAxios";


const useProducts = () => {
    // axios instance hook
    const axios = useAxios();

    //state for products
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    //fetch products
    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await axios.get("/products");
            setProducts(response?.data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(error);
        }
    };

    //add product
    const addProduct = async (product) => {
        try {
            const response = await axios.post("/products", product);
            setProducts(prev => [...prev, response.data.data]); // 👈 FIXED
            await fetchProducts(); // 👈 FIXED: Fetch products after adding a new one
            return { success: true, message: "Product added successfully" };
        } catch (error) {
            setError(error);
            return { success: false, message: error?.response?.data?.message || "Failed to add product" };
        }
    };



    //update product

    const updateProduct = async (productId, updatedProduct) => {
        try {
            // Use the productId and updatedProduct for the request
            const response = await axios.patch(`/products/${productId}`, updatedProduct);

            // Update the products list with the new data
            const newProducts = products.map((p) => {
                if (p.id === productId) {
                    return response.data.data; // Replace with updated product
                }
                return p;
            });

            setProducts(newProducts);

            // Refetch products after updating
            await fetchProducts();
        } catch (error) {
            setError(error);
        }
    };


    //delete product
    const deleteProduct = async (id) => {
        try {
            await axios.delete(`/products/${id}`);
            const newProducts = products.filter((p) => p.id !== id);
            setProducts(newProducts);
            await fetchProducts(); // 👈 FIXED: Fetch products after deleting one
        } catch (error) {
            setError(error);
        }
    }

    // Auto-fetch products when the hook is used
    useEffect(() => {
        fetchProducts();
    }, []);

    return { products, loading, error, addProduct, updateProduct, deleteProduct };
};

export default useProducts;