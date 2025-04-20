import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {

    const links = (
        <>
            <li>
                <NavLink to={"/"}>Home</NavLink>
            </li>
            <li>
                <NavLink to={"/products"}>Products</NavLink>
            </li>
            <li>
                <NavLink to={"/purchase"}>Purchase</NavLink>
            </li>
            <li>
                <NavLink to={"/sell"}>Sell</NavLink>
            </li>
            <li>
                <NavLink to={"/payable"}>Payable</NavLink>
            </li>
            <li>
                <NavLink to={"/"}>Expense</NavLink>
            </li>
            <li>
                <NavLink to={"/"}>Statement</NavLink>
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