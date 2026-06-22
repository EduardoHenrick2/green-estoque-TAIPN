const movementRepository = require('../repositories/movementRepository');
const AppError = require('../utils/AppError');
const { formatMovementListItem } = require('../models/movementModel');

async function getMovements() {
    const movements = await movementRepository.findAllWithUsersAndItems();
    return movements.map(formatMovementListItem);
}

async function createMovement(usuarioId, data) {
    const { tipo, status, itens } = data;

    if (!tipo || !status || !itens || !Array.isArray(itens) || itens.length === 0) {
        throw new AppError('Campos obrigatórios (tipo, status, itens) ausentes ou inválidos.', 400);
    }

    try {
        const movimentacao_id = await movementRepository.executeMovementTransaction(usuarioId, data);
        return {
            message: 'Movimentação registrada e estoque atualizado com sucesso!',
            movimentacao_id
        };
    } catch (error) {
        throw new AppError(error.message, 400);
    }
}

module.exports = {
    getMovements,
    createMovement
};
