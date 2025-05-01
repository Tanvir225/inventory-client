import { useEffect, useState } from "react";
import Heading from "../../Component/Home/Heading";
import Hero from "../../Component/Home/Hero";
import Loading from "../../Component/Shared/Loading";
import useSummery from "../../Hook/useSummery";
import useAxios from "../../Hook/useAxios";
import TopProducts from "../../Component/Home/TopProducts";
import ProfitTrendChart from "../../Component/Home/ProfitTrendChart";


const Home = () => {

    //summery hook
    const { dailySummary, monthlySummary, loading } = useSummery();
    const axios = useAxios()

    //state for top products
    const [topProducts, setTopProducts] = useState([]);

    useEffect(() => {
        axios.get('/top-products')
            .then(res => setTopProducts(res.data))
            .catch(err => console.error(err));
    }, [axios]);


    // Check if loading or error
    if (loading) {
        return <Loading></Loading>
    }

    return (
        <div>
            <Heading></Heading>
            {/* hero */}
            <Hero dailySummery={dailySummary} monthlySummery={monthlySummary}></Hero>


            <section className="mt-3 flex flex-col lg:flex-row gap-5 w-full">
                {/* top products */}
                <div className="w-full">
                    <h1 className="text-xl font-semibold text-gray-700">Top 5 Selling Products</h1>
                    <TopProducts data={topProducts}></TopProducts>
                </div>

                {/* Profit Trends */}
                <div className="w-full">
                    <h1 className="text-xl font-semibold text-gray-700">This Month Profit trend</h1>
                    <ProfitTrendChart></ProfitTrendChart>
                </div>
            </section>
        </div>
    );
};

export default Home;