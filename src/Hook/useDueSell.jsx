import { useEffect, useState } from 'react';
import useAxios from './useAxios';

const useDueSell = () => {
    const axios = useAxios();

    const [dueSell, setDueSell] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch purchases
    const fetchDueSell = async () => {
        try {
            setLoading(true);
            const response = await axios.get("/due-sells");
            setDueSell(response?.data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(error);
        }
    };

    useEffect(() => {
        fetchDueSell();
    }, []);

    return {
        dueSell,
        loading,
        error,
        refetch: fetchDueSell, // ✅ এখানে ঠিক করলাম
    };
};

export default useDueSell;
