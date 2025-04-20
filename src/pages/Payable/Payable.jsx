

import SellGrid from "../../Component/Sell/SellGrid";
import Loading from "../../Component/Shared/Loading";
import useDueSell from "../../Hook/useDueSell";


const Payable = () => {

    //useDueSell hook to get the dues data
    const { dueSell, loading,refetch } = useDueSell();

    //reduce the total amount of dues
    const total = dueSell.reduce((acc, curr) => acc + curr.dueAmount, 0);
  

    // Check if loading or error
    if (loading) {
        return <Loading></Loading>
    }


    return (
        <div className="space-y-5 ">
            {/* topbar */}
            <div className="flex justify-between items-center  p-2 border-b-2 border-gray-200">
                <div>
                    <h1 className="text-xl font-semibold">Due - Sell</h1>
                    <p className="text-gray-500">Manage your Dues</p>
                    <p className="text-sm text-gray-700">Total Dues: <span className="font-semibold text-primary">{total} TK</span></p>

                </div>
            </div>

            {/* sell table */}
            <SellGrid sell={dueSell} refetch={refetch} ></SellGrid>
        </div>
    );
};

export default Payable;