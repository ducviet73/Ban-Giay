const productModel = require('../models/ProductModels');

exports.getAll = async(query) => {
    // if (query) {
    //     const { type } = query;
    //     products = await productModel.find({
    //         type
    //     })
    // }
    const products = await productModel.find({})
    return products;
}

exports.getByID = async(id) => {
    try {
        const product = await productModel.findById(id);
        return product;
    } catch (error) {
        console.error('Error fetching product by ID:', error);
        throw new Error('Failed to fetch product by ID');
    }
};

exports.create = async(name, description, old_price, new_price, image, product_type) => {
    const model = new productModel({ name, description, old_price, new_price, image, product_type });
    await model.save();
    return model;
}

exports.update = async(id, name, description, old_price, new_price, image, product_type) => {
    const model = await productModel.findByIdAndUpdate(id, { name, description, old_price, new_price, image, product_type });
    return model;
}

exports.delete = async(id) => {
    await productModel.deleteOne({ _id: id });
    return model;
}