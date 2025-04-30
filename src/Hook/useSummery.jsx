import { useEffect, useState } from "react";
import useAxios from "./useAxios";



const useSummery = () => {

    const [dailySummary, setDailySummary] = useState(null);
    const [monthlySummary, setMonthlySummary] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    //axios instance
    const axios = useAxios();

    useEffect(() => {
        const fetchSummaries = async () => {
            try {
                setLoading(true);
                const [dailyRes, monthlyRes] = await Promise.all([
                    axios.get("/today-summary"),
                    axios.get("/month-summary"),
                ]);
                setDailySummary(dailyRes.data);
                setMonthlySummary(monthlyRes.data);
            } catch (err) {
                setError(err.message || "Failed to fetch summary");
            } finally {
                setLoading(false);
            }
        };

        fetchSummaries();
    }, []);

    return { dailySummary, monthlySummary, loading, error };
};

export default useSummery;