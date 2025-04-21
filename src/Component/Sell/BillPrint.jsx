// components/BillPrint.jsx
import React from "react";

const BillPrint = ({ saleData, onClose }) => {
    const {
        customerName,
        customerPhone,
        givenCash,
        discount,
        returnAmount,
        dueAmount,
        items,
        total,
        date,
    } = saleData;

 

    return (
        <div className="print-container font-mono text-xs w-[280px] text-black px-2">
            <div className="text-center">
                <h1 className="text-base font-bold">📦 Grocery Mart</h1>
                <p>123 Main Road, Dhaka</p>
                <p>017XXXXXXXX</p>
            </div>

            <div className="border-t border-dashed mt-2 mb-1" />

            <p>Date: {date}</p>
            {customerName && <p>Customer: {customerName}</p>}
            {customerPhone && <p>Phone: {customerPhone}</p>}

            <div className="border-t border-dashed mt-2 mb-1" />

            <div>
                {items.map((item, index) => (
                    <div key={index} className="flex justify-between">
                        <span>{item.name} x {item.quantity}</span>
                        <span>৳{item.quantity * item.sellPrice}</span>
                    </div>
                ))}
            </div>

            <div className="border-t border-dashed mt-2 mb-1" />

            <div className="flex justify-between">
                <span>Total</span>
                <span className="font-semibold">৳{total}</span>
            </div>
            <div className="flex justify-between">
                <span>Discount</span>
                <span>-৳{discount}</span>
            </div>
            <div className="flex justify-between">
                <span>Cash</span>
                <span>৳{givenCash}</span>
            </div>
            <div className="flex justify-between">
                <span>Return</span>
                <span>৳{returnAmount}</span>
            </div>
            <div className="flex justify-between">
                <span>Due</span>
                <span className="text-red-600">৳{dueAmount}</span>
            </div>

            <div className="border-t border-dashed mt-2 mb-1" />

            <p className="text-center mt-2">✨ Thank You for Shopping ✨</p>
            <p className="text-center">Visit Again!</p>

            <div className="mt-4 print:hidden flex gap-2 w-full">
                <button
                    className="btn btn-sm btn-primary w-1/2"
                    onClick={() => window.print()}
                >
                    Print
                </button>
                <button
                    className="btn btn-sm btn-secondary w-1/2"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default BillPrint;
