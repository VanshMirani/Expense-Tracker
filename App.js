import React, { useState, useEffect } from 'react';
import ExpenseList from './components/ExpenseList';
import './styles.css';
import ErrorBoundary from './components/ErrorBoundary'; // Import the ErrorBoundary
import axios from 'axios';

const App = () => {
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const response = await axios.get('http://localhost:5001/api/expenses');
                setExpenses(response.data);
            } catch (error) {
                console.error('Error fetching expenses:', error);
            }
        };

        fetchExpenses();
    }, []);

    return (
        <div>
            <ErrorBoundary>
                <ExpenseList expenses={expenses} setExpenses={setExpenses} />
            </ErrorBoundary>
        </div>
    );
};

export default App;
