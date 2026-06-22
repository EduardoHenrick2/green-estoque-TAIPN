const { prisma } = require('../config/prisma');

async function findByEmail(email) {
    return prisma.usuario.findUnique({
        where: { email },
        include: { perfil: true }
    });
}

async function findById(id) {
    return prisma.usuario.findUnique({
        where: { id: Number(id) },
        include: { perfil: true }
    });
}

async function findPerfilByName(nome) {
    return prisma.perfil.findUnique({
        where: { nome }
    });
}

async function findPerfilById(id) {
    return prisma.perfil.findUnique({
        where: { id: Number(id) }
    });
}

async function findAllPerfis() {
    return prisma.perfil.findMany({
        orderBy: { id: 'asc' }
    });
}

async function findAll() {
    return prisma.usuario.findMany({
        include: { perfil: true },
        orderBy: { nome: 'asc' }
    });
}

async function create(userData) {
    return prisma.usuario.create({
        data: userData,
        include: { perfil: true }
    });
}

async function update(id, userData) {
    return prisma.usuario.update({
        where: { id: Number(id) },
        data: userData
    });
}

async function remove(id) {
    return prisma.usuario.delete({
        where: { id: Number(id) }
    });
}

module.exports = {
    findByEmail,
    findById,
    findPerfilByName,
    findPerfilById,
    findAllPerfis,
    findAll,
    create,
    update,
    remove
};
