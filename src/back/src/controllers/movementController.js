const movementService = require('../services/movementService');

function handleError(res, error, defaultMessage) {
    console.error(defaultMessage, error);

    const statusCode = error.statusCode || 500;

    return res.status(statusCode).json({
        error: error.message || 'Erro interno no servidor.'
    });
}

async function createMovement(req, res) {
    try {
        const result = await movementService.createMovement(req.usuario.id, req.body);
        return res.status(201).json(result);
    } catch (error) {
        return handleError(res, error, 'Falha no processamento da movimentação:');
    }
}

async function getMovements(req, res) {
    try {
        const movements = await movementService.getMovements();
        return res.json(movements);
    } catch (error) {
        return handleError(res, error, 'Erro ao listar movimentações:');
    }
}

module.exports = {
    createMovement,
    getMovements
};
