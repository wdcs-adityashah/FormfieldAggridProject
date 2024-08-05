import React, { useState, useEffect } from 'react';
import './App.css';
import Form from './components/Form/Form';
import Listing from './components/Listing/Listing';

const App = () => {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);

    useEffect(() => {
        const storedUsers = JSON.parse(localStorage.getItem('users'));
        setUsers(storedUsers || []);
    }, []);

    useEffect(() => {
        localStorage.setItem('users', JSON.stringify(users));
    }, [users]);

    const handleSave = (data) => {
        if (editingUser) {
            setUsers(users.map(user => user.id === editingUser.id ? { ...data, id: editingUser.id } : user));
            setEditingUser(null);
        } else {
            setUsers([...users, { ...data, id: Date.now() }]);
        }
    };

    const handleEdit = (user) => setEditingUser(user);

    const handleDelete = (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            setUsers(users.filter(user => user.id !== userId));
        }
    };

    const handleCancelEdit = () => setEditingUser(null);

    return (
        <div className="App">
            <Form
                onSave={handleSave}
                editingUser={editingUser}
                onCancel={handleCancelEdit}
            />
            <Listing
                users={users}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
        </div>
    );
};

export default App;
