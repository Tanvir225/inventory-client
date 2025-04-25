import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";


const Expense = () => {
    return (
        <div>
            {/* topbar */}
            <div className="flex justify-between items-center  p-2 border-b-2 border-gray-200">
                <div>
                    <h1 className="text-xl font-semibold">Your Expense</h1>
                    <p className="text-sm text-gray-700">Total Expense: <span className="font-semibold text-primary">00 TK</span></p>

                </div>
                <Link to={"/expense/new"} className="btn btn-primary btn-outline">
                    <FaPlus /> Add Expense
                </Link>
            </div>

        </div>
    );
};

export default Expense;