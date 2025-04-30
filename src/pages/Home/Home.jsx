import Heading from "../../Component/Home/Heading";
import Hero from "../../Component/Home/Hero";
import Loading from "../../Component/Shared/Loading";
import useSummery from "../../Hook/useSummery";


const Home = () => {

    //summery hook
    const { dailySummary, monthlySummary, loading } = useSummery();

    if (loading) {
        return <Loading></Loading>
    }

    return (
        <div>
            <Heading></Heading>
            {/* hero */}
            <Hero dailySummery={dailySummary} monthlySummery={monthlySummary}></Hero>
        </div>
    );
};

export default Home;