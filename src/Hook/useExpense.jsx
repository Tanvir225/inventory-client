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
        const { data } = await axios.get("/expenses");
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
        const { data } = await axios.post("/expenses", expenseData);
        setExpenses((prev) => [data, ...prev]); // update list immediately
      } catch (err) {
        console.error("Add expense error:", err);
        throw err;
      }
    };

    //update expense
    const updateExpense = async (id, expenseData) => {
      try {
        const { data } = await axios.patch(`/expenses/${id}`, expenseData);
        setExpenses((prev) =>
          prev.map((expense) => (expense._id === id ? data : expense))
        );
      } catch (err) {
        console.error("Update expense error:", err);
        throw err;
      }
    };

    //delete expense
    const deleteExpense = async (id) => {
      try {
        await axios.delete(`/expenses/${id}`);
        setExpenses((prev) => prev.filter((expense) => expense._id !== id));
      } catch (err) {
        console.error("Delete expense error:", err);
        throw err;
      }
    };  
  
    useEffect(() => {
      fetchExpenses();
    }, []);
  
    return {
      expenses,
      updateExpense,
      deleteExpense,
      loading,
      error,
      addExpense,
      refetch: fetchExpenses,
    };
};

export default useExpense;