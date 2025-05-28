import { useEffect, useState } from "react";
import useAxios from "./useAxios";


const useUsers = () => {
    //axios hook
    const axios = useAxios();
    // State for users
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch purchases
    const fetchUser = async () => {
        try {
            setLoading(true);
            const response = await axios.get("/users");
            setUser(response?.data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(error);
        }
    };

    
    useEffect(() => {
        fetchUser();
    }, []);

    return {
        user,
        loading,
        error,
        fetchUser,
        refetch: fetchUser, // Refetch function
    };
};

export default useUsers;