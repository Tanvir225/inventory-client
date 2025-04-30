import { useState } from "react";
import { Link } from "react-router-dom";

import toast from "react-hot-toast";
import useExpense from "../../Hook/useExpense";

const AddExpense = () => {

    //axios hook
    const { addExpense } = useExpense()

    const [form, setForm] = useState({
        title: "",
        amount: "",
        paymentMethod: "Cash",
        date: new Date(),
        note: ""
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            setForm({
                title: "",
                amount: parseFloat(form.amount),
                paymentMethod: "Cash",
                date: new Date().toISOString().slice(0, 10),
                note: ""
            });
            // Call the addExpense function from the useExpense hook
            await addExpense(form);

            //    successful and show a success message
            toast.success("Expense added successfully!");
            setForm({
                title: "",
                amount: "",
                paymentMethod: "Cash",
                date: new Date().toISOString().slice(0, 10),
                note: ""
            });


        } catch (error) {
            console.error("Failed to add expense:", error);
            toast.error("Failed to add expense. Please try again.");
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
                    className="input input-bordered w-full focus:outline-none"
                    value={form.title}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="amount"
                    placeholder="Amount"
                    className="input input-bordered w-full focus:outline-none"
                    value={form.amount}
                    onChange={handleChange}
                    required
                />

                <select
                    name="paymentMethod"
                    className="select select-bordered w-full focus:outline-none"
                    value={form.paymentMethod}
                    onChange={handleChange}
                >
                    <option>Cash</option>
                    <option>bKash</option>
                    <option>Nagad</option>
                    <option>Rocket</option>
                    <option>Bank</option>
                </select>
                <input
                    type="date"
                    name="date"
                    className="input input-bordered w-full focus:outline-none"
                    value={form.date}
                    onChange={handleChange}
                />
                <textarea
                    name="note"
                    placeholder="Note"
                    className="textarea textarea-bordered w-full focus:outline-none"
                    value={form.note}
                    onChange={handleChange}
                />
                <button className="btn btn-primary ">Add Expense</button>
            </form>
        </div>
    );
};

export default AddExpense;