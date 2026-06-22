/*
 * Seed de demonstração do Green Estoque.
 *
 * Execução: npm run seed
 *
 * Tabelas preenchidas: perfis, usuarios, categorias, fornecedores, produtos,
 * produto_fornecedor, movimentacoes, movimentacao_itens e notificacoes.
 *
 * O script é idempotente: os registros de cadastro usam chaves únicas (nome,
 * e-mail, CNPJ e SKU) e as movimentações de demonstração são identificadas
 * por um prefixo interno. Ao executar novamente, apenas as movimentações e
 * notificações desta demonstração são recriadas, sem duplicar dados.
 *
 * Para resetar os dados de demonstração, basta executar este comando outra vez.
 * Use somente em desenvolvimento ou em uma base exclusiva para apresentação,
 * pois os produtos de demonstração terão seus saldos recalculados.
 */

const bcrypt = require('bcryptjs');
const { prisma } = require('../config/prisma');

const SEED_MOVEMENT_PREFIX = '[SEED_GREEN_ESTOQUE]';

const profiles = ['ADMINISTRADOR', 'GESTOR', 'OPERACIONAL'];

const categories = [
    { nome: 'Módulos Fotovoltaicos', descricao: 'Módulos solares para geração de energia fotovoltaica.' },
    { nome: 'Inversores', descricao: 'Inversores string e microinversores para sistemas solares.' },
    { nome: 'Cabos e Conectores', descricao: 'Cabos solares, conectores e componentes de interligação.' },
    { nome: 'Proteção Elétrica', descricao: 'Itens de proteção para circuitos em corrente contínua.' },
    { nome: 'Estruturas de Fixação', descricao: 'Estruturas, trilhos e grampos para montagem de módulos.' },
    { nome: 'Armazenamento', descricao: 'Baterias e controladores para armazenamento de energia.' },
    { nome: 'Monitoramento', descricao: 'Medidores e itens de acompanhamento de geração e consumo.' },
    { nome: 'Acessórios', descricao: 'Itens complementares para instalações fotovoltaicas.' }
];

const suppliers = [
    { nome: 'Solar Minas Distribuidora', cnpj: '11.204.735/0001-18', contato: 'Marina Souza', email: 'comercial@solarminas.demo', telefone: '(31) 3333-1001' },
    { nome: 'EcoVolt Energia', cnpj: '24.619.830/0001-52', contato: 'Rafael Lima', email: 'vendas@ecovolt.demo', telefone: '(11) 3456-2010' },
    { nome: 'SolPrime Equipamentos', cnpj: '38.741.296/0001-07', contato: 'Camila Alves', email: 'atendimento@solprime.demo', telefone: '(41) 3222-7810' },
    { nome: 'GreenTech Solar', cnpj: '45.182.960/0001-64', contato: 'Bruno Freitas', email: 'contato@greentechsolar.demo', telefone: '(19) 3512-4490' },
    { nome: 'Horizonte Fotovoltaico', cnpj: '52.903.471/0001-31', contato: 'Patrícia Mendes', email: 'vendas@horizontefv.demo', telefone: '(21) 3098-6220' },
    { nome: 'NeoSolar Distribuição', cnpj: '63.517.824/0001-46', contato: 'Lucas Rocha', email: 'comercial@neosolar.demo', telefone: '(51) 3045-8900' },
    { nome: 'Energia Livre Brasil', cnpj: '76.240.159/0001-93', contato: 'Fernanda Costa', email: 'pedidos@energialivre.demo', telefone: '(85) 3201-7150' }
];

const users = [
    { nome: 'Administrador Green Estoque', email: 'admin@greenestoque.com', perfil: 'ADMINISTRADOR' },
    { nome: 'Funcionário Estoque', email: 'funcionario@greenestoque.com', perfil: 'OPERACIONAL' },
    { nome: 'Técnico Solar', email: 'tecnico@greenestoque.com', perfil: 'OPERACIONAL' },
    { nome: 'Supervisor Operacional', email: 'supervisor@greenestoque.com', perfil: 'GESTOR' }
];

const products = [
    { sku: 'MOD-MONO-550W', nome: 'Módulo Solar Monocristalino 550W', categoria: 'Módulos Fotovoltaicos', fornecedor: 'Solar Minas Distribuidora', marca: 'Canadian Solar', potenciaW: 550, dimensoes: '2279 x 1134 x 35 mm', precoCompra: 640, precoVenda: 795, quantidadeMinima: 30 },
    { sku: 'MOD-BIF-585W', nome: 'Módulo Solar Bifacial 585W', categoria: 'Módulos Fotovoltaicos', fornecedor: 'SolPrime Equipamentos', marca: 'Jinko Solar', potenciaW: 585, dimensoes: '2278 x 1134 x 30 mm', precoCompra: 790, precoVenda: 895, quantidadeMinima: 15 },
    { sku: 'INV-STRING-5KW', nome: 'Inversor Solar String 5kW', categoria: 'Inversores', fornecedor: 'EcoVolt Energia', marca: 'Growatt', potenciaW: 5000, dimensoes: '425 x 387 x 178 mm', precoCompra: 3150, precoVenda: 3890, quantidadeMinima: 5 },
    { sku: 'INV-STRING-10KW', nome: 'Inversor Solar String 10kW', categoria: 'Inversores', fornecedor: 'GreenTech Solar', marca: 'Solis', potenciaW: 10000, dimensoes: '535 x 420 x 180 mm', precoCompra: 5700, precoVenda: 6990, quantidadeMinima: 5 },
    { sku: 'MICRO-INV-1600W', nome: 'Microinversor 1600W', categoria: 'Inversores', fornecedor: 'NeoSolar Distribuição', marca: 'Hoymiles', potenciaW: 1600, dimensoes: '331 x 218 x 40 mm', precoCompra: 2150, precoVenda: 2790, quantidadeMinima: 6 },
    { sku: 'CAB-SOLAR-VERM-6MM', nome: 'Cabo Solar Vermelho 6mm²', categoria: 'Cabos e Conectores', fornecedor: 'Horizonte Fotovoltaico', marca: 'Prysmian', dimensoes: 'Rolo de 100 m', precoCompra: 6.8, precoVenda: 9.5, quantidadeMinima: 100 },
    { sku: 'CAB-SOLAR-PRET-6MM', nome: 'Cabo Solar Preto 6mm²', categoria: 'Cabos e Conectores', fornecedor: 'Horizonte Fotovoltaico', marca: 'Prysmian', dimensoes: 'Rolo de 100 m', precoCompra: 6.8, precoVenda: 9.5, quantidadeMinima: 100 },
    { sku: 'CON-MC4-PAR', nome: 'Conector MC4 Par Macho/Fêmea', categoria: 'Cabos e Conectores', fornecedor: 'Energia Livre Brasil', marca: 'Stäubli', dimensoes: 'Par', precoCompra: 21, precoVenda: 32, quantidadeMinima: 20 },
    { sku: 'SB-CC-2ENT', nome: 'String Box CC 2 Entradas', categoria: 'Proteção Elétrica', fornecedor: 'EcoVolt Energia', marca: 'Proauto', dimensoes: '320 x 260 x 140 mm', precoCompra: 390, precoVenda: 520, quantidadeMinima: 5 },
    { sku: 'DPS-CC-1000V', nome: 'DPS Solar CC 1000V', categoria: 'Proteção Elétrica', fornecedor: 'Energia Livre Brasil', marca: 'Clamper', dimensoes: 'Módulo DIN', precoCompra: 105, precoVenda: 165, quantidadeMinima: 8 },
    { sku: 'DISJ-CC-32A', nome: 'Disjuntor CC 32A', categoria: 'Proteção Elétrica', fornecedor: 'Energia Livre Brasil', marca: 'Soprano', dimensoes: '2 polos', precoCompra: 92, precoVenda: 145, quantidadeMinima: 12 },
    { sku: 'EST-TEL-CERAMICA', nome: 'Estrutura de Fixação para Telhado Cerâmico', categoria: 'Estruturas de Fixação', fornecedor: 'GreenTech Solar', marca: 'Romagnole', dimensoes: 'Kit para 1 módulo', precoCompra: 205, precoVenda: 295, quantidadeMinima: 10 },
    { sku: 'EST-TEL-METALICO', nome: 'Estrutura de Fixação para Telhado Metálico', categoria: 'Estruturas de Fixação', fornecedor: 'GreenTech Solar', marca: 'Romagnole', dimensoes: 'Kit para 1 módulo', precoCompra: 185, precoVenda: 275, quantidadeMinima: 5 },
    { sku: 'TRILHO-ALUMINIO-42', nome: 'Trilho de Alumínio para Painel Solar', categoria: 'Estruturas de Fixação', fornecedor: 'SolPrime Equipamentos', marca: 'AluSolar', dimensoes: '4,2 m', precoCompra: 78, precoVenda: 115, quantidadeMinima: 30 },
    { sku: 'GRAMP-INTERMEDIARIO', nome: 'Grampo Intermediário para Módulo', categoria: 'Estruturas de Fixação', fornecedor: 'SolPrime Equipamentos', marca: 'AluSolar', dimensoes: '35 mm', precoCompra: 8.5, precoVenda: 14, quantidadeMinima: 80 },
    { sku: 'GRAMP-FINAL', nome: 'Grampo Final para Módulo', categoria: 'Estruturas de Fixação', fornecedor: 'SolPrime Equipamentos', marca: 'AluSolar', dimensoes: '35 mm', precoCompra: 9.5, precoVenda: 15, quantidadeMinima: 40 },
    { sku: 'CTRL-MPPT-60A', nome: 'Controlador de Carga MPPT', categoria: 'Armazenamento', fornecedor: 'NeoSolar Distribuição', marca: 'Epever', potenciaW: 3000, dimensoes: '238 x 173 x 72 mm', precoCompra: 780, precoVenda: 1090, quantidadeMinima: 5 },
    { sku: 'BAT-LITIO-5KWH', nome: 'Bateria Estacionária Lítio 5kWh', categoria: 'Armazenamento', fornecedor: 'Solar Minas Distribuidora', marca: 'Dyness', potenciaW: 5000, dimensoes: '558 x 545 x 150 mm', precoCompra: 11200, precoVenda: 13990, quantidadeMinima: 3 },
    { sku: 'MED-BIDIRECIONAL', nome: 'Medidor Bidirecional', categoria: 'Monitoramento', fornecedor: 'EcoVolt Energia', marca: 'Schneider Electric', dimensoes: '96 x 96 mm', precoCompra: 390, precoVenda: 590, quantidadeMinima: 4 },
    { sku: 'KIT-ATERRAMENTO-FV', nome: 'Kit Aterramento Fotovoltaico', categoria: 'Acessórios', fornecedor: 'Horizonte Fotovoltaico', marca: 'GroundSolar', dimensoes: 'Kit completo', precoCompra: 120, precoVenda: 185, quantidadeMinima: 5 }
];

const demoNotifications = [
    { tipo: 'ESTOQUE_BAIXO', mensagem: 'Estoque crítico: DPS Solar CC 1000V possui 4 unidades disponíveis.', lida: false },
    { tipo: 'SEM_ESTOQUE', mensagem: 'Sem estoque: Disjuntor CC 32A aguarda reposição.', lida: false },
    { tipo: 'ESTOQUE_BAIXO', mensagem: 'Estoque baixo: Bateria Estacionária Lítio 5kWh possui 2 unidades disponíveis.', lida: false },
    { tipo: 'AVISO_SISTEMA', mensagem: 'Pedido de reposição aguardando recebimento: materiais fotovoltaicos em trânsito.', lida: true }
];

const expectedStock = {
    'MOD-MONO-550W': 120,
    'MOD-BIF-585W': 42,
    'INV-STRING-5KW': 8,
    'INV-STRING-10KW': 14,
    'MICRO-INV-1600W': 18,
    'CAB-SOLAR-VERM-6MM': 450,
    'CAB-SOLAR-PRET-6MM': 360,
    'CON-MC4-PAR': 35,
    'SB-CC-2ENT': 6,
    'DPS-CC-1000V': 4,
    'DISJ-CC-32A': 0,
    'EST-TEL-CERAMICA': 25,
    'EST-TEL-METALICO': 3,
    'TRILHO-ALUMINIO-42': 110,
    'GRAMP-INTERMEDIARIO': 320,
    'GRAMP-FINAL': 95,
    'CTRL-MPPT-60A': 12,
    'BAT-LITIO-5KWH': 2,
    'MED-BIDIRECIONAL': 8,
    'KIT-ATERRAMENTO-FV': 1
};

function daysAgo(days) {
    const date = new Date();
    date.setDate(date.getDate() - days);
    date.setHours(10, 0, 0, 0);
    return date;
}

async function createDemoMovement(tx, { usuarioId, fornecedorId = null, tipo, status, observacao, dataMovimentacao, itens }) {
    const movement = await tx.movimentacao.create({
        data: {
            usuarioId,
            fornecedorId,
            tipo,
            status,
            observacao: `${SEED_MOVEMENT_PREFIX} ${observacao}`,
            dataMovimentacao
        }
    });

    for (const item of itens) {
        await tx.movimentacaoItem.create({
            data: {
                movimentacaoId: movement.id,
                produtoId: item.produtoId,
                quantidade: item.quantidade,
                precoUnitario: item.precoUnitario
            }
        });

        if (tipo === 'ENTRADA' && status === 'RECEBIDO') {
            await tx.produto.update({
                where: { id: item.produtoId },
                data: { quantidadeAtual: { increment: item.quantidade } }
            });
        }

        if (tipo === 'SAIDA' && status === 'ENTREGUE') {
            await tx.produto.update({
                where: { id: item.produtoId },
                data: { quantidadeAtual: { decrement: item.quantidade } }
            });
        }

        if (tipo === 'RETORNO' && status === 'RETORNADO') {
            await tx.produto.update({
                where: { id: item.produtoId },
                data: { quantidadeAtual: { increment: item.quantidade } }
            });
        }
    }
}

function item(productIds, sku, quantidade, precoUnitario) {
    return { produtoId: productIds[sku], quantidade, precoUnitario };
}

async function seed() {
    // Senha exclusiva para desenvolvimento/apresentação. Nunca use em produção.
    const passwordHash = await bcrypt.hash('123456', 10);

    const result = await prisma.$transaction(async (tx) => {
        for (const profileName of profiles) {
            await tx.perfil.upsert({
                where: { nome: profileName },
                update: {},
                create: { nome: profileName }
            });
        }

        for (const category of categories) {
            await tx.categoria.upsert({
                where: { nome: category.nome },
                update: { descricao: category.descricao },
                create: category
            });
        }

        for (const supplier of suppliers) {
            await tx.fornecedor.upsert({
                where: { cnpj: supplier.cnpj },
                update: supplier,
                create: supplier
            });
        }

        const profileRows = await tx.perfil.findMany({ where: { nome: { in: profiles } } });
        const profileIds = Object.fromEntries(profileRows.map((profile) => [profile.nome, profile.id]));

        for (const user of users) {
            await tx.usuario.upsert({
                where: { email: user.email },
                update: {
                    nome: user.nome,
                    perfilId: profileIds[user.perfil],
                    senhaHash: passwordHash
                },
                create: {
                    nome: user.nome,
                    email: user.email,
                    perfilId: profileIds[user.perfil],
                    senhaHash: passwordHash
                }
            });
        }

        const categoryRows = await tx.categoria.findMany({ where: { nome: { in: categories.map((category) => category.nome) } } });
        const categoryIds = Object.fromEntries(categoryRows.map((category) => [category.nome, category.id]));

        for (const product of products) {
            const { categoria, fornecedor, ...productData } = product;
            const data = {
                ...productData,
                categoriaId: categoryIds[categoria],
                descricao: `Item de demonstração Green Estoque. Unidade de controle: ${product.sku.startsWith('CAB-') ? 'metro' : product.sku.includes('MC4') ? 'par' : product.sku.startsWith('EST-') || product.sku.startsWith('KIT-') ? 'kit' : 'unidade'}.`,
                quantidadeAtual: 0,
                ativo: true
            };

            await tx.produto.upsert({
                where: { sku: product.sku },
                update: data,
                create: data
            });
        }

        const productRows = await tx.produto.findMany({ where: { sku: { in: products.map((product) => product.sku) } } });
        const productIds = Object.fromEntries(productRows.map((product) => [product.sku, product.id]));

        const supplierRows = await tx.fornecedor.findMany({ where: { cnpj: { in: suppliers.map((supplier) => supplier.cnpj) } } });
        const supplierIds = Object.fromEntries(supplierRows.map((supplier) => [supplier.nome, supplier.id]));

        await tx.produtoFornecedor.createMany({
            data: products.map((product) => ({
                produtoId: productIds[product.sku],
                fornecedorId: supplierIds[product.fornecedor]
            })),
            skipDuplicates: true
        });

        const demoMovements = await tx.movimentacao.findMany({
            where: { observacao: { startsWith: SEED_MOVEMENT_PREFIX } },
            select: { id: true }
        });

        if (demoMovements.length > 0) {
            await tx.movimentacao.deleteMany({
                where: { id: { in: demoMovements.map((movement) => movement.id) } }
            });
        }

        await tx.notificacao.deleteMany({
            where: { mensagem: { in: demoNotifications.map((notification) => notification.mensagem) } }
        });

        const userRows = await tx.usuario.findMany({ where: { email: { in: users.map((user) => user.email) } } });
        const userIds = Object.fromEntries(userRows.map((user) => [user.email, user.id]));

        const adminId = userIds['admin@greenestoque.com'];
        const stockUserId = userIds['funcionario@greenestoque.com'];
        const technicianId = userIds['tecnico@greenestoque.com'];
        const supervisorId = userIds['supervisor@greenestoque.com'];

        await createDemoMovement(tx, {
            usuarioId: stockUserId,
            fornecedorId: supplierIds['Solar Minas Distribuidora'],
            tipo: 'ENTRADA',
            status: 'RECEBIDO',
            observacao: 'Recebimento de módulos para projetos residenciais.',
            dataMovimentacao: daysAgo(25),
            itens: [
                item(productIds, 'MOD-MONO-550W', 140, 640),
                item(productIds, 'MOD-BIF-585W', 60, 790)
            ]
        });

        await createDemoMovement(tx, {
            usuarioId: stockUserId,
            fornecedorId: supplierIds['EcoVolt Energia'],
            tipo: 'ENTRADA',
            status: 'RECEBIDO',
            observacao: 'Compra programada de inversores para instalações comerciais.',
            dataMovimentacao: daysAgo(22),
            itens: [
                item(productIds, 'INV-STRING-5KW', 12, 3150),
                item(productIds, 'INV-STRING-10KW', 18, 5700),
                item(productIds, 'MICRO-INV-1600W', 20, 2150)
            ]
        });

        await createDemoMovement(tx, {
            usuarioId: technicianId,
            tipo: 'SAIDA',
            status: 'ENTREGUE',
            observacao: 'Separação para instalação residencial no bairro Jardim Solar.',
            dataMovimentacao: daysAgo(20),
            itens: [
                item(productIds, 'MOD-MONO-550W', 25, 795),
                item(productIds, 'MOD-BIF-585W', 18, 895),
                item(productIds, 'INV-STRING-5KW', 4, 3890),
                item(productIds, 'INV-STRING-10KW', 4, 6990),
                item(productIds, 'MICRO-INV-1600W', 2, 2790)
            ]
        });

        await createDemoMovement(tx, {
            usuarioId: technicianId,
            tipo: 'RETORNO',
            status: 'RETORNADO',
            observacao: 'Retorno de módulos não utilizados em instalação residencial.',
            dataMovimentacao: daysAgo(18),
            itens: [item(productIds, 'MOD-MONO-550W', 5, 795)]
        });

        await createDemoMovement(tx, {
            usuarioId: stockUserId,
            fornecedorId: supplierIds['Horizonte Fotovoltaico'],
            tipo: 'ENTRADA',
            status: 'RECEBIDO',
            observacao: 'Reposição de cabos, conectores e itens de proteção.',
            dataMovimentacao: daysAgo(16),
            itens: [
                item(productIds, 'CAB-SOLAR-VERM-6MM', 600, 6.8),
                item(productIds, 'CAB-SOLAR-PRET-6MM', 450, 6.8),
                item(productIds, 'CON-MC4-PAR', 80, 21),
                item(productIds, 'SB-CC-2ENT', 10, 390),
                item(productIds, 'DPS-CC-1000V', 15, 105),
                item(productIds, 'DISJ-CC-32A', 50, 92)
            ]
        });

        await createDemoMovement(tx, {
            usuarioId: technicianId,
            tipo: 'SAIDA',
            status: 'ENTREGUE',
            observacao: 'Baixa de materiais usados em projeto de geração distribuída.',
            dataMovimentacao: daysAgo(13),
            itens: [
                item(productIds, 'CAB-SOLAR-VERM-6MM', 150, 9.5),
                item(productIds, 'CAB-SOLAR-PRET-6MM', 90, 9.5),
                item(productIds, 'CON-MC4-PAR', 45, 32),
                item(productIds, 'SB-CC-2ENT', 4, 520),
                item(productIds, 'DPS-CC-1000V', 11, 165),
                item(productIds, 'DISJ-CC-32A', 50, 145)
            ]
        });

        await createDemoMovement(tx, {
            usuarioId: stockUserId,
            fornecedorId: supplierIds['GreenTech Solar'],
            tipo: 'ENTRADA',
            status: 'RECEBIDO',
            observacao: 'Entrada de estruturas e acessórios de montagem.',
            dataMovimentacao: daysAgo(11),
            itens: [
                item(productIds, 'EST-TEL-CERAMICA', 30, 205),
                item(productIds, 'EST-TEL-METALICO', 15, 185),
                item(productIds, 'TRILHO-ALUMINIO-42', 140, 78),
                item(productIds, 'GRAMP-INTERMEDIARIO', 400, 8.5),
                item(productIds, 'GRAMP-FINAL', 120, 9.5)
            ]
        });

        await createDemoMovement(tx, {
            usuarioId: supervisorId,
            tipo: 'SAIDA',
            status: 'ENTREGUE',
            observacao: 'Materiais liberados para três instalações em telhado.',
            dataMovimentacao: daysAgo(8),
            itens: [
                item(productIds, 'EST-TEL-CERAMICA', 5, 295),
                item(productIds, 'EST-TEL-METALICO', 12, 275),
                item(productIds, 'TRILHO-ALUMINIO-42', 30, 115),
                item(productIds, 'GRAMP-INTERMEDIARIO', 80, 14),
                item(productIds, 'GRAMP-FINAL', 25, 15)
            ]
        });

        await createDemoMovement(tx, {
            usuarioId: stockUserId,
            fornecedorId: supplierIds['NeoSolar Distribuição'],
            tipo: 'ENTRADA',
            status: 'RECEBIDO',
            observacao: 'Recebimento de itens de armazenamento e monitoramento.',
            dataMovimentacao: daysAgo(6),
            itens: [
                item(productIds, 'CTRL-MPPT-60A', 20, 780),
                item(productIds, 'BAT-LITIO-5KWH', 5, 11200),
                item(productIds, 'MED-BIDIRECIONAL', 14, 390),
                item(productIds, 'KIT-ATERRAMENTO-FV', 10, 120)
            ]
        });

        await createDemoMovement(tx, {
            usuarioId: technicianId,
            tipo: 'SAIDA',
            status: 'ENTREGUE',
            observacao: 'Materiais destinados a sistema híbrido de pequeno porte.',
            dataMovimentacao: daysAgo(3),
            itens: [
                item(productIds, 'CTRL-MPPT-60A', 8, 1090),
                item(productIds, 'BAT-LITIO-5KWH', 3, 13990),
                item(productIds, 'MED-BIDIRECIONAL', 6, 590),
                item(productIds, 'KIT-ATERRAMENTO-FV', 9, 185)
            ]
        });

        await createDemoMovement(tx, {
            usuarioId: adminId,
            fornecedorId: supplierIds['Energia Livre Brasil'],
            tipo: 'ENTRADA',
            status: 'PENDENTE',
            observacao: 'Pedido em trânsito para reposição de materiais críticos.',
            dataMovimentacao: daysAgo(1),
            itens: [
                item(productIds, 'DPS-CC-1000V', 20, 105),
                item(productIds, 'DISJ-CC-32A', 30, 92),
                item(productIds, 'CON-MC4-PAR', 40, 21)
            ]
        });

        await tx.notificacao.createMany({ data: demoNotifications });

        const seededProducts = await tx.produto.findMany({
            where: { sku: { in: products.map((product) => product.sku) } },
            select: { sku: true, quantidadeAtual: true }
        });

        for (const [sku, expectedQuantity] of Object.entries(expectedStock)) {
            const seededProduct = seededProducts.find((product) => product.sku === sku);

            if (!seededProduct || seededProduct.quantidadeAtual !== expectedQuantity) {
                throw new Error(`Saldo de demonstração inválido para ${sku}.`);
            }
        }

        return {
            products: seededProducts.length,
            users: users.length,
            suppliers: suppliers.length,
            movements: 11,
            stock: Object.fromEntries(seededProducts.map((product) => [product.sku, product.quantidadeAtual]))
        };
    });

    console.log(`Seed concluído: ${result.products} produtos, ${result.suppliers} fornecedores, ${result.users} usuários e ${result.movements} movimentações.`);
    console.log('Acesso de demonstração: admin@greenestoque.com / 123456');
    console.log('Saldos em alerta:', {
        dps: result.stock['DPS-CC-1000V'],
        disjuntor: result.stock['DISJ-CC-32A'],
        bateria: result.stock['BAT-LITIO-5KWH']
    });
}

seed()
    .catch((error) => {
        console.error('Falha ao executar o seed de demonstração:', error);
        process.exitCode = 1;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
