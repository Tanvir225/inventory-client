import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import useExpense from "../../Hook/useExpense";
import ExpenseGrid from "../../Component/Expense/ExpenseGrid";
import Loading from "../../Component/Shared/Loading";


const Expense = () => {

    //expense hook
    const { expenses, loading, refetch,updateExpense } = useExpense();


    //reduce the total amount
    const totalAmount = expenses.reduce((acc, expense) => parseFloat(acc) + parseFloat(expense.amount), 0);
   

    //loading state
    if (loading) {
        return <Loading></Loading>

    }

    return (
        <div>
            {/* topbar */}
            <div className="flex justify-between items-center  p-2 border-b-2 border-gray-200">
                <div>
                    <h1 className="text-xl font-semibold">Your Expense</h1>
                    <p className="text-sm text-gray-700">Total Expense: <span className="font-semibold text-primary">{totalAmount} TK</span></p>

                </div>
                <Link to={"/expense/new"} className="btn btn-primary btn-outline">
                    <FaPlus /> Add Expense
                </Link>
            </div>

            {/* grid */}
            <div>
                <ExpenseGrid refetch={refetch} expenses={expenses} updateExpense={updateExpense}></ExpenseGrid>
            </div>

        </div>
    );
};

export default Expense;