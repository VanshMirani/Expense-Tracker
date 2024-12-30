import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';

const ExpenseChart = ({ expenses }) => {
    const data = expenses.map(expense => ({
        name: expense.description,
        amount: expense.amount,
    }));

    return (
        <div className="chart-container">
            <h2>Expense Overview</h2>
            <BarChart width={600} height={300} data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <CartesianGrid strokeDasharray="3 3" />
                <Legend />
                <Bar dataKey="amount" fill="#007bff" label={false} /> {/* Set label to false */}
            </BarChart>
        </div>
    );
};

export default ExpenseChart;