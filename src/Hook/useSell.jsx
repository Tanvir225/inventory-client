import { useEffect, useState } from "react";
import useAxios from "./useAxios";


const useSell = () => {
    const axios = useAxios();

    const [sell, setSell] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch purchases
    const fetchSell = async () => {
        try {
            setLoading(true);
            const response = await axios.get("/sales");
            setSell(response?.data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(error);
        }
    };

    const updateSell = async (sellId, { cash }) => {
        try {
            const response = await axios.patch(`/sales/${sellId}`, {
                cash,
            });

            const updated = response.data?.updated;
            if (!updated) throw new Error("No updated data from server");

            // Update full object (givenCash, dueAmount, etc.)
            const updatedSell = sell.map(p =>
                p._id === sellId ? { ...p, ...updated } : p
            );
            setSell(updatedSell);

            return {
                success: true,
                data: updated,
                message: response.data?.message || "Purchase updated successfully",
            };
        } catch (error) {
            setError(error);
            return {
                success: false,
                message: error?.response?.data?.message || "Update failed",
            };
        }
    };



    // Delete purchase
    const deleteSell = async (id) => {
        try {
            await axios.delete(`/sales/${id}`);
            const newSell = sell.filter((p) => p._id !== id);
            setSell(newSell);
            await fetchSell();
        } catch (error) {
            setError(error);
        }
    };

    useEffect(() => {
        fetchSell();
    }, []);

    return {
        sell,
        loading,
        error,
        fetchSell,
        updateSell, // only for givenCash & totalAmount
        deleteSell
    };
};

export default useSell;