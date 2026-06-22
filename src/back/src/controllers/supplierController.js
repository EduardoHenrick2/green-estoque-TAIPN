const supplierService = require('../services/supplierService');

function handleError(res, error, defaultMessage) {
    console.error(defaultMessage, error);

    const statusCode = error.statusCode || 500;

    return res.status(statusCode).json({
        error: error.message || 'Erro interno no servidor.'
    });
}

async function getAllSuppliers(req, res) {
    try {
        const suppliers = await supplierService.getAllSuppliers();
        return res.json(suppliers);
    } catch (error) {
        return handleError(res, error, 'Erro ao listar fornecedores:');
    }
}

async function getSupplierById(req, res) {
    try {
        const supplier = await supplierService.getSupplierById(req.params.id);
        return res.json(supplier);
    } catch (error) {
        return handleError(res, error, 'Erro ao buscar fornecedor:');
    }
}

async function createSupplier(req, res) {
    try {
        const result = await supplierService.createSupplier(req.body);
        return res.status(201).json(result);
    } catch (error) {
        return handleError(res, error, 'Erro ao criar fornecedor:');
    }
}

async function updateSupplier(req, res) {
    try {
        const result = await supplierService.updateSupplier(req.params.id, req.body);
        return res.json(result);
    } catch (error) {
        return handleError(res, error, 'Erro ao atualizar fornecedor:');
    }
}

async function deleteSupplier(req, res) {
    try {
        const result = await supplierService.deleteSupplier(req.params.id);
        return res.json(result);
    } catch (error) {
        return handleError(res, error, 'Erro ao excluir fornecedor:');
    }
}

module.exports = {
    getAllSuppliers,
    getSupplierById,
    createSupplier,
    updateSupplier,
    deleteSupplier
};
