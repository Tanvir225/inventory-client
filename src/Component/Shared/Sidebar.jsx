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
                <NavLink to={"/"} className={"btn btn-outline border-x-neutral"}><BsShopWindow size={20}></BsShopWindow> Home</NavLink>
            </li>
            <li>
                <NavLink to={"/products"} className={"btn btn-outline border-x-neutral border-y-neutral"}><AiOutlineProduct size={20}></AiOutlineProduct> Products</NavLink>
            </li>
            <li>
                <NavLink to={"/purchase"} className={"btn btn-outline border-x-neutral border-y-neutral"}> <BiPurchaseTagAlt size={20} ></BiPurchaseTagAlt>Purchase</NavLink>
            </li>
            <li>
                <NavLink to={"/sell"} className={"btn px-5 btn-outline border-x-neutral border-y-neutral "}><GiSellCard size={20}></GiSellCard>  Sell</NavLink>
            </li>
            <li>
                <NavLink to={"/payable"} className={"btn btn-outline border-x-neutral border-y-neutral"}><GiPayMoney size={20} className='mt-1'></GiPayMoney> Payable</NavLink>
            </li>
            <li>
                <NavLink to={"/"} className={"btn btn-outline border-x-neutral border-y-neutral"}><GiExpense size={20} ></GiExpense> Expense</NavLink>
            </li>
            <li>
                <NavLink to={"/"} className={"btn btn-outline border-x-neutral border-y-neutral"}><FaRegChartBar size={20} ></FaRegChartBar> Statement</NavLink>
            </li>
        </>
    )

    return (
        <div className='bg-primary text-white p-5 md:h-[95vh] rounded flex flex-col items-center justify-center'>
            <ul className='text-center space-y-5 md:space-y-7'>
                {links}
            </ul>
        </div>
    );
};

export default Sidebar;