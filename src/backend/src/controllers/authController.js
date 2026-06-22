const authService = require('../services/authService');
const { formatUserMeResponse } = require('../models/userModel');

function handleError(res, error, defaultMessage) {
    console.error(defaultMessage, error);

    const statusCode = error.statusCode || 500;

    return res.status(statusCode).json({
        error: error.message || 'Erro interno no servidor.'
    });
}

async function login(req, res) {
    try {
        const { email, senha } = req.body;
        const session = await authService.login(email, senha);

        return res.json({
            message: 'Login bem-sucedido.',
            ...session
        });
    } catch (error) {
        return handleError(res, error, 'Erro no login:');
    }
}

async function register(req, res) {
    try {
        const session = await authService.register(req.body);

        return res.status(201).json({
            message: 'Cadastro criado com sucesso.',
            ...session
        });
    } catch (error) {
        return handleError(res, error, 'Erro no cadastro:');
    }
}

async function getMe(req, res) {
    try {
        const usuario = await authService.getMe(req.usuario.id);

        return res.json(formatUserMeResponse(usuario));
    } catch (error) {
        return handleError(res, error, 'Erro ao buscar usuário logado:');
    }
}

module.exports = {
    login,
    register,
    getMe
};
