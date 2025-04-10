import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import { useEffect, useState } from 'react';
import Loading from '../Shared/Loading';
import swal from 'sweetalert';
import useUnits from '../../Hook/useUnits';
import useCategories from '../../Hook/useCategories';
import toast from 'react-hot-toast';

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

const ProductsGrid = ({ products, loading, updateProduct, deleteProduct }) => {

    const { units } = useUnits();
    const { categories } = useCategories();

    // State to handle the product being edited
    const [selectedProduct, setSelectedProduct] = useState();

    // Column Definitions: Defines the columns to be displayed.
    const [colDefs, setColDefs] = useState([
        { field: "name", sortable: true, filter: true, floatingFilter: true },
        { field: "category", sortable: true, filter: true, floatingFilter: true },
        {
            field: "purchasePrice", sortable: true, filter: true, floatingFilter: true,
            valueFormatter: (params) => {
                return `${params.value} tk`;
            }

        },
        {
            field: "sellPrice", sortable: true, filter: true, floatingFilter: true,
            valueFormatter: (params) => {
                return `${params.value} tk`;
            }
        },
        {
            field: "stock",
            sortable: true,
            filter: true,
            floatingFilter: true,
            valueGetter: (params) => {
                const data = params.data || {};
                return `${data.stock ?? "-"} ${data.unit ?? ""}`; // Combine stock and unit safely
            }
        },

        { field: "createdAt" },
        {
            field: "options",
            headerName: "Actions",
            cellRenderer: (params) => {
                return (
                    <div className="flex items-center gap-2 my-1">
                        <button
                            className="btn btn-sm btn-outline btn-primary"
                            onClick={() => openEditModal(params.data)}
                        >
                            Edit
                        </button>
                        <button
                            className="btn btn-sm btn-outline btn-error"
                            onClick={() => handleDelete(params.data._id)}
                        >
                            Delete
                        </button>
                    </div>
                );
            }
        }

    ]);

    // pagination settings
    const pagination = true;
    const paginationPageSize = 20;
    const paginationPageSizeSelector = [20, 50, 100];




    // Handle delete action
    const handleDelete = (id) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover product!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    // Proceed with the delete action
                    deleteProduct(id);
                    swal("Your product has been deleted!", {
                        icon: "success",
                    });
                }
            });
    };


    // Open the modal and pre-fill it with the selected product's data
    const openEditModal = (product) => {

        setSelectedProduct(product);
        document.getElementById('my_modal_5').showModal(); // Show modal
    };

    // Handle the product update
    const handleUpdateProduct = async (e) => {
        e.preventDefault();

        // Get the updated product values from the form
        const updatedProduct = {
            name: e.target.productName.value,
            category: e.target.category.value,
            unit: e.target.unit.value,
            purchasePrice: parseFloat(e.target.purchasePrice.value),
            sellPrice: parseFloat(e.target.sellPrice.value),
            stock: parseInt(e.target.stock.value),
        };

        // Call the updateProduct function
        updateProduct(selectedProduct._id, updatedProduct);
        toast.success("Product updated successfully!");

        // Close the modal after updating
        document.getElementById('my_modal_5').close();
    };


    // loading state
    if (loading) {
        return <Loading></Loading>;
    }



    return (
        <div className="ag-theme-quartz w-full ">
            <AgGridReact

                pagination={pagination}
                paginationPageSize={paginationPageSize}
                paginationPageSizeSelector={paginationPageSizeSelector}
                key={products.length} // 👈 triggers re-render when length changes
                getRowId={(params) => params.data._id} // 👈 use _id as row ID
                animateRows={true}
                rowData={products}
                columnDefs={colDefs}
                domLayout="autoHeight"
            />

            {/* Modal for editing a product */}
            <dialog id="my_modal_5" className="modal">
                <div className="modal-box">
                    <h3 className="font-semibold border-dashed border-b-2">Update your Desired Product!</h3>

                    {/* Product edit form */}
                    {selectedProduct && (
                        <form onSubmit={handleUpdateProduct}>
                            <div className="flex flex-col gap-3 mt-5">
                                <input
                                    type="text"
                                    name="productName"
                                    value={selectedProduct.name || ""}
                                    onChange={(e) => setSelectedProduct({ ...selectedProduct, name: e.target.value })} // Handle change for name
                                    placeholder="Product Name"
                                    className="input input-primary focus:outline-none w-full"
                                />
                                <select
                                    name="category"
                                    className="select select-primary w-full focus:outline-none"
                                    value={selectedProduct.category?.name || ""}  // Use _id as value for category
                                    onChange={(e) => setSelectedProduct({
                                        ...selectedProduct,
                                        category: categories.find(c => c.name === e.target.value)
                                    })} // Handle change for category
                                >
                                    <option disabled>select category</option>
                                    {categories?.map((category) => (
                                        <option key={category._id} value={category.name}> {/* Use _id for value */}
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                                <select
                                    name="unit"
                                    className="select select-primary w-full focus:outline-none"
                                    value={selectedProduct.unit?.name || ""}  // Use _id as value for unit
                                    onChange={(e) => setSelectedProduct({
                                        ...selectedProduct,
                                        unit: units.find(u => u.name === e.target.value)
                                    })}
                                >
                                    <option disabled>select unit</option>
                                    {units?.map((unit) => (
                                        <option key={unit._id} value={unit.name}> {/* Use _id for value */}
                                            {unit.name}
                                        </option>
                                    ))}
                                </select>
                                <input
                                    type="text"
                                    name="purchasePrice"
                                    value={selectedProduct.purchasePrice || ""}
                                    onChange={(e) => setSelectedProduct({ ...selectedProduct, purchasePrice: e.target.value })}
                                    placeholder="Purchase Price"
                                    className="input input-primary focus:outline-none w-full"
                                />
                                <input
                                    type="text"
                                    name="sellPrice"
                                    value={selectedProduct.sellPrice || ""}
                                    onChange={(e) => setSelectedProduct({ ...selectedProduct, sellPrice: e.target.value })}
                                    placeholder="Sell Price"
                                    className="input input-primary focus:outline-none w-full"
                                />
                                <input
                                    type="text"
                                    name="stock"
                                    value={selectedProduct.stock || ""}
                                    onChange={(e) => setSelectedProduct({ ...selectedProduct, stock: e.target.value })}
                                    placeholder="Stock"
                                    className="input input-primary focus:outline-none w-full"
                                />
                                <button type="submit" className="btn btn-primary">
                                    Update Product
                                </button>
                            </div>
                        </form>
                    )}

                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>



        </div>
    );
};

export default ProductsGrid;