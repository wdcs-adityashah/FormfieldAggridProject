import React from 'react';

const MyCellComponent = (props) => {
    const { data, onEdit, onDelete } = props;

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

export default MyCellComponent;
