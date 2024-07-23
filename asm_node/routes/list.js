const express = require('express');
const router = express.Router();
const listController = require('../controller/listController');

router.get('/:nationality/:date', async function(req, res, next) {
    try {
        const { nationality, date } = req.params;
        const result = await listController.getList({ nationality, date: parseInt(date) }); // Pass query parameters to getList
        res.status(200).json({ data: result });
    } catch (error) {
        console.error('Error:', error); // Log the error for debugging
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
