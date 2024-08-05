    import React, { useState } from 'react';
    import { AgGridReact } from 'ag-grid-react';
    import 'ag-grid-community/styles/ag-grid.css';
    import 'ag-grid-community/styles/ag-theme-alpine.css';
    import './Listing.css';

    const Listing = ({ users, onEdit, onDelete }) => {
        const [search, setSearch] = useState('');
        const [currentPage, setCurrentPage] = useState(1);
        const itemsPerPage = 5;
    
        const filteredUsers = users.filter(user =>
            user.name.toLowerCase().includes(search.toLowerCase())
        );
        const MyCellComponent = (props) => {
            const { data } = props;
    
            const handleEdit = () => {
                console.log("Edit button clicked for user: ", data);
                if (onEdit) onEdit(data);
                
            };
    
            const handleDelete = () => {
                console.log("Delete button clicked for user ID: ", data.id);
                if (onDelete) onDelete(data.id);
            };
    
            return (
                <>
                    <button onClick={handleEdit}>Edit</button>
                    <button onClick={handleDelete}>Delete</button>
                </>
            );
        };
    
        const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
        const indexOfLastUser = currentPage * itemsPerPage;
        const indexOfFirstUser = indexOfLastUser - itemsPerPage;
        const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

        const columns = [
            { headerName: 'Name', field: 'name', sortable: true, filter: true,editable:true },
            { headerName: 'Email', field: 'email', sortable: true, filter: true,editable:true},
            { headerName: 'Password', field: 'password', sortable: true, filter: true,editable:true},
            { headerName: 'Aadhar Card', field: 'aadharcard', sortable: true, filter: true,editable:true},
            { headerName: 'Pan Card', field: 'pancard', sortable: true, filter: true,editable:true},
            { headerName: 'Voter Card', field: 'votercard', sortable: true, filter: true,editable:true},
            { headerName: 'Phone', field: 'phone', sortable: true, filter: true,editable:true},
            { headerName: 'State', field: 'state', sortable: true, filter: true,editable:true},
            { headerName: 'Pincode', field: 'pincode', sortable: true, filter: true,editable:true},
            { headerName: 'Region', field: 'region', sortable: true, filter: true,editable:true},
            { headerName: 'Latitude', field: 'latitude', sortable: true, filter: true,editable:true},
            {
                headerName: 'Actions',
                field: 'actions',
                cellRenderer: MyCellComponent,
                editable:true
            }
        ];

        const handlePageChange = (pageNumber) => {
            setCurrentPage(pageNumber);
        };

        return (
            <div className="listing-container">
                <input
                    type="text"
                    placeholder="Search by name"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                 <div className="ag-theme-alpine" style={{ height: 600, width: '100%' }}>
                <AgGridReact
                    rowData={currentUsers}
                    columnDefs={columns}
                    pagination={true}
                    paginationPageSize={itemsPerPage}
                    paginationPageSizeSelector={[5, 10, 20]}
                    defaultColDef={{ sortable: true, filter: true, editable: true }}
                />
            </div>
                <div className="pagination">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => handlePageChange(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>
        );
    };

    export default Listing;