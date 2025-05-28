import moment from "moment-js";
import useProducts from "../../Hook/useProducts";
import { Link, useOutletContext } from "react-router-dom";
import useAuth from "../../Hook/useAuth";
import toast from "react-hot-toast";

const Heading = () => {
    const { products } = useProducts();
    const { toggleTheme, currentTheme } = useOutletContext(); // 👈 this is crucial
    const { user, logOut } = useAuth();

    //handleLogOut
    const handleLogOut = () => {
        logOut().then((res) => {
            console.log(res);
            toast.success("logout Successfull");
        });
    };

    return (
        <div className="space-y-5">
            <div className="navbar bg-base-200 shadow-md rounded-md px-5 sticky top-0 z-50">
                <div className="flex-1">
                    <a className="btn btn-ghost text-xl">Ananda Store</a>
                </div>

                <div className="flex items-center gap-3">
                    <button onClick={toggleTheme} className="btn btn-sm btn-outline">
                        {currentTheme === "light" ? "🌙 Dark" : "☀️ Light"}
                    </button>

                    {
                        user ? (
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        <img
                                            src={user?.photoURL}
                                            alt={`${user?.displayName} image`}
                                        />
                                    </div>
                                </div>
                                <ul
                                    tabIndex={0}
                                    className="menu space-y-1 menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                                >
                                    <li>
                                        <a className="justify-between">
                                            Profile
                                            <span className="badge">New</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a className="justify-between text-base">
                                            {user?.displayName || "User Name"}
                                        </a>
                                    </li>
                                    <Link
                                        to={"/"}
                                        onClick={handleLogOut}
                                        className="btn btn-sm btn-primary md:w-1/2 ml-2"
                                    >
                                        Logout
                                    </Link>
                                </ul>
                            </div>
                        ) : (
                            <Link to={"/login"} className="btn btn-sm btn-primary">
                                Login
                            </Link>
                        )
                    }
                </div>
            </div>

            <div className="flex px-2 items-center text-primary justify-between">
                <h1>Date: {moment().format("DD-MM-YYYY")}</h1>
                <p className="text-xl">Total Product : {products.length || 0}</p>
            </div>
        </div>
    );
};

export default Heading;
