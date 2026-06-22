const userService = require('../services/userService');

function handleError(res, error, defaultMessage) {
    console.error(defaultMessage, error);

    const statusCode = error.statusCode || 500;

    return res.status(statusCode).json({
        error: error.message || 'Erro interno no servidor.'
    });
}

async function getUsers(req, res) {
    try {
        const users = await userService.getUsers();
        return res.json(users);
    } catch (error) {
        return handleError(res, error, 'Erro ao listar usuários:');
    }
}

async function getUserById(req, res) {
    try {
        const user = await userService.getUserById(req.params.id);
        return res.json(user);
    } catch (error) {
        return handleError(res, error, 'Erro ao buscar usuário:');
    }
}

async function createUser(req, res) {
    try {
        const result = await userService.createUser(req.body);
        return res.status(201).json(result);
    } catch (error) {
        return handleError(res, error, 'Erro ao criar usuário:');
    }
}

async function updateUser(req, res) {
    try {
        const result = await userService.updateUser(req.params.id, req.body);
        return res.json(result);
    } catch (error) {
        return handleError(res, error, 'Erro ao atualizar usuário:');
    }
}

async function deleteUser(req, res) {
    try {
        const result = await userService.deleteUser(req.params.id);
        return res.json(result);
    } catch (error) {
        return handleError(res, error, 'Erro ao excluir usuário:');
    }
}

async function getPerfis(req, res) {
    try {
        const perfis = await userService.getPerfis();
        return res.json(perfis);
    } catch (error) {
        return handleError(res, error, 'Erro ao buscar perfis:');
    }
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    getPerfis
};
