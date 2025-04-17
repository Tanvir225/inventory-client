import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home";
import Sell from "../pages/Sell/Sell";
import Products from "../pages/Products/Products";
import Purchase from "../pages/Purchase/Purchase";
import NewPurchase from "../pages/Purchase/NewPurchase";
import NewSell from "../pages/Sell/NewSell";

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
                path: "/purchase",
                element:<Purchase></Purchase>
            },
            {
                path: "/purchase/add",
                element:<NewPurchase></NewPurchase>
            },
            {
                path: "/sell",
                element:<Sell></Sell>
            },
            {
                path: "/sell/new",
                element:<NewSell></NewSell>
            },
        ]
    }
]);

export default router;