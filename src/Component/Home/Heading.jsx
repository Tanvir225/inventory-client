import moment from "moment-js";
import useProducts from "../../Hook/useProducts";


const Heading = () => {
    //useProduct hook
    const { products } = useProducts();
    return (
        <div className="space-y-5">
            <div className="navbar bg-base-200 shadow-md rounded-md px-5 sticky top-0 z-50">
                <div className="flex-1">
                    <a className="btn btn-ghost text-xl">Ananda Store</a>
                </div>
                <div className="">

                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="Tailwind CSS Navbar component"
                                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            <li>
                                <a className="justify-between">
                                    Profile
                                    <span className="badge">New</span>
                                </a>
                            </li>
                            <li><a>Logout</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="flex px-2  items-center text-primary justify-between ">
                <h1 className="">Date: {moment().format("DD-MM-YYYY")}</h1>
                <p className="text-xl">Total Product : {products.length || 0}</p>
            </div>
        </div>
    );
};

export default Heading;