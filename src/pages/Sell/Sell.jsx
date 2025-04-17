import React from 'react';
import { FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Sell = () => {
    return (
        <div>
             {/* topbar */}
             <div className="flex justify-between items-center  p-2 border-b-2 border-gray-200">
                <div>
                    <h1 className="text-xl font-semibold">Sell</h1>
                    <p className="text-gray-500">Manage your Sells</p>
                    <p className="text-sm text-gray-700">Total Sell: <span className="font-semibold text-primary">00 TK</span></p>

                </div>
                <Link to={"/sell/new"} className="btn btn-primary btn-outline">
                    <FaPlus /> Add Sell
                </Link>
            </div>
        </div>
    );
};

export default Sell;