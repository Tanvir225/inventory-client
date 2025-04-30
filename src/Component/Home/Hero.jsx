import React from 'react';
import { BiPurchaseTag } from 'react-icons/bi';
import { TbCoinTaka } from 'react-icons/tb';

const Hero = ({dailySummery,monthlySummery}) => {
    return (
        <section className='mt-5 space-y-5'>
            {/* today summery */}
            <section className='flex flex-col lg:flex-row gap-5 justify-center md:justify-between items-center'>
                <div className='border-2 border-primary rounded-md space-y-2 p-5 shadow-md w-full h-24'>
                    <h2 className='text-xl md:text-2xl font-semibold text-primary'>{dailySummery?.purchase} tk</h2>
                    <p className='text-sm flex items-center gap-1 text-primary'><BiPurchaseTag size={20}></BiPurchaseTag> Today Purchse</p>
                </div>
                <div className='border-2 border-red-500 rounded-md p-5 shadow-md w-full  h-24'>
                    <h2 className='text-xl md:text-2xl font-semibold text-red-500'>{dailySummery?.sales} tk</h2>
                    <p className='text-sm flex items-center gap-1 text-red-500'><TbCoinTaka size={20}></TbCoinTaka> Today Sell</p>
                </div>
                <div className='border-2 border-accent rounded-md p-5 shadow-md w-full  h-24'>
                    <h2 className='text-xl md:text-2xl font-semibold text-green-500'>{dailySummery?.profit} tk</h2>
                    <p className='text-sm flex items-center gap-1 text-green-500'><TbCoinTaka size={20}></TbCoinTaka> Today Profit</p>
                </div>
                <div className='border-2 border-amber-400 rounded-md p-5 shadow-md w-full  h-24'>
                    <h2 className='text-xl md:text-2xl font-semibold text-amber-500'>{dailySummery?.expense} tk</h2>
                    <p className='text-sm flex items-center gap-1 text-amber-500'><TbCoinTaka size={20}></TbCoinTaka> Today Expense</p>
                </div>
            </section>


            {/* this month summery */}
            <section className='flex flex-col lg:flex-row gap-5 justify-center md:justify-between items-center'>
                <div className='border-2 border-primary rounded-md space-y-2 p-5 shadow-md w-full h-24'>
                    <h2 className='text-xl md:text-2xl font-semibold text-primary'>{monthlySummery?.purchase} tk</h2>
                    <p className='text-sm flex items-center gap-1 text-primary'><BiPurchaseTag size={20}></BiPurchaseTag> This Month Purchses</p>
                </div>
                <div className='border-2 border-red-500 rounded-md p-5 shadow-md w-full  h-24'>
                    <h2 className='text-xl md:text-2xl font-semibold text-red-500'>{monthlySummery?.sales} tk</h2>
                    <p className='text-sm flex items-center gap-1 text-red-500'><TbCoinTaka size={20}></TbCoinTaka> This Month Sells</p>
                </div>
                <div className='border-2 border-accent rounded-md p-5 shadow-md w-full  h-24'>
                    <h2 className='text-xl md:text-2xl font-semibold text-green-500'>{monthlySummery?.profit} tk</h2>
                    <p className='text-sm flex items-center gap-1 text-green-500'><TbCoinTaka size={20}></TbCoinTaka> This Month Profits</p>
                </div>
                <div className='border-2 border-amber-400 rounded-md p-5 shadow-md w-full  h-24'>
                    <h2 className='text-xl md:text-2xl font-semibold text-amber-500'>{monthlySummery?.expense} tk</h2>
                    <p className='text-sm flex items-center gap-1 text-amber-500'><TbCoinTaka size={20}></TbCoinTaka> This Month Expenses</p>
                </div>
            </section>

        </section>
    );
};

export default Hero;