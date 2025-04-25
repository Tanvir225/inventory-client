import { useEffect, useState } from "react";
import Loading from "../../Component/Shared/Loading";
import useProducts from "../../Hook/useProducts";
import useAxios from "../../Hook/useAxios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import BillPrint from "../../Component/Sell/BillPrint";

const NewSell = () => {
    const [search, setSearch] = useState("");
    const [id, setId] = useState();
    const [productName, setProductName] = useState("");
    const [sellPrice, setSellPrice] = useState();
    const [discount, setDiscount] = useState(0);
    const [returnAmount, setReturnAmount] = useState();
    const [due, setDue] = useState();
    const [quantity, setQuantity] = useState();
    const [updateSell, setUpdateSell] = useState([]);

    const [customerName, setCustomerName] = useState("");
    const [customerPhone, setCustomerPhone] = useState("");
    const [givenCash, setGivenCash] = useState(0);

    const [printData, setPrintData] = useState(null);

    const axios = useAxios();
    const { loading, products } = useProducts();

    const handleClick = (id, name, price) => {
        setId(id);
        setProductName(name);
        setSellPrice(price);
        setSearch("")
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const addSell = {
            productId: id,
            name: productName,
            quantity: Number(quantity),
            sellPrice: Number(sellPrice),
        };
        setUpdateSell([...updateSell, addSell]);
        setSearch(""); // clear search
    };

    const handleFinalSubmit = async () => {
        const total = updateSell.reduce((acc, item) => acc + item.quantity * item.sellPrice, 0);

        const saleData = {
            date: new Date().toLocaleDateString(),
            customerName,
            customerPhone,
            givenCash: Number(givenCash),
            total,
            dueAmount: due,
            discount: Number(discount),
            returnAmount: returnAmount,
            items: updateSell,
        };

        if (!customerName || !customerPhone) {
            toast.error("Please fill in all customer details.");
            return;
        }
        const res = await axios.post("/sales", saleData);
        console.log(res.data);
        toast.success(res?.data?.message);
        setPrintData(saleData); // Set the data to be printed
        // Reset form
        setUpdateSell([]);
        setCustomerName("");
        setCustomerPhone("");
        setGivenCash(0);
    };

    const totalPrice = updateSell.reduce((acc, sell) => acc + sell.quantity * sell.sellPrice, 0);
    useEffect(() => {

        const numericGivenCash = Number(givenCash) || 0;
        const numericDiscount = Number(discount) || 0;
        const totalPriceWithDiscount = totalPrice - numericDiscount;

        if (totalPrice > numericGivenCash) {
            if (totalPriceWithDiscount) {
                setDue(totalPrice - numericGivenCash - numericDiscount);
                setReturnAmount(0);

            }


        } else {
            setDue(0);
            setReturnAmount(numericGivenCash - totalPrice + numericDiscount);
        }
    }, [givenCash, updateSell, totalPrice, discount]);

    // Filter products based on search input
    const filterProducts = products.filter(product =>
        product.name.toLowerCase().includes(search.toLowerCase())
    );

    // Remove item from the list
    const handleRemoveItem = (indexToRemove) => {
        const updatedList = updateSell.filter((_, index) => index !== indexToRemove);
        setUpdateSell(updatedList);
    };


    if (loading) return <Loading />;

    return (
        <div className="space-y-5 max-w-3xl mx-auto my-2 border-2 p-3 rounded h-[92vh] overflow-y-auto">
            {/* topbar */}
            <div className="flex flex-row-reverse justify-between items-center  p-2 border-b-2 border-gray-200">
                <div>
                    <h1 className="text-xl font-semibold">Sell products</h1>
                </div>
                <Link to={"/sell"} className="btn btn-primary btn-outline">
                    Back
                </Link>
            </div>


            {/* Customer Info */}
            <div className="flex flex-col md:flex-row gap-4">
                <input type="text" required placeholder="Customer Name" className="input focus:outline-none input-bordered w-full"
                    value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
                <input type="text" required placeholder="Customer Phone" className="input focus:outline-none input-bordered w-full"
                    value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} />
            </div>

            {/* Search + Add Product */}
            <form onSubmit={handleSubmit} className="space-y-5">
                <section className="flex w-full flex-col md:flex-row gap-5">
                    <div className="w-full">
                        <input type="text" placeholder="Search products..." className="input  input-bordered w-full focus:outline-none"
                            value={search} onChange={(e) => setSearch(e.target.value)} />

                        {search && (
                            <div className="border w-full p-1  h-24 overflow-y-auto rounded">
                                {filterProducts.map(product => (
                                    <div key={product._id} className="cursor-pointer my-2 hover:bg-blue-100 p-1 rounded"
                                        onClick={() => handleClick(product._id, product.name, product.sellPrice)}>
                                        <p>{product.name}— ৳{product.sellPrice} Stock: {product.stock}{product.unit}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="w-full">
                        <input type="text" required readOnly value={productName} placeholder="product name" className="input input-bordered focus:outline-none w-full" />
                    </div>

                    <div className="w-full">
                        <input type="number" required min="1" placeholder="Quantity" className="input input-bordered focus:outline-none w-full"
                            value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                    </div>
                </section>

                <button type="submit" className="btn btn-primary w-full">Add to Sell</button>
            </form>

            {/* Sale Table */}
            <div>
                <h2 className="text-lg font-semibold mb-2">Selected Products</h2>
                <table className="table text-center">
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Qty</th>
                            <th>Price</th>
                            <th>Subtotal</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {updateSell.map((item, i) => (
                            <tr key={i}>
                                <td>{item.name}</td>
                                <td>{item.quantity}</td>
                                <td>{item.sellPrice} Tk</td>
                                <td>{item.quantity * item.sellPrice} Tk</td>
                                <td>
                                    <button className="btn btn-xs btn-error" onClick={() => handleRemoveItem(i)}>Remove</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th>Total</th>
                            <td colSpan={2}></td>
                            <th>{totalPrice} Tk</th>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>

                    {/* Payment Section */}
                    <h2 className="text-sm font-semibold mb-2">Pay Amount ৳</h2>
                    <input type="number" placeholder="Given Cash" className="input focus:outline-none input-bordered w-full"
                        value={givenCash} onChange={(e) => setGivenCash(e.target.value)} />
                </div>
                <div>

                    {/* Discount Section */}
                    <h2 className="text-sm font-semibold mb-2">Discount ৳</h2>
                    <input type="number" placeholder="Discount  ৳" className="input focus:outline-none input-bordered w-full"
                        value={discount} onChange={(e) => setDiscount(e.target.value)} />
                </div>
                <div>

                    {/* Return Section */}
                    <h2 className="text-sm font-semibold mb-2">Return ৳</h2>
                    <input type="number" placeholder="Return ৳" readOnly className="input focus:outline-none input-bordered w-full"
                        value={returnAmount} />
                </div>
                <div>

                    {/* due Section */}
                    <h2 className="text-sm font-semibold mb-2">Due ৳</h2>
                    <input type="number" placeholder="Due ৳" readOnly className="input focus:outline-none input-bordered w-full"
                        value={due} />
                </div>
            </section>

            {/* Final Confirm */}
            <button className="btn btn-success text-white w-full mt-2" onClick={handleFinalSubmit}>
                Confirm Sale
            </button>

            {/* Show modal when sale confirmed */}
            {printData && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded shadow p-4">
                        <BillPrint saleData={printData} onClose={() => setPrintData(null)} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default NewSell;