const { prisma } = require('../config/prisma');

async function findAll() {
    return prisma.fornecedor.findMany({
        orderBy: {
            nome: 'asc'
        }
    });
}

async function findById(id) {
    return prisma.fornecedor.findUnique({
        where: {
            id: Number(id)
        }
    });
}

async function findByCnpj(cnpj) {
    return prisma.fornecedor.findUnique({
        where: {
            cnpj
        }
    });
}

async function findDuplicateCnpj(cnpj, id) {
    return prisma.fornecedor.findFirst({
        where: {
            cnpj,
            id: {
                not: Number(id)
            }
        }
    });
}

async function hasLinkedProducts(id) {
    const link = await prisma.produtoFornecedor.findFirst({
        where: {
            fornecedorId: Number(id)
        }
    });
    return !!link;
}

async function create(data) {
    return prisma.fornecedor.create({
        data
    });
}

async function update(id, data) {
    return prisma.fornecedor.update({
        where: {
            id: Number(id)
        },
        data
    });
}

async function remove(id) {
    return prisma.fornecedor.delete({
        where: {
            id: Number(id)
        }
    });
}

module.exports = {
    findAll,
    findById,
    findByCnpj,
    findDuplicateCnpj,
    hasLinkedProducts,
    create,
    update,
    remove
};
