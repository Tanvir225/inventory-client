import { useEffect, useState } from "react";
import useAxios from "./useAxios";

const usePurchase = () => {
    const axios = useAxios();

    const [purchase, setPurchase] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch purchases
    const fetchPurchases = async () => {
        try {
            setLoading(true);
            const response = await axios.get("/purchase");
            setPurchase(response?.data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(error);
        }
    };

    // Update only givenCash and totalAmount
    const updatePurchase = async (purchaseId, { givenCash }) => {
        try {
            const response = await axios.patch(`/purchase/${purchaseId}`, {
                givenCash,
            });

            // Optional: Update local state if needed
            const updatedPurchases = purchase.map(p =>
                p._id === purchaseId ? { ...p, givenCash } : p
            );
            setPurchase(updatedPurchases);

            return { success: true, data: response.data, message: "Purchase updated successfully" };
        } catch (error) {
            setError(error);
            return {
                success: false,
                message: error?.response?.data?.message || "Update failed",
            };
        }
    };

    // Delete purchase
    const deletePurchase = async (id) => {
        try {
            await axios.delete(`/purchases/${id}`);
            const newPurchases = purchase.filter((p) => p._id !== id);
            setPurchase(newPurchases);
            await fetchPurchases();
        } catch (error) {
            setError(error);
        }
    };

    useEffect(() => {
        fetchPurchases();
    }, []);

    return {
        purchase,
        loading,
        error,
        fetchPurchases,
        updatePurchase, // only for givenCash & totalAmount
        deletePurchase
    };
};

export default usePurchase;
