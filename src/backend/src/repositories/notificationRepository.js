const { prisma } = require('../config/prisma');

async function findAll(filters = {}) {
    const where = {};

    if (filters.lida !== undefined) {
        where.lida = filters.lida;
    }

    return prisma.notificacao.findMany({
        where,
        orderBy: {
            criadoEm: 'desc'
        },
        take: 50
    });
}

async function findById(id) {
    return prisma.notificacao.findUnique({
        where: {
            id: Number(id)
        }
    });
}

async function updateLida(id, lida) {
    return prisma.notificacao.update({
        where: {
            id: Number(id)
        },
        data: {
            lida
        }
    });
}

module.exports = {
    findAll,
    findById,
    updateLida
};
