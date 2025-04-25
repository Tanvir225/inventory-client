import { useEffect, useState } from "react";
import useAxios from "./useAxios";


const useExpense = () => {
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    //axios instance for API calls
    const axios = useAxios()
  
    const fetchExpenses = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("/api/expenses");
        setExpenses(data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch expenses", err);
      } finally {
        setLoading(false);
      }
    };
  
    const addExpense = async (expenseData) => {
      try {
        const { data } = await axios.post("/api/expenses", expenseData);
        setExpenses((prev) => [data, ...prev]); // update list immediately
      } catch (err) {
        console.error("Add expense error:", err);
        throw err;
      }
    };
  
    useEffect(() => {
      fetchExpenses();
    }, []);
  
    return {
      expenses,
      loading,
      error,
      addExpense,
      refetch: fetchExpenses,
    };
};

export default useExpense;