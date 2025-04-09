import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home";
import Sell from "../pages/Sell/Sell";
import Products from "../pages/Products/Products";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        errorElement: <div>Not Found</div>,
        children: [
            {
                path: "/",
                element:<Home></Home>
            },
            {
                path: "/products",
                element:<Products></Products>
            },
            {
                path: "/sell",
                element:<Sell></Sell>
            },
        ]
    }
]);

export default router;