const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userRepository = require('../repositories/userRepository');
const AppError = require('../utils/AppError');

function createSession(usuario) {
    const perfilNome = usuario.perfil?.nome || usuario.perfil_nome;
    const token = jwt.sign(
        { id: usuario.id, email: usuario.email, perfil: perfilNome, nome: usuario.nome },
        process.env.JWT_SECRET,
        { expiresIn: '8h' }
    );

    return {
        token,
        usuario: {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
            perfil: perfilNome
        }
    };
}

async function login(email, senha) {
    if (!email || !senha) {
        throw new AppError('Email e senha são obrigatórios.', 400);
    }

    const usuario = await userRepository.findByEmail(email);

    if (!usuario) {
        throw new AppError('Credenciais inválidas.', 401);
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senhaHash);

    if (!senhaValida) {
        throw new AppError('Credenciais inválidas.', 401);
    }

    return createSession(usuario);
}

async function register(data) {
    const { nome, email, senha } = data;
    const nomeLimpo = nome?.trim();
    const emailLimpo = email?.trim().toLowerCase();

    if (!nomeLimpo || !emailLimpo || !senha) {
        throw new AppError('Nome, email e senha são obrigatórios.', 400);
    }

    if (senha.length < 6) {
        throw new AppError('A senha deve ter pelo menos 6 caracteres.', 400);
    }

    const existingUser = await userRepository.findByEmail(emailLimpo);
    if (existingUser) {
        throw new AppError('E-mail já cadastrado.', 400);
    }

    const perfil = await userRepository.findPerfilByName('OPERACIONAL');
    if (!perfil) {
        throw new AppError('Perfil operacional não encontrado no sistema.', 500);
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const createdUser = await userRepository.create({
        nome: nomeLimpo,
        email: emailLimpo,
        senhaHash: senhaHash,
        perfilId: perfil.id
    });

    return createSession(createdUser);
}

async function getMe(userId) {
    const usuario = await userRepository.findById(userId);

    if (!usuario) {
        throw new AppError('Usuário não encontrado.', 404);
    }

    return usuario;
}

module.exports = {
    login,
    register,
    getMe
};
