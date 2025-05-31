const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');


// GET /api/expenses
router.get('/', async (req, res) => {
    try {
        const expenses = await Expense.find();
        res.json(expenses);
    } catch (error) {
        console.error('Error fetching expenses:', error);
        res.status(500).json({ message: 'Error fetching expenses' });
    }
});

// POST /api/expenses
router.post('/', async (req, res) => {
    try {
        const exchangeRate = 75; // Example exchange rate (1 dollar = 75 rupees)
        const amountInDollars = req.body.amount; // Assuming the amount is in dollars
        const amountInRupees = amountInDollars * exchangeRate; // Convert to rupees

        const newExpense = new Expense({
            description: req.body.description,
            amount: amountInRupees, // Save amount in rupees
            date: req.body.date
        });
        await newExpense.save();
        res.status(201).json(newExpense);
    } catch (error) {
        console.error('Error saving expense:', error);
        res.status(500).json({ message: 'Error saving expense' });
    }
});

router.delete('/:id', async (req, res) => {
    await Expense.findByIdAndDelete(req.params.id);
    res.json({ message: 'Expense deleted' });
});

router.put('/:id', async (req, res) => {
    try {
        const { description, amount, date } = req.body;
        const updatedExpense = await Expense.findByIdAndUpdate(
            req.params.id,
            { description, amount, date },
            { new: true } // Return the updated document
        );

        if (!updatedExpense) {
            return res.status(404).json({ message: 'Expense not found' });
        }
        res.json(updatedExpense);
    } catch (error) {
        console.error('Error updating expense:', error);
        res.status(500).json({ message: 'Error updating expense' });
    }
});


module.exports = router;
