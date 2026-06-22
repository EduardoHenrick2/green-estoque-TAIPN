const userRepository = require('../repositories/userRepository');
const AppError = require('../utils/AppError');
const bcrypt = require('bcryptjs');
const { formatUserResponse } = require('../models/userModel');

async function getUsers() {
    const users = await userRepository.findAll();
    return users.map(formatUserResponse);
}

async function getUserById(id) {
    const user = await userRepository.findById(id);
    if (!user) {
        throw new AppError('Usuário não encontrado.', 404);
    }
    return formatUserResponse(user);
}

async function createUser(data) {
    const { nome, email, senha, perfil_id } = data;

    if (!nome || !email || !senha || !perfil_id) {
        throw new AppError('Campos obrigatórios: nome, email, senha, perfil_id.', 400);
    }

    const existing = await userRepository.findByEmail(email);
    if (existing) {
        throw new AppError('E-mail já cadastrado.', 400);
    }

    const perfil = await userRepository.findPerfilById(perfil_id);
    if (!perfil) {
        throw new AppError('Perfil não encontrado.', 400);
    }

    const senhaHash = await bcrypt.hash(senha, 10);
    const created = await userRepository.create({
        nome,
        email,
        senhaHash,
        perfilId: Number(perfil_id)
    });

    return {
        message: 'Usuário criado com sucesso.',
        id: created.id
    };
}

async function updateUser(id, data) {
    const { nome, email, perfil_id, senha } = data;

    const existing = await userRepository.findById(id);
    if (!existing) {
        throw new AppError('Usuário não encontrado.', 404);
    }

    const updateData = {
        nome,
        email,
        perfilId: Number(perfil_id)
    };

    if (senha) {
        updateData.senhaHash = await bcrypt.hash(senha, 10);
    }

    await userRepository.update(id, updateData);

    return {
        message: 'Usuário atualizado com sucesso.'
    };
}

async function deleteUser(id) {
    const existing = await userRepository.findById(id);
    if (!existing) {
        throw new AppError('Usuário não encontrado.', 404);
    }

    await userRepository.remove(id);

    return {
        message: 'Usuário excluído com sucesso.'
    };
}

async function getPerfis() {
    return userRepository.findAllPerfis();
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    getPerfis
};
