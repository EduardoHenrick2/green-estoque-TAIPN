const { prisma } = require('../config/prisma');

async function findAll(filters = {}) {
    const { nome, sku, categoria, marca } = filters;

    const where = {
        ativo: true
    };

    if (nome) {
        where.nome = {
            contains: String(nome),
            mode: 'insensitive'
        };
    }

    if (sku) {
        where.sku = String(sku);
    }

    if (marca) {
        where.marca = {
            contains: String(marca),
            mode: 'insensitive'
        };
    }

    if (categoria) {
        where.categoria = {
            nome: {
                contains: String(categoria),
                mode: 'insensitive'
            }
        };
    }

    return prisma.produto.findMany({
        where,
        include: {
            categoria: true
        },
        orderBy: {
            nome: 'asc'
        }
    });
}

async function findById(id) {
    return prisma.produto.findFirst({
        where: {
            id: Number(id),
            ativo: true
        },
        include: {
            categoria: true
        }
    });
}

async function findBySku(sku) {
    return prisma.produto.findUnique({
        where: {
            sku
        }
    });
}

async function findDuplicateSku(sku, id) {
    return prisma.produto.findFirst({
        where: {
            sku,
            id: {
                not: Number(id)
            }
        }
    });
}

async function create(productData) {
    return prisma.produto.create({
        data: productData
    });
}

async function update(id, productData) {
    return prisma.produto.update({
        where: {
            id: Number(id)
        },
        data: productData
    });
}

async function softDelete(id) {
    return prisma.produto.update({
        where: {
            id: Number(id)
        },
        data: {
            ativo: false
        }
    });
}

module.exports = {
    findAll,
    findById,
    findBySku,
    findDuplicateSku,
    create,
    update,
    softDelete
};