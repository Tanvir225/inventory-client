import { FaPlus } from "react-icons/fa";
import useUnits from "../../Hook/useUnits";
import useCategories from "../../Hook/useCategories";
import useProducts from "../../Hook/useProducts";
import ProductsGrid from "../../Component/Products/ProductsGrid";
import toast from "react-hot-toast";


const Products = () => {

    // units and categories data fetching
    const { units } = useUnits();
    const { categories } = useCategories();

    //products data fetching adding
    const {
        products,
        loading,
        addProduct,
        updateProduct,
        deleteProduct
    } = useProducts();


    //handleSubmit function for add product
    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const productName = form.productName.value;
        const category = form.category.value;
        const unit = form.unit.value;
        const purchasePrice = form.purchasePrice.value;
        const sellPrice = form.sellPrice.value;
        const stock = form.stock.value;

        console.log(productName, category, unit, purchasePrice, sellPrice, stock);

        const product = {
            name: productName,
            category,
            unit,
            purchasePrice: parseFloat(purchasePrice),
            sellPrice: parseFloat(sellPrice),
            stock: parseInt(stock),
        };
        const result = await addProduct(product);

        if (result.success) {
            toast.success(result.message);
            form.reset();
        } else {
            toast.error(result.message);
        }
    }

    // calculate total purchase price
    const totalPurchase = Array.isArray(products)
        ? products
            .filter(product => product) // remove undefined/null
            .reduce((acc, product) => {
                const purchase = Number(product.purchasePrice || 0);
                const quantity = Number(product.stock || 0);
                return acc + purchase * quantity;
            }, 0)
        : 0;

    // calculate total sell price
    const totalSell = Array.isArray(products)
        ? products
            .filter(product => product) // remove undefined/null
            .reduce((acc, product) => {
                const sell = Number(product.sellPrice || 0);
                const quantity = Number(product.stock || 0);
                return acc + sell * quantity;
            }, 0)
        : 0;

    // calculate total profit
    const totalProfit = totalSell - totalPurchase;



    return (
        <div>
            {/* topbar */}
            <section className="my-2 flex items-center justify-between gap-3 border-b-2  pb-3">
                <div>
                    <h2 className="text-xl font-semibold">{products.length}| Products</h2>
                    <p className="text-sm text-gray-700">Manage your products here</p>
                    <div className="flex flex-col mt-1">
                        <div>
                            <p className="text-sm text-gray-700">Total Purchase Price: <span className="font-semibold text-primary">{totalPurchase.toFixed(2)} TK</span></p>

                        </div>
                        <div className="flex gap-2">
                            <p className="text-sm text-gray-700">Total Sell Price: <span className="font-semibold text-primary">{totalSell.toFixed(2)} TK</span></p>
                            <p className="text-sm text-gray-700">Total Profit : <span className="font-semibold text-primary">{totalProfit.toFixed(2)} TK</span></p>
                        </div>
                    </div>
                </div>
                <div className="text-right">
                    <button className="btn btn-outline btn-primary" onClick={() => document.getElementById('my_modal_4').showModal()}><FaPlus></FaPlus> Add Product</button>
                </div>
            </section>

            {/* product table */}
            <div>

                <ProductsGrid products={products} loading={loading} updateProduct={updateProduct} deleteProduct={deleteProduct}></ProductsGrid>
            </div>

            {/* modal */}
            <dialog id="my_modal_4" className="modal">
                <div className="modal-box ">
                    <h3 className="font-semibold border-dashed border-b-2">Add your Desire Product!</h3>

                    {/* product add form */}
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-3 mt-5">
                            <input type="text" required name="productName" placeholder="Product Name" className="input input-primary focus:outline-none w-full" />
                            <select name="category" className="select select-primary w-full focus:outline-none">
                                <option disabled selected>select category</option>
                                {
                                    categories?.map((category) => (
                                        <option key={category._id} value={category.name}>{category.name}</option>
                                    ))
                                }
                            </select>
                            <select name="unit" required className="select select-primary w-full focus:outline-none" defaultValue="filter by category">
                                <option disabled selected>select unit</option>
                                {
                                    units?.map((unit) => (
                                        <option key={unit._id} value={unit.name}>{unit.name}</option>
                                    ))
                                }
                            </select>
                            <input type="text" required name="purchasePrice" placeholder="Purchase Price" className="input input-primary focus:outline-none w-full" />
                            <input type="text" required name="sellPrice" placeholder="Sell Price" className="input input-primary focus:outline-none w-full" />
                            <input type="text" required name="stock" placeholder="Stock" className="input input-primary focus:outline-none w-full" />
                            <button type="submit" className="btn btn-primary">Add Product</button>
                        </div>

                    </form>


                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>

        </div>
    );
};

export default Products;