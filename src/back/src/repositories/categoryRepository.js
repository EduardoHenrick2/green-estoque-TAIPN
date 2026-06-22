const { prisma } = require('../config/prisma');

async function findAll() {
    return prisma.categoria.findMany({
        orderBy: {
            nome: 'asc'
        }
    });
}

async function findById(id) {
    return prisma.categoria.findUnique({
        where: {
            id: Number(id)
        }
    });
}

async function findByName(nome) {
    return prisma.categoria.findFirst({
        where: {
            nome: {
                equals: nome,
                mode: 'insensitive'
            }
        }
    });
}

async function findDuplicateName(nome, id) {
    return prisma.categoria.findFirst({
        where: {
            nome: {
                equals: nome,
                mode: 'insensitive'
            },
            id: {
                not: Number(id)
            }
        }
    });
}

async function hasLinkedProducts(id) {
    const product = await prisma.produto.findFirst({
        where: {
            categoriaId: Number(id)
        },
        select: {
            id: true
        }
    });

    return !!product;
}

async function create(categoryData) {
    return prisma.categoria.create({
        data: categoryData
    });
}

async function update(id, categoryData) {
    return prisma.categoria.update({
        where: {
            id: Number(id)
        },
        data: categoryData
    });
}

async function remove(id) {
    return prisma.categoria.delete({
        where: {
            id: Number(id)
        }
    });
}

module.exports = {
    findAll,
    findById,
    findByName,
    findDuplicateName,
    hasLinkedProducts,
    create,
    update,
    remove
};