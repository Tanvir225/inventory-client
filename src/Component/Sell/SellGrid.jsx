import { useRef, useState } from "react";
import useSell from "../../Hook/useSell";
import useAxios from "../../Hook/useAxios";
import toast from "react-hot-toast";
import { AgGridReact } from "ag-grid-react";


const SellGrid = ({ sell,refetch }) => {

    const gridRef = useRef();

    //details state
    const [details, setDetails] = useState();

    //useState for givenChash
    const [cash, setCash] = useState(0);
    const [id, setId] = useState(0);

    //usePurchase hook
    const { updateSell } = useSell();

    //axios hook
    const axios = useAxios();

    // Column definitions for the grid
    const [colDefs, setColDefs] = useState([
        { field: "date", sortable: true, filter: true, floatingFilter: true, headerName: "Date" },
        { field: "customerName", sortable: true, filter: true, floatingFilter: true, headerName: "Name" },
        { field: "customerPhone", sortable: true, filter: true, floatingFilter: true, headerName: "Phone" },
        {
            field: "total", sortable: true, filter: true, floatingFilter: true, headerName: "Total Amount", valueFormatter: (params) => {
                return `${params.value} tk`;
            }
        },
        {
            field: "givenCash", sortable: true, filter: true, floatingFilter: true, headerName: "Deposit", valueFormatter: (params) => {
                return `${params.value} tk`;
            }
        },
        {
            field: "discount", sortable: true, filter: true, floatingFilter: true, headerName: "Discount", valueFormatter: (params) => {
                return `${params.value} tk`;
            }
        },
        {
            field: "returnAmount", sortable: true, filter: true, floatingFilter: true, headerName: "Retutn Amount", valueFormatter: (params) => {
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
                            onClick={() => handleDetails(params.data._id)}
                        >
                            Details
                        </button>
                        <button
                            className="btn btn-sm btn-outline btn-error"
                            onClick={() => handleUpdate(params.data._id)}
                        >
                            Update
                        </button>
                    </div>
                );
            }
        }
    ])

    // pagination settings
    // pagination settings
    const pagination = true;
    const paginationPageSize = 10;
    const paginationPageSizeSelector = [10, 20, 50];

    //handleUpdate function
    const handleUpdate = (id) => {
        setId(id);
        const sellToUpdate = sell.find(p => p._id === id);
        if (sellToUpdate) {
            setCash(""); // reset input for fresh deposit
        }
        document.getElementById('my_modal_1').showModal();
    };

    //handleSubmit function
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await updateSell(id, { cash });

        if (response.success) {
            toast.success(response.message);
            document.getElementById('my_modal_1').close();

            // Manually refresh ag-Grid row
            const rowNode = gridRef.current.api.getRowNode(id);
            if (rowNode) {
                rowNode.setData({ ...rowNode.data, ...response.data });
            }

          refetch(); // Refetch to get the latest data
           
        } else {
            toast.error(response.message);
        }
    };


    //handleDetails function
    const handleDetails = async (id) => {
        // console.log(id);
        //axios get request to get purchase details
        const response = await axios.get(`/sales/${id}`);
        if (response?.data) {
            console.log(response?.data);
            setDetails(response?.data);
            //open modal
            document.getElementById('details_modal').showModal();
        }


    }


    return (
        <div className='ag-theme-quartz w-full h-96 '>

            <AgGridReact
                ref={gridRef}
                pagination={pagination}
                paginationPageSize={paginationPageSize}
                paginationPageSizeSelector={paginationPageSizeSelector}
                key={JSON.stringify(sell)} // 👈 will re-render on data change// 👈 triggers re-render when length changes
                getRowId={(params) => params.data._id} // 👈 use _id as row ID
                animateRows={true}
                rowData={sell}
                columnDefs={colDefs}

            />

            {/* modal for deposit amount form */}
            <dialog id="my_modal_1" className="modal">
                <div className="modal-box space-y-5">
                    <h3 className="font-bold text-lg">Deposit!</h3>
                    <form onSubmit={handleSubmit} >
                        <input onChange={(e) => setCash(e.target.value)} type="number" placeholder='deposit amount' className='input input-bordered focus:outline-none input-primary w-full p-5' />
                    </form>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>


            {/* modal for sell details */}
            <dialog id="details_modal" className="modal">
                <div className="modal-box space-y-3 text-left">
                    <h3 className="font-bold text-lg">Sell Details</h3>

                    {details ? (
                        <div className="space-y-1">
                            <p><strong>Date:</strong> {details.date}</p>
                            <p><strong>Customer:</strong> {details.customerName} ({details.customerPhone})</p>
                            <p><strong>Total Amount:</strong> {details.total} tk</p>
                            <p><strong>Deposit:</strong> {details.givenCash} tk</p>
                            <p><strong>Due:</strong> {details.dueAmount} tk</p>
                            <p><strong>Return:</strong> {details.returnAmount} tk</p>
                            <p><strong>Discount:</strong> {details.discount} tk</p>

                            {/* If you store items array inside the purchase */}
                            {details?.items && (
                                <div>
                                    <h4 className="font-bold mt-2">Products:</h4>
                                    <ul className="list-disc ml-5">
                                        {details.items.map((item, i) => (
                                            <li key={i}>
                                                {item.name} - {item.quantity} x {item.unitPrice} tk
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    ) : <p>Loading...</p>}

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

export default SellGrid;