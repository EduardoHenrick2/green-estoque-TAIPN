const productService = require('../services/productService');

function handleError(res, error, defaultMessage) {
    console.error(defaultMessage, error);

    const statusCode = error.statusCode || 500;

    return res.status(statusCode).json({
        error: error.message || 'Erro interno no servidor.'
    });
}

async function getAllProducts(req, res) {
    try {
        const products = await productService.getAllProducts(req.query);
        return res.json(products);
    } catch (error) {
        return handleError(res, error, 'Erro ao listar produtos:');
    }
}

async function getProductById(req, res) {
    try {
        const product = await productService.getProductById(req.params.id);
        return res.json(product);
    } catch (error) {
        return handleError(res, error, 'Erro ao buscar produto:');
    }
}

async function createProduct(req, res) {
    try {
        const result = await productService.createProduct(req.body);
        return res.status(201).json(result);
    } catch (error) {
        return handleError(res, error, 'Erro ao criar produto:');
    }
}

async function updateProduct(req, res) {
    try {
        const result = await productService.updateProduct(req.params.id, req.body);
        return res.json(result);
    } catch (error) {
        return handleError(res, error, 'Erro ao atualizar produto:');
    }
}

async function deleteProduct(req, res) {
    try {
        const result = await productService.deleteProduct(req.params.id);
        return res.json(result);
    } catch (error) {
        return handleError(res, error, 'Erro ao inativar produto:');
    }
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};