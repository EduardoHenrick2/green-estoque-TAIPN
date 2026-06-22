const productRepository = require('../repositories/productRepository');
const AppError = require('../utils/AppError');

const {
    buildProductPayload,
    formatProductResponse
} = require('../models/productModel');

function validateRequiredFields(data) {
    if (!data.nome || !data.sku || !data.categoria_id) {
        throw new AppError('Nome, SKU e categoria_id são obrigatórios.', 400);
    }
}

async function getAllProducts(filters) {
    const products = await productRepository.findAll(filters);

    let formattedProducts = products.map(formatProductResponse);

    if (filters.disponibilidade) {
        formattedProducts = formattedProducts.filter((product) => {
            return product.disponibilidade_status.toLowerCase() ===
                String(filters.disponibilidade).toLowerCase();
        });
    }

    return formattedProducts;
}

async function getProductById(id) {
    const product = await productRepository.findById(id);

    if (!product) {
        throw new AppError('Produto não encontrado ou inativo.', 404);
    }

    return formatProductResponse(product);
}

async function createProduct(data) {
    validateRequiredFields(data);

    const existingSku = await productRepository.findBySku(data.sku);

    if (existingSku) {
        throw new AppError('Já existe um produto com este SKU.', 400);
    }

    const productPayload = buildProductPayload(data);

    const createdProduct = await productRepository.create(productPayload);

    return {
        message: 'Produto criado com sucesso.',
        id: createdProduct.id
    };
}

async function updateProduct(id, data) {
    const existingProduct = await productRepository.findById(id);

    if (!existingProduct) {
        throw new AppError('Produto não encontrado ou inativo.', 404);
    }

    validateRequiredFields(data);

    const duplicateSku = await productRepository.findDuplicateSku(data.sku, id);

    if (duplicateSku) {
        throw new AppError('SKU já em uso por outro produto.', 400);
    }

    const productPayload = buildProductPayload(data);

    await productRepository.update(id, productPayload);

    return {
        message: 'Produto atualizado com sucesso.'
    };
}

async function deleteProduct(id) {
    const existingProduct = await productRepository.findById(id);

    if (!existingProduct) {
        throw new AppError('Produto não encontrado.', 404);
    }

    await productRepository.softDelete(id);

    return {
        message: 'Produto inativado com sucesso.'
    };
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};