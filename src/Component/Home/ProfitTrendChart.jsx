import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import useAxios from '../../Hook/useAxios';
import Loading from '../Shared/Loading';
import { HashLoader } from 'react-spinners';

const ProfitTrendChart = () => {

    //Axios hook
    const axios = useAxios()

    //State for profit trend data
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('/profit-trend')
            .then(res => setData(res.data))
            .catch(console.error)
            .finally(() => setLoading(false));

    }, []);



    return (
        <ResponsiveContainer width="100%" height={250} className={"lg:px-5"}>
            {
                loading ? <p className='flex justify-center items-center h-24'><HashLoader size={50} color="blue"></HashLoader></p> : <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="profit" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
            }
        </ResponsiveContainer>
    );
};

export default ProfitTrendChart;
