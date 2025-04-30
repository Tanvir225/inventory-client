import { useRef, useState } from "react";
import toast from "react-hot-toast";
import useExpense from "../../Hook/useExpense";
import { AgGridReact } from "ag-grid-react";


const ExpenseGrid = ({ expenses, refetch, updateExpense }) => {



    const gridRef = useRef();
    const [id, setId] = useState(0);
    const [form, setForm] = useState({
        title: "",
        amount: "",
        paymentMethod: "Cash",
        date: new Date().toISOString().slice(0, 10),
        note: ""
    });

    



    // Column definitions for the grid
    const [colDefs, setColDefs] = useState([
        { field: "date", sortable: true, filter: true, floatingFilter: true, headerName: "Date" },
        { field: "title", sortable: true, filter: true, floatingFilter: true, headerName: "Title" },
        {
            field: "amount", sortable: true, filter: true, floatingFilter: true, headerName: "Amount", valueFormatter: (params) => {
                return `${params.value} tk`;
            }
        },
        {
            field: "paymentMethod", sortable: true, filter: true, floatingFilter: true, headerName: "Payment Method"
        },
        { field: "note", sortable: true, filter: true, floatingFilter: true, headerName: "Note" },

        {
            field: "options",
            headerName: "Actions",
            cellRenderer: (params) => {
                return (
                    <div className="flex items-center gap-2 my-1">
                        {/* <button
                            className="btn btn-sm btn-outline btn-primary"
                            // onClick={() => handleDetails(params.data._id)}
                        >
                            Details
                        </button> */}
                        <button
                            className="btn btn-sm btn-outline btn-error"
                            onClick={() => handleUpdate(params.data._id)}
                        >
                            Update
                        </button>
                    </div>
                );
            }
        }
    ])

    // pagination settings
    // pagination settings
    const pagination = true;
    const paginationPageSize = 10;
    const paginationPageSizeSelector = [10, 20, 50];

    //handleUpdate function
    const handleUpdate = (id) => {
        setId(id);
        const expenseToUpdate = expenses.find(p => p._id === id);

        if (expenseToUpdate) {
            setForm({
                title: expenseToUpdate.title,
                amount: expenseToUpdate.amount,
                paymentMethod: expenseToUpdate.paymentMethod,
                date: expenseToUpdate.date,
                note: expenseToUpdate.note
            });
        }
        document.getElementById('my_modal_1').showModal();
    };

    //handleChange function

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    //handleSubmit function
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
            await updateExpense(id,form);
            refetch(); // refetch the data after adding a new expense

            //    successful and show a success message
            toast.success("Expense updated successfully!");
            setForm({
                title: "",
                amount: 0,
                paymentMethod: "Cash",
                date: new Date().toISOString().slice(0, 10),
                note: ""
            });


        } catch (error) {
            console.error("Failed to update expense:", error);
            toast.error("Failed to add expense. Please try again.");
        }

    };


    console.log(expenses);
    return (
        <div className='ag-theme-quartz w-full h-96 '>

            <AgGridReact
                ref={gridRef}
                pagination={pagination}
                paginationPageSize={paginationPageSize}
                paginationPageSizeSelector={paginationPageSizeSelector}
                key={JSON.stringify(expenses)} // 👈 will re-render on data change// 👈 triggers re-render when length changes
                getRowId={(params) => params.data._id} // 👈 use _id as row ID
                animateRows={true}
                rowData={expenses}
                columnDefs={colDefs}

            />

            {/* modal for update expense form */}
            <dialog id="my_modal_1" className="modal">
                <div className="modal-box space-y-5">
                    <h3 className="font-bold text-lg">Update Expense!</h3>
                    <form onSubmit={handleSubmit}  className="space-y-5">
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
                        <button className="btn btn-primary ">Update Expense</button>
                    </form>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default ExpenseGrid;