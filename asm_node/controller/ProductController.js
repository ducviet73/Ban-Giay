const productServices = require('../services/ProductServices');

exports.getAll = async() => {
    const products = await productServices.getAll();
    return products;
}

exports.create = async(name, description, old_price, new_price, image, product_type) => {
    try {
        const product = await productServices.create(name, description, old_price, new_price, image, product_type);
        return product;
    } catch (error) {
        console.log(error)
    }
}

exports.update = async(id, name, description, old_price, new_price, image, product_type) => {
    try {
        const product = await productServices.update(id, name, description, old_price, new_price, image, product_type);
        return product;
    } catch (error) {
        console.log(error)
    }
}

exports.delete = async(id) => {
    try {
        const product = await productServices.delete(id);
        return product;
    } catch (error) {
        console.log(error)
    }
}