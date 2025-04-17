import { useState } from "react";
import useAxios from "../../Hook/useAxios";
import useProducts from "../../Hook/useProducts";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";


const AddPurchase = () => {

    //axios hook
    const axios = useAxios();
    //Product hook
    const { products } = useProducts();

    //State for entries and date
    const [entries, setEntries] = useState([]);
    const [date, setDate] = useState("");
    const [search, setSearch] = useState("");
    const [filterProducts, setFilterProducts] = useState(products);
    const [supplierName, setSupplierName] = useState("");
    const [supplierPhone, setSupplierPhone] = useState("");
    const [givenCash, setGivenCash] = useState();


    //Filter products based on search input
    const handleSearch = (value) => {
        setSearch(value);
        const filtered = products.filter(p =>
            p.name.toLowerCase().includes(value.toLowerCase()));
        setFilterProducts(filtered);
    };

    const handleClick = (idx, product) => {
        const updatedEntries = [...entries];
        updatedEntries[idx].productId = product._id;
        updatedEntries[idx].name = product.name;
        updatedEntries[idx].unitPrice = product.purchasePrice;
        setEntries(updatedEntries);
        setSearch(""); // hide list
    };

    //Function to handle adding new entry
    const handleAddEntry = () => {
        setEntries([...entries, { productId: "", quantity: "", unitPrice: "" }]);
    };

    //Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("purchase", {
                date,
                supplierName,
                supplierPhone,
                givenCash,
                items: entries.map(({ productId, name, quantity, unitPrice }) => ({
                    productId,
                    name,
                    quantity,
                    unitPrice
                }))
            });
            toast.success("✅ ক্রয় সফল!");
            setEntries([]);
            setDate("");
            setSupplierName("");
            setSupplierPhone("");
            setGivenCash("");
            setSearch("");

        } catch (err) {
            toast.error("ক্রয়ে সমস্যা হয়েছে", err.message);
        }
    };


    return (
        <div className="my-10 max-w-3xl border-2 p-3 rounded-md mx-auto">
            <form onSubmit={handleSubmit} className=" space-y-5">
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="input input-borderd focus:outline-none input-primary w-full" />
                <div className="flex gap-3 items-center">
                    <input type="text" placeholder="name | Company" value={supplierName}
                        onChange={(e) => setSupplierName(e.target.value)} className="input input-bordered focus:outline-none w-full input-primary" />
                    <input type="text" placeholder="phone number" value={supplierPhone}
                        onChange={(e) => setSupplierPhone(e.target.value)} className="input input-bordered focus:outline-none w-full" />
                </div>

                {entries.map((entry, idx) => (

                    <div key={idx} className="border p-3 rounded flex flex-col lg:flex-row justify-between w-full gap-3 items-center">

                        <div className="w-full ">
                            <input
                                type="text"
                                placeholder="পণ্য সার্চ করুন"
                                value={entry.name || search}
                                onChange={(e) => handleSearch(e.target.value)}
                                className="input input-bordered input-primary focus:outline-none w-full lg:w-96"
                            />
                            {search &&
                                <div className="absolute z-20 w-64 md:w-96 lg:w-96 bg-white shadow border rounded h-28 overflow-y-scroll ">
                                    {filterProducts.map(product => (
                                        <div
                                            key={product._id}
                                            className=" p-3 hover:bg-blue-100 cursor-pointer items-center flex justify-between"
                                            onClick={() => handleClick(idx, product)}
                                        >
                                            <span>{product.name}</span>
                                            <span className="text-sm text-gray-500">P:{product.purchasePrice}৳</span>
                                            <span className="text-sm text-gray-500">{product.stock} {product.unit}</span>
                                            <span className="text-sm text-gray-500">S :{product.sellPrice}৳</span>
                                        </div>
                                    ))}
                                </div>
                            }
                        </div>

                        <input
                            type="number"
                            placeholder="পরিমাণ"
                            value={entry.quantity}
                            onChange={(e) => {
                                const updated = [...entries];
                                updated[idx].quantity = parseFloat(e.target.value);
                                setEntries(updated);
                            }}
                            className="input input-info rounded-md w-full focus:outline-none"
                        />

                        <input
                            type="number"
                            placeholder="দাম"
                            value={entry.unitPrice}
                            onChange={(e) => {
                                const updated = [...entries];
                                updated[idx].unitPrice = parseFloat(e.target.value);
                                setEntries(updated);
                            }}
                            className="input rounded-md w-full focus:outline-none input-accent"
                        />

                        {/* ❌ Close Button */}
                        <button
                            type="button"
                            onClick={() => {
                                const updated = entries.filter((_, i) => i !== idx);
                                setEntries(updated);
                            }}
                            className=""
                        >
                            <FaDeleteLeft size={30} className="text-red-600"></FaDeleteLeft>
                        </button>
                    </div>
                ))}

                <button type="button" onClick={handleAddEntry} className="bg-gray-500 text-white px-4 py-1 rounded">+ Add Product</button>
                <br />

                <input type="number" placeholder="cash" value={givenCash}
                    onChange={(e) => setGivenCash(e.target.value)} className="input input-bordered focus:outline-none w-full px-5 input-accent" />
                <br />

                <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded">Save Purchase</button>
            </form>
        </div>
    );
};

export default AddPurchase;