import { useState } from "react";
import { Link } from "react-router-dom";

const AddExpense = () => {

    const [form, setForm] = useState({
        title: "",
        amount: "",
        category: "",
        paymentMethod: "Cash",
        date: new Date().toISOString().slice(0, 10),
        note: ""
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // const { data } = await axios.post("/api/expenses", form);
            // onSuccess(data);
            setForm({
                title: "",
                amount: "",
                category: "",
                paymentMethod: "Cash",
                date: new Date().toISOString().slice(0, 10),
                note: ""
            });
        } catch (error) {
            console.error("Failed to add expense:", error);
        }
    };

    return (
        <div>
            {/* topbar */}
            <div className="border-b-2 py-2">
            <Link to={"/expense"} className="btn btn-outline btn-primary">back</Link >
            </div>

            <form onSubmit={handleSubmit} className="mt-3 max-w-3xl mx-auto space-y-5 p-4 border rounded bg-white shadow">
                <input
                    type="text"
                    name="title"
                    placeholder="Expense Title"
                    className="input input-bordered w-full"
                    value={form.title}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="amount"
                    placeholder="Amount"
                    className="input input-bordered w-full"
                    value={form.amount}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="category"
                    placeholder="Category (e.g. Utility)"
                    className="input input-bordered w-full"
                    value={form.category}
                    onChange={handleChange}
                />
                <select
                    name="paymentMethod"
                    className="select select-bordered w-full"
                    value={form.paymentMethod}
                    onChange={handleChange}
                >
                    <option>Cash</option>
                    <option>bKash</option>
                    <option>Bank</option>
                </select>
                <input
                    type="date"
                    name="date"
                    className="input input-bordered w-full"
                    value={form.date}
                    onChange={handleChange}
                />
                <textarea
                    name="note"
                    placeholder="Note"
                    className="textarea textarea-bordered w-full"
                    value={form.note}
                    onChange={handleChange}
                />
                <button className="btn btn-primary ">Add Expense</button>
            </form>
        </div>
    );
};

export default AddExpense;