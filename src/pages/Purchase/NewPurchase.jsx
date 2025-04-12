import { Link } from "react-router-dom";
import AddPurchase from "../../Component/Purchase/AddPurchase";


const NewPurchase = () => {
    return (
        <div>
            {/* topbar */}
            <div className="flex flex-row-reverse justify-between items-center  p-2 border-b-2 border-gray-200">
                <div>
                    <h1 className="text-xl font-semibold">Add Purchase</h1>
                </div>
                <Link to={"/purchase"} className="btn btn-primary btn-outline">
                    Back
                </Link>
            </div>

            {/* form */}
            <AddPurchase></AddPurchase>
        </div>
    );
};

export default NewPurchase;