import { useState, useEffect } from "react";
import Loading from "../../Component/Shared/Loading";
import useProducts from "../../Hook/useProducts";
import useAxios from "../../Hook/useAxios";

const Sell = () => {
    const [isCredit, setIsCredit] = useState(false);
    const [productName, setproductName] = useState();
    const [sellPrice, setSellPrice] = useState();
    const [updateSell, setUpdateSell] = useState([]);
    const [quantity, setQuantity] = useState();
    // const [toggle, setToggle] = useState(false);
    const [id, setId] = useState();
    const [search, setSearch] = useState("");
    const axios = useAxios();
    const { loading, products } = useProducts();


    // calculate total price
    let totalPrice = updateSell.reduce((acc, sell) => {
        return acc + (sell.quantity * sell.sellPrice);
    }, 0);

    // filter products
    const filterProducts = products.filter(product => product.name.includes(search));

    useEffect(() => {
        if (updateSell.length > 0) {
            handleAPICall();
        }
    }, [updateSell]); // updateSell স্টেট পরিবর্তন হলে এই useEffect ট্রিগার হবে

    const handleAPICall = async () => {
        const response = await axios.post("/sales", updateSell);
        console.log(response?.data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const addSell = {
            id,
            name: productName,
            quantity,
            sellPrice,
            

        };
        setUpdateSell([...updateSell, addSell]); // স্টেট আপডেট করুন
    };

    if (loading) {
        return <Loading></Loading>;
    }

    //hadleClick function
    const handleClick = (id, name, price) => {
        setId(id)

        setproductName(name)
        setSellPrice(price)

    }

    console.log(updateSell);

    return (

        <div className="space-y-5">
            <h1 className="uppercase text-center mt-5 text-lg md:text-2xl">Sell your product</h1>
            <section className="flex  justify-center gap-5 w-full" >
                {/* form */}
                <section className="border-2 rounded  ring-2 p-3 w-full">
                    <form onSubmit={handleSubmit} className="">

                        {/* onclick toggle */}
                        <input type="text" placeholder="search products" onChange={(e) => setSearch(e.target.value)} className="input focus:outline-none input-primary ring-1 w-full mb-3" />

                        {/*depends on search */}
                        {search &&
                            <div className={`h-24 overflow-y-scroll`}>
                                {filterProducts.map((product) => (
                                    <div onClick={() => handleClick(product._id, product.name, product.sellPrice)} key={product._id} className="cursor-pointer p-2 flex items-center gap-5 rounded hover:bg-blue-100">
                                        <h1 className="font-medium text-lg">{product.name} </h1>
                                        <p className="text-sm text-red-700 font-semibold">stock: {product.stock} </p>
                                        <p className="text-green-700 font-semibold">Price: {product.sellPrice}</p>
                                    </div>
                                ))}
                            </div>
                        }

                        <input
                            type="number"
                            onChange={(e) => setQuantity(e.target.value)}
                            className="input input-md mt-2 focus:outline-none w-full input-primary ring-1"
                            placeholder="quantity"
                        />

                        <button type="submit"></button>
                    </form>

                </section>

                {/* product for sell */}
                <section className="border-2 rounded  ring-2 p-3 w-full">
                    <h1 className="uppercase">Selected Product</h1>

                    <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                        <table className="table text-center">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>Item</th>
                                    <th>Quantity</th>
                                    <th>Unit Price</th>
                                    <th>Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}

                                {updateSell.map((sell) =>
                                    <tr key={sell.id}>
                                        <td>{sell.name}</td>
                                        <td>{sell.quantity}</td>
                                        <td>{sell.sellPrice} Tk</td>
                                        <td>{sell.quantity * sell.sellPrice} Tk</td>
                                    </tr>
                                )}

                            </tbody>

                            {/* foot */}
                            <tfoot >
                                <tr>
                                    <th>Total</th>
                                    <th></th>
                                    <th></th>
                                    <th> {totalPrice} Tk</th>
                                </tr>
                            </tfoot>
                        </table>
                    </div>

                </section>
            </section>
        </div>
    );
};

export default Sell;