import React from 'react';
import { FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import useSell from '../../Hook/useSell';
import Loading from '../../Component/Shared/Loading';
import SellGrid from '../../Component/Sell/SellGrid';

const Sell = () => {
    const { sell, loading, error,refetch } = useSell();

    // Check if loading or error
    if (loading) {
        return <Loading></Loading>
    }

    //reduce the total amount of sell
    const total = sell.reduce((acc, curr) => acc + curr.total, 0);

    //reduce the total amount of givenCash
    const givenCash = sell.reduce((acc, curr) => acc + curr.givenCash, 0);

    //reduce the total amount of due
    const due = sell.reduce((acc, curr) => acc + curr.dueAmount, 0);

    return (
        <div className='space-y-5 '>
            {/* topbar */}
            <div className="flex justify-between items-center  p-2 border-b-2 border-gray-200">
                <div>
                    <h1 className="text-xl font-semibold">Sell</h1>
                    <p className="text-gray-500">Manage your Sells</p>
                    <p className="text-sm text-gray-700">Total Sell: <span className="font-semibold text-primary">{total} TK</span></p>
                    <p className="text-sm text-gray-700">Total Cash: <span className="font-semibold text-accent">{givenCash} TK</span></p>
                    <p className="text-sm text-gray-700">Total due: <span className="font-semibold text-red-700">{due} TK</span></p>

                </div>
                <Link to={"/sell/new"} className="btn btn-primary btn-outline">
                    <FaPlus /> Add Sell
                </Link>
            </div>

            {/* sell table */}
            <SellGrid sell={sell} refetch={refetch}></SellGrid>
        </div>
    );
};

export default Sell;