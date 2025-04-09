import React, { useEffect, useState } from 'react';
import useAxios from './useAxios';

const useUnits = () => {
    // axios instance hook
    const axios = useAxios();

    //state for Units
    const [units, setUnits] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    //fetch Units
    const fetchUnits = async () => {
        try {
            setLoading(true);
            const response = await axios.get("/units");
            setUnits(response?.data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(error);
        }
    };

    //add category
    const addUnits = async (category) => {
        try {
            const response = await axios.post("/units", category);
            setUnits([...units, response.data.data]);
        } catch (error) {
            setError(error);
        }
    }

    //update category
    const updateUnits = async (unit) => {
        try {
            const response = await axios.patch(`/units/${unit.id}`, unit);
            const newUnits = units.map((c) => {
                if (c.id === unit.id) {
                    return response.data.data;
                }
                return c;
            });
            setUnits(newUnits);
        } catch (error) {
            setError(error);
        }
    }

    //delete category
    const deleteUnits= async (id) => {
        try {
            await axios.delete(`/units/${id}`);
            const newUnits = units.filter((c) => c.id !== id);
            setUnits(newUnits);
        } catch (error) {
            setError(error);
        }
    }

    // useEffect to fetch categories on component mount


    // Auto-fetch products when the hook is used
    useEffect(() => {
        fetchUnits();
    }, []);

    return { units, loading, error, addUnits, updateUnits, deleteUnits };
};

export default useUnits;