const categoryRepository = require('../repositories/categoryRepository');
const AppError = require('../utils/AppError');

const {
    buildCategoryPayload,
    formatCategoryResponse
} = require('../models/categoryModel');

function validateId(id) {
    const numericId = Number(id);

    if (!Number.isInteger(numericId) || numericId <= 0) {
        throw new AppError('ID da categoria inválido.', 400);
    }

    return numericId;
}

function validateRequiredFields(data) {
    if (!data.nome || !data.nome.trim()) {
        throw new AppError('O nome da categoria é obrigatório.', 400);
    }
}

async function getAllCategories() {
    const categories = await categoryRepository.findAll();

    return categories.map(formatCategoryResponse);
}

async function createCategory(data) {
    validateRequiredFields(data);

    const categoryPayload = buildCategoryPayload(data);

    const existingCategory = await categoryRepository.findByName(categoryPayload.nome);

    if (existingCategory) {
        throw new AppError('Já existe uma categoria com este nome.', 400);
    }

    const createdCategory = await categoryRepository.create(categoryPayload);

    return {
        message: 'Categoria criada com sucesso.',
        id: createdCategory.id
    };
}

async function updateCategory(id, data) {
    validateId(id);
    validateRequiredFields(data);

    const existingCategory = await categoryRepository.findById(id);

    if (!existingCategory) {
        throw new AppError('Categoria não encontrada.', 404);
    }

    const categoryPayload = buildCategoryPayload(data);

    const duplicateCategory = await categoryRepository.findDuplicateName(
        categoryPayload.nome,
        id
    );

    if (duplicateCategory) {
        throw new AppError('Já existe outra categoria com este nome.', 400);
    }

    await categoryRepository.update(id, categoryPayload);

    return {
        message: 'Categoria atualizada com sucesso.'
    };
}

async function deleteCategory(id) {
    validateId(id);

    const existingCategory = await categoryRepository.findById(id);

    if (!existingCategory) {
        throw new AppError('Categoria não encontrada.', 404);
    }

    const categoryHasProducts = await categoryRepository.hasLinkedProducts(id);

    if (categoryHasProducts) {
        throw new AppError(
            'Não é possível excluir: existem produtos vinculados a esta categoria.',
            400
        );
    }

    await categoryRepository.remove(id);

    return {
        message: 'Categoria excluída com sucesso.'
    };
}

module.exports = {
    getAllCategories,
    createCategory,
    updateCategory,
    deleteCategory
};