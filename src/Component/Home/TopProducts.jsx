import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
ChartJS.register(ArcElement, Tooltip);

const TopProducts = ({ data }) => {

    const chartData = {
        labels: data.map(item => item.name),
        datasets: [
            {
                label: 'Total Sold',
                data: data.map(item => item.totalSold),
                backgroundColor: [
                    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className='w-full h-[220px] bg-white shadow-md rounded-lg p-2'>
            <Pie data={chartData} />
        </div>
    );
};

export default TopProducts;