const supplierRepository = require('../repositories/supplierRepository');
const AppError = require('../utils/AppError');
const { formatSupplierResponse } = require('../models/supplierModel');

async function getAllSuppliers() {
    const suppliers = await supplierRepository.findAll();
    return suppliers.map(formatSupplierResponse);
}

async function getSupplierById(id) {
    const supplier = await supplierRepository.findById(id);
    if (!supplier) {
        throw new AppError('Fornecedor não encontrado.', 404);
    }
    return formatSupplierResponse(supplier);
}

async function createSupplier(data) {
    const { nome, cnpj, email, telefone, contato } = data;

    if (!nome) {
        throw new AppError('O nome do fornecedor é obrigatório.', 400);
    }

    if (cnpj) {
        const existing = await supplierRepository.findByCnpj(cnpj);
        if (existing) {
            throw new AppError('Já existe um fornecedor com este CNPJ.', 400);
        }
    }

    const created = await supplierRepository.create({
        nome,
        cnpj: cnpj || null,
        contato: contato || null,
        email: email || null,
        telefone: telefone || null
    });

    return {
        message: 'Fornecedor criado com sucesso.',
        id: created.id
    };
}

async function updateSupplier(id, data) {
    const { nome, cnpj, email, telefone, contato } = data;

    if (!nome) {
        throw new AppError('O nome do fornecedor é obrigatório.', 400);
    }

    const existing = await supplierRepository.findById(id);
    if (!existing) {
        throw new AppError('Fornecedor não encontrado.', 404);
    }

    if (cnpj) {
        const duplicate = await supplierRepository.findDuplicateCnpj(cnpj, id);
        if (duplicate) {
            throw new AppError('Já existe outro fornecedor com este CNPJ.', 400);
        }
    }

    await supplierRepository.update(id, {
        nome,
        cnpj: cnpj || null,
        contato: contato || null,
        email: email || null,
        telefone: telefone || null
    });

    return {
        message: 'Fornecedor atualizado com sucesso.'
    };
}

async function deleteSupplier(id) {
    const existing = await supplierRepository.findById(id);
    if (!existing) {
        throw new AppError('Fornecedor não encontrado.', 404);
    }

    const hasProducts = await supplierRepository.hasLinkedProducts(id);
    if (hasProducts) {
        throw new AppError('Não é possível excluir: existem produtos vinculados a este fornecedor.', 400);
    }

    await supplierRepository.remove(id);

    return {
        message: 'Fornecedor excluído com sucesso.'
    };
}

module.exports = {
    getAllSuppliers,
    getSupplierById,
    createSupplier,
    updateSupplier,
    deleteSupplier
};
