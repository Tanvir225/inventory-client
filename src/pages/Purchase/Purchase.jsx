import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import usePurchase from "../../Hook/usePurchase";
import PurchaseGrid from "../../Component/Purchase/PurchaseGrid";
import Loading from "../../Component/Shared/Loading";


const Purchase = () => {

    // purchase hook
    const { purchase, loading,refetch } = usePurchase();

    //reduce total amount
    const totalAmount = purchase.reduce((acc, curr) => acc + curr.totalAmount, 0);

    //reduce total givenCash
    const givenCash = purchase.reduce((acc, curr) => acc + curr.givenCash, 0);

    //reduce total due amount
    const dueAmount = purchase.reduce((acc, curr) => acc + curr.dueAmount, 0);


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
                    <p className="">Manage your purchase</p>
                    <p className="text-sm ">Total Purchase: <span className="font-semibold text-primary">{totalAmount} TK</span></p>
                    <p className="text-sm ">Total Paid: <span className="font-semibold text-primary">{givenCash} TK</span></p>
                    <p className="text-sm ">My Due: <span className="font-semibold text-red-800">{dueAmount} TK</span></p>

                </div>
                <Link to={"/purchase/add"} className="btn btn-primary btn-outline">
                    <FaPlus /> Add Purchase
                </Link>
            </div>

            {/* purchase table */}
            <div className="my-5">
                <PurchaseGrid purchase={purchase} refetch={refetch}></PurchaseGrid>
            </div>
        </div>
    );
};

export default Purchase;