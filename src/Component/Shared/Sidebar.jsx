import React from 'react';
import { AiOutlineProduct } from 'react-icons/ai';
import { BiPurchaseTagAlt } from 'react-icons/bi';
import { BsShopWindow } from 'react-icons/bs';
import { FaRegChartBar } from 'react-icons/fa';
import { GiExpense, GiPayMoney, GiSellCard } from 'react-icons/gi';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {

    const links = (
        <>
            <li>
                <NavLink
                    to="/"
                    className={ ({ isActive }) =>
                        isActive
                            ? "btn md:w-32 bg-white text-black border-none"
                            : "btn md:w-32 btn-outline border-x-neutral"
                    }
                >
                    <BsShopWindow size={20} /> Home
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/products"
                    className={({ isActive }) =>
                        isActive
                            ? "btn md:w-32 bg-white text-black border-none"
                            : "btn md:w-32 btn-outline border-x-neutral "
                    }
                >
                    <AiOutlineProduct size={20} /> Products
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/purchase"
                    className={({ isActive }) =>
                        isActive
                            ? "btn md:w-32 bg-white text-black border-none"
                            : "btn md:w-32 btn-outline border-x-neutral "
                    }
                >
                    <BiPurchaseTagAlt size={20} /> Purchase
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/sell"
                    className={({ isActive }) =>
                        isActive
                            ? "btn md:w-32 bg-white text-black border-none"
                            : "btn md:w-32 btn-outline border-x-neutral "
                    }
                >
                    <GiSellCard size={20} /> Sell
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/payable"
                    className={({ isActive }) =>
                        isActive
                            ? "btn md:w-32 bg-white text-black border-none"
                            : "btn md:w-32 btn-outline border-x-neutral "
                    }
                >
                    <GiPayMoney size={20} className="mt-1" /> Payable
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/expense"
                    className={({ isActive }) =>
                        isActive
                            ? "btn md:w-32 bg-white text-black border-none"
                            : "btn md:w-32 btn-outline border-x-neutral "
                    }
                >
                    <GiExpense size={20} /> Expense
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/statement"
                    className={({ isActive }) =>
                        isActive
                            ? "btn md:w-32 bg-white text-black border-none"
                            : "btn md:w-32 btn-outline border-x-neutral "
                    }
                >
                    <FaRegChartBar size={20} /> Statement
                </NavLink>
            </li>
        </>
    );


    return (
        <div className='bg-primary text-white p-5 md:h-[95vh] rounded flex flex-col items-center justify-center'>
            <ul className='text-center space-y-5 md:space-y-7'>
                {links}
            </ul>
        </div>
    );
};

export default Sidebar;