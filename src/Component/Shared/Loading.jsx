import { HashLoader } from "react-spinners";


const Loading = () => {
    return (
        <div className="font-bold text-lg text-center flex justify-center items-center h-[95vh]">
            <HashLoader size={50} color="blue"></HashLoader>
        </div>
    );
};

export default Loading;