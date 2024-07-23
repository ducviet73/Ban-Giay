const List = require('../models/listModel');

exports.getLists = async (query) => {
    try {
        const list = await List.find({ date: { $gte: 2 }, ...query });
        return list;
    } catch (error) {
        console.error('Error fetching all products:', error);
        throw new Error('Failed to fetch all products');
    }
};
