import React, { useState } from 'react';
import './ExpenseList.css';
import ExpenseChart from './ExpenseChart';
import axios from 'axios';

const ExpenseList = ({ expenses, setExpenses }) => {
    const [editingExpense, setEditingExpense] = useState(null);
    const [updatedDescription, setUpdatedDescription] = useState('');
    const [updatedAmount, setUpdatedAmount] = useState('');
    const [updatedDate, setUpdatedDate] = useState('');

    // State for adding a new expense
    const [newDescription, setNewDescription] = useState('');
    const [newAmount, setNewAmount] = useState('');
    const [newDate, setNewDate] = useState('');

    // State to toggle the visibility of the Add Expense form
    const [showAddExpenseForm, setShowAddExpenseForm] = useState(false);

    const handleEditClick = (expense) => {
        setEditingExpense(expense);
        setUpdatedDescription(expense.description);
        setUpdatedAmount(expense.amount);
        setUpdatedDate(expense.date);
    };

    const handleUpdateExpense = async (id) => {
        try {
            const response = await axios.put(`http://localhost:5001/api/expenses/${id}`, {
                description: updatedDescription,
                amount: updatedAmount,
                date: updatedDate,
            });
            const updatedExpenses = expenses.map(expense =>
                expense._id === id ? response.data : expense
            );
            setExpenses(updatedExpenses);
            setEditingExpense(null);
        } catch (error) {
            console.error('Error updating expense:', error);
        }
    };

    const handleDeleteExpense = async (id) => {
        try {
            await axios.delete(`http://localhost:5001/api/expenses/${id}`);
            setExpenses(expenses.filter(expense => expense._id !== id));
        } catch (error) {
            console.error('Error deleting expense:', error);
        }
    };

    // Function to handle adding a new expense
    const handleAddExpense = async () => {
        try {
            const response = await axios.post('http://localhost:5001/api/expenses', {
                description: newDescription,
                amount: newAmount,
                date: newDate,
            });
            setExpenses([...expenses, response.data]);
            // Clear the input fields
            setNewDescription('');
            setNewAmount('');
            setNewDate('');
            // Hide the form after adding
            setShowAddExpenseForm(false);
        } catch (error) {
            console.error('Error adding expense:', error);
        }
    };

    return (
        <div>
            <h1>Expense Management</h1>
            <h2>Expense List</h2>

            {/* Button to toggle the Add Expense form */}
            <button onClick={() => setShowAddExpenseForm(!showAddExpenseForm)}>
                {showAddExpenseForm ? 'Cancel' : 'Add New Expense'}
            </button>

            {/* Add Expense Form */}
            {showAddExpenseForm && (
                <div className="edit-form">
                    <h3>Add New Expense</h3>
                    <input 
                        type="text" 
                        value={newDescription} 
                        onChange={(e) => setNewDescription(e.target.value)} 
                        placeholder="Description" 
                    />
                    <input 
                        type="number" 
                        value={newAmount} 
                        onChange={(e) => setNewAmount(e.target.value)} 
                        placeholder="Amount" 
                    />
                    <input 
                        type="date" 
                        value={newDate} 
                        onChange={(e) => setNewDate(e.target.value)} 
                    />
                    <button onClick={handleAddExpense}>Add Expense</button>
                </div>
            )}

            <ul className="expense-list">
                {expenses.map((expense) => (
                    <li key={expense._id} className="expense-item">
                        <span>{expense.description} - ₹{expense.amount}</span>
                        <div>
                            <button onClick={() => handleEditClick(expense)}>Edit</button>
                            <button onClick={() => handleDeleteExpense(expense._id)}>Delete</button>
                        </div>
                    </li>
                ))}
 </ul>

            {editingExpense && (
                <div className="edit-form">
                    <h3>Edit Expense</h3>
                    <input 
                        type="text" 
                        value={updatedDescription} 
                        onChange={(e) => setUpdatedDescription(e.target.value)} 
                        placeholder="Description" 
                    />
                    <input 
                        type="number" 
                        value={updatedAmount} 
                        onChange={(e) => setUpdatedAmount(e.target.value)} 
                        placeholder="Amount" 
                    />
                    <input 
                        type="date" 
                        value={updatedDate} 
                        onChange={(e) => setUpdatedDate(e.target.value)} 
                    />
                    <button onClick={() => handleUpdateExpense(editingExpense._id)}>Update Expense</button>
                </div>
            )}
             <ExpenseChart expenses={expenses} />
        </div>
    );
};

export default ExpenseList;