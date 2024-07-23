const listService = require('../services/listService');

exports.getList = async (req, res) => {
  try {
    const { nationality, date } = req.query; // Use req.query to get query parameters
    const result = await listService.getLists();
    res.status(200).json({ data: result });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
};
