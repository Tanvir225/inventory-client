import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import usePurchase from "../../Hook/usePurchase";
import PurchaseGrid from "../../Component/Purchase/PurchaseGrid";
import Loading from "../../Component/Shared/Loading";


const Purchase = () => {

    // purchase hook
    const { purchase, loading } = usePurchase();

    //reduce total amount
    const totalAmount = purchase.reduce((acc, curr) => acc + curr.totalAmount, 0);


    //loading state
    if (loading) {
        return <Loading></Loading>;
    }

    return (
        <div>
            {/* topbar */}
            <div className="flex justify-between items-center  p-2 border-b-2 border-gray-200">
                <div>
                    <h1 className="text-xl font-semibold">Purchase</h1>
                    <p className="text-gray-500">Manage your purchase</p>
                    <p className="text-sm text-gray-700">Total Purchase: <span className="font-semibold text-primary">{totalAmount} TK</span></p>

                </div>
                <Link to={"/purchase/add"} className="btn btn-primary btn-outline">
                    <FaPlus /> Add Purchase
                </Link>
            </div>

            {/* purchase table */}
            <div className="my-5">
                <PurchaseGrid purchase={purchase}></PurchaseGrid>
            </div>
        </div>
    );
};

export default Purchase;