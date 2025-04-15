import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component

import Loading from '../Shared/Loading';

import { useState } from 'react';
import usePurchase from '../../Hook/usePurchase';
import toast from 'react-hot-toast';

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

const PurchaseGrid = ({ purchase }) => {

    //useState for givenChash
    const [givenCash, setGivenCash] = useState(0);
    const [id, setId] = useState(0);

    //usePurchase hook
    const { updatePurchase } = usePurchase();

    // Column definitions for the grid
    const [colDefs, setColDefs] = useState([
        { field: "createdAt", sortable: true, filter: true, floatingFilter: true, headerName: "Date" },
        { field: "supplierName", sortable: true, filter: true, floatingFilter: true, headerName: "Name" },
        { field: "supplierPhone", sortable: true, filter: true, floatingFilter: true, headerName: "Phone" },
        {
            field: "totalAmount", sortable: true, filter: true, floatingFilter: true, headerName: "Total Amount", valueFormatter: (params) => {
                return `${params.value} tk`;
            }
        },
        {
            field: "givenCash", sortable: true, filter: true, floatingFilter: true, headerName: "Deposit", valueFormatter: (params) => {
                return `${params.value} tk`;
            }
        },
        {
            field: "dueAmount", sortable: true, filter: true, floatingFilter: true, headerName: "Due", valueFormatter: (params) => {
                return `${params.value} tk`;
            }
        },
        {
            field: "options",
            headerName: "Actions",
            cellRenderer: (params) => {
                return (
                    <div className="flex items-center gap-2 my-1">
                        <button
                            className="btn btn-sm btn-outline btn-primary"

                        >
                            Details
                        </button>
                        <button
                            className="btn btn-sm btn-outline btn-error"
                            onClick={() => handleUpdate(params.data._id, document.getElementById('my_modal_1').showModal())}
                        >
                            Update
                        </button>
                    </div>
                );
            }
        }
    ])

    // pagination settings
    const pagination = true;
    const paginationPageSize = 10;
    const paginationPageSizeSelector = [10, 20, 50];

    //handleUpdate function
    const handleUpdate = async (id) => {
        setId(id);

    };

    //handleSubmit function
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(id, givenCash);
        const response = await updatePurchase(id, { givenCash });
        if (response.success) {
            toast.success(`${response.message}`);
            document.getElementById('my_modal_1').close();
        } else {
           toast.error(`${response.message}`);
        }
    };


    return (
        <div className='ag-theme-quartz w-full h-96'>

            <AgGridReact

                pagination={pagination}
                paginationPageSize={paginationPageSize}
                paginationPageSizeSelector={paginationPageSizeSelector}
                key={purchase.length} // 👈 triggers re-render when length changes
                getRowId={(params) => params.data._id} // 👈 use _id as row ID
                animateRows={true}
                rowData={purchase}
                columnDefs={colDefs}

            />

            {/* modal */}
            <dialog id="my_modal_1" className="modal">
                <div className="modal-box space-y-5">
                    <h3 className="font-bold text-lg">Deposit!</h3>
                    <form  onSubmit={handleSubmit} >
                        <input onChange={(e) => setGivenCash(e.target.value)} type="number" placeholder='deposit amount' className='input input-bordered focus:outline-none input-primary w-full p-5' />
                    </form>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>

        </div>
    );
};

export default PurchaseGrid;