require('dotenv').config();

const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    throw new Error('DATABASE_URL nao configurada.');
}

const adapter = new PrismaPg(connectionString);
const prisma = new PrismaClient({ adapter });

async function connectDatabase() {
    try {
        await prisma.$connect();
        console.log('Conexão com o banco de dados estabelecida com sucesso!');
    } catch (error) {
        console.error('Erro ao conectar com o banco de dados:', error.message);
        process.exit(1);
    }
}

module.exports = {
    prisma,
    connectDatabase
};
