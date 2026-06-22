const categoryService = require('../services/categoryService');

function handleError(res, error, defaultMessage) {
    console.error(defaultMessage, error);

    const statusCode = error.statusCode || 500;

    return res.status(statusCode).json({
        error: error.message || 'Erro interno no servidor.'
    });
}

async function getAllCategories(req, res) {
    try {
        const categories = await categoryService.getAllCategories();

        return res.json(categories);
    } catch (error) {
        return handleError(res, error, 'Erro ao listar categorias:');
    }
}

async function createCategory(req, res) {
    try {
        const result = await categoryService.createCategory(req.body);

        return res.status(201).json(result);
    } catch (error) {
        return handleError(res, error, 'Erro ao criar categoria:');
    }
}

async function updateCategory(req, res) {
    try {
        const result = await categoryService.updateCategory(req.params.id, req.body);

        return res.json(result);
    } catch (error) {
        return handleError(res, error, 'Erro ao atualizar categoria:');
    }
}

async function deleteCategory(req, res) {
    try {
        const result = await categoryService.deleteCategory(req.params.id);

        return res.json(result);
    } catch (error) {
        return handleError(res, error, 'Erro ao excluir categoria:');
    }
}

module.exports = {
    getAllCategories,
    createCategory,
    updateCategory,
    deleteCategory
};