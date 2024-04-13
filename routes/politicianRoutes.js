// routes/politicianRoutes.js

const express = require('express');
const router = express.Router();
const Politician = require('../models/Politician');

// Create a politician
router.post('/', async (req, res) => {
    try {
        const politician = await Politician.create(req.body);
        res.status(201).json(politician);
    } catch (error) {
        console.error('Error creating politician:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

// Get all politicians
router.get('/', async (req, res) => {
    try {
        const politicians = await Politician.findAll();
        res.status(200).json(politicians);
    } catch (error) {
        console.error('Error fetching politicians:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

// Get a single politician by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const politician = await Politician.findByPk(id);
        if (!politician) {
            return res.status(404).json({ message: 'Politician not found.' });
        }
        res.status(200).json(politician);
    } catch (error) {
        console.error('Error fetching politician:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

// Update a politician by ID
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [updated] = await Politician.update(req.body, {
            where: { id }
        });
        if (updated) {
            const updatedPolitician = await Politician.findByPk(id);
            return res.status(200).json(updatedPolitician);
        }
        throw new Error('Politician not found.');
    } catch (error) {
        console.error('Error updating politician:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

// Delete a politician by ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await Politician.destroy({
            where: { id }
        });
        if (deleted) {
            return res.status(204).send();
        }
        throw new Error('Politician not found.');
    } catch (error) {
        console.error('Error deleting politician:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

module.exports = router;
