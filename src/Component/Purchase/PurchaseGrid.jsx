import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component

import Loading from '../Shared/Loading';

import { useState } from 'react';

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

const PurchaseGrid = ({ purchase }) => {


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
    ])

    // pagination settings
    const pagination = true;
    const paginationPageSize = 10;
    const paginationPageSizeSelector = [10, 20, 50];




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

        </div>
    );
};

export default PurchaseGrid;