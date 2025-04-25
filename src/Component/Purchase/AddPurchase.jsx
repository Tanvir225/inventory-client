import { useState } from "react";
import useAxios from "../../Hook/useAxios";
import useProducts from "../../Hook/useProducts";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";

const AddPurchase = () => {

    const axios = useAxios();
    const { products } = useProducts();

    const [entries, setEntries] = useState([]);
    const [date, setDate] = useState("");
    const [filterProducts, setFilterProducts] = useState(products);
    const [supplierName, setSupplierName] = useState("");
    const [supplierPhone, setSupplierPhone] = useState("");
    const [givenCash, setGivenCash] = useState();

    // Add new entry with empty values and its own search field
    const handleAddEntry = () => {
        setEntries([...entries, {
            productId: "",
            name: "",
            search: "",
            quantity: "",
            unitPrice: ""
        }]);
    };

    // Handle per-entry search
    const handleSearch = (idx, value) => {
        const updated = [...entries];
        updated[idx].search = value;
        updated[idx].name = ""; // Optional: clear previous selection
        updated[idx].productId = "";
        setEntries(updated);

        const filtered = products.filter(p =>
            p.name.toLowerCase().includes(value.toLowerCase()));
        setFilterProducts(filtered);
    };

    // Handle click on product in suggestion list
    const handleClick = (idx, product) => {
        const updatedEntries = [...entries];
        updatedEntries[idx].productId = product._id;
        updatedEntries[idx].name = product.name;
        updatedEntries[idx].unitPrice = product.purchasePrice;
        updatedEntries[idx].search = "";
        setEntries(updatedEntries);
    };

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
        } catch (err) {
            toast.error("ক্রয়ে সমস্যা হয়েছে", err.message);
        }
    };

    return (
        <div className="my-10 max-w-3xl border-2 p-3 rounded-md mx-auto h-[80vh] overflow-y-auto">
            <form onSubmit={handleSubmit} className="space-y-5">
                <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="input input-bordered input-primary w-full focus:outline-none"
                />
                <div className="flex gap-3 items-center">
                    <input
                        type="text"
                        required
                        placeholder="name | Company"
                        value={supplierName}
                        onChange={(e) => setSupplierName(e.target.value)}
                        className="input input-bordered input-primary w-full focus:outline-none"
                    />
                    <input
                        type="text"
                        required
                        placeholder="phone number"
                        value={supplierPhone}
                        onChange={(e) => setSupplierPhone(e.target.value)}
                        className="input input-bordered w-full focus:outline-none"
                    />
                </div>

                {entries.map((entry, idx) => (
                    <div key={idx} className="border p-3 rounded flex flex-col lg:flex-row justify-between w-full gap-3 items-center relative">

                        <div className="w-full">
                            <input
                                type="text"
                                required
                                placeholder="পণ্য সার্চ করুন"
                                value={entry.search || entry.name || ""}
                                onChange={(e) => handleSearch(idx, e.target.value)}
                                className="input input-bordered input-primary w-full lg:w-96 focus:outline-none"
                            />

                            {entry.search &&
                                <div className="absolute z-20 w-64 md:w-96 lg:w-96 bg-white shadow border rounded h-28 overflow-y-scroll">
                                    {filterProducts.map(product => (
                                        <div
                                            key={product._id}
                                            className="p-3 hover:bg-blue-100 cursor-pointer flex justify-between"
                                            onClick={() => handleClick(idx, product)}
                                        >
                                            <span>{product.name}</span>
                                            <span className="text-sm text-gray-500">P:{product.purchasePrice}৳</span>
                                            <span className="text-sm text-gray-500">{product.stock} {product.unit}</span>
                                            <span className="text-sm text-gray-500">S:{product.sellPrice}৳</span>
                                        </div>
                                    ))}
                                </div>
                            }
                        </div>

                        <input
                            type="number"
                            required
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
                            required
                            placeholder="দাম"
                            value={entry.unitPrice}
                            onChange={(e) => {
                                const updated = [...entries];
                                updated[idx].unitPrice = parseFloat(e.target.value);
                                setEntries(updated);
                            }}
                            className="input rounded-md w-full focus:outline-none input-accent"
                        />

                        <button
                            type="button"
                            onClick={() => {
                                const updated = entries.filter((_, i) => i !== idx);
                                setEntries(updated);
                            }}
                        >
                            <FaDeleteLeft size={30} className="text-red-600" />
                        </button>
                    </div>
                ))}

                <button
                    type="button"
                    onClick={handleAddEntry}
                    className="bg-gray-500 text-white px-4 py-1 rounded"
                >
                    <FaPlus className="inline mr-1" /> Add Product
                </button>
                <br />

                <input
                    type="number"
                    placeholder="cash"
                    value={givenCash}
                    onChange={(e) => setGivenCash(e.target.value)}
                    className="input input-bordered input-accent w-full focus:outline-none"
                />
                <br />

                <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded">
                    Save Purchase
                </button>
            </form>
        </div>
    );
};

export default AddPurchase;
