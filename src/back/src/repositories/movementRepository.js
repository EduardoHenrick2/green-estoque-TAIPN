const { prisma } = require('../config/prisma');

async function findAllWithUsersAndItems() {
    return prisma.movimentacao.findMany({
        include: {
            usuario: {
                select: { nome: true }
            },
            itens: {
                select: {
                    quantidade: true,
                    precoUnitario: true
                }
            }
        },
        orderBy: {
            dataMovimentacao: 'desc'
        },
        take: 100
    });
}

async function executeMovementTransaction(usuarioId, data) {
    const { tipo, status, fornecedor_id, notificar_entrega, observacao, itens } = data;

    return prisma.$transaction(async (tx) => {
        // 1. Cria a movimentação principal
        const movimentacao = await tx.movimentacao.create({
            data: {
                usuarioId: Number(usuarioId),
                fornecedorId: fornecedor_id ? Number(fornecedor_id) : null,
                tipo: tipo,
                status: status,
                observacao: observacao || null
            }
        });

        const movimentacao_id = movimentacao.id;

        // 2. Processa os itens da movimentação
        for (const item of itens) {
            const { produto_id, quantidade, valor_unitario } = item;

            if (!produto_id || quantidade === undefined || quantidade === null) {
                throw new Error(`Dados inválidos no item da movimentação. Faltando produto_id ou quantidade.`);
            }

            // Inserir na tabela relacional movimentacao_itens
            await tx.movimentacaoItem.create({
                data: {
                    movimentacaoId: movimentacao_id,
                    produtoId: Number(produto_id),
                    quantidade: Number(quantidade),
                    precoUnitario: valor_unitario || 0
                }
            });

            // Lock pessimista na linha do produto para evitar concorrência no estoque
            const prodRows = await tx.$queryRaw`
                SELECT nome, quantidade_atual, quantidade_minima 
                FROM produtos 
                WHERE id = ${Number(produto_id)} 
                FOR UPDATE
            `;

            if (!prodRows || prodRows.length === 0) {
                throw new Error(`Produto ID ${produto_id} não encontrado.`);
            }

            const produto = prodRows[0];
            let novaQuantidade = produto.quantidade_atual;

            // Regras matemáticas de negócio baseadas no tipo/status da movimentação
            if (tipo === 'ENTRADA' && status === 'RECEBIDO') {
                novaQuantidade += quantidade;
            } else if (tipo === 'SAIDA' && status === 'ENTREGUE') {
                novaQuantidade -= quantidade;
            } else if (tipo === 'RETORNO' && status === 'RETORNADO') {
                novaQuantidade += quantidade;
            } else if (tipo === 'AJUSTE') {
                novaQuantidade = quantidade;
            }

            // Evitar estoque negativo
            if (novaQuantidade < 0) {
                throw new Error(`Estoque insuficiente para o produto '${produto.nome}'. Você tentou remover ${quantidade}, mas só existem ${produto.quantidade_atual} disponíveis.`);
            }

            // Apenas atualiza se houve alteração na quantidade
            if (novaQuantidade !== produto.quantidade_atual) {
                await tx.produto.update({
                    where: { id: Number(produto_id) },
                    data: { quantidadeAtual: novaQuantidade }
                });

                // Criar notificações de ruptura ou estoque baixo
                if (novaQuantidade === 0) {
                    await tx.notificacao.create({
                        data: {
                            tipo: 'SEM_ESTOQUE',
                            mensagem: `ATENÇÃO: O produto '${produto.nome}' está zerado (Sem estoque).`
                        }
                    });
                } else if (novaQuantidade <= produto.quantidade_minima) {
                    await tx.notificacao.create({
                        data: {
                            tipo: 'ESTOQUE_BAIXO',
                            mensagem: `AVISO: O produto '${produto.nome}' atingiu o nível de segurança (${novaQuantidade} unidades restantes).`
                        }
                    });
                }
            }
        }

        // Criar notificações gerais de entrega solicitadas
        if (notificar_entrega) {
            if (status === 'ENTREGUE' && tipo === 'SAIDA') {
                await tx.notificacao.create({
                    data: {
                        tipo: 'PEDIDO_ENTREGUE',
                        mensagem: `Uma Saída de Estoque (Movimentação #${movimentacao_id}) foi entregue com sucesso.`
                    }
                });
            } else if (status === 'RECEBIDO' && tipo === 'ENTRADA') {
                await tx.notificacao.create({
                    data: {
                        tipo: 'AVISO_SISTEMA',
                        mensagem: `Uma nova Entrada de Estoque (Movimentação #${movimentacao_id}) foi recebida e adicionada ao inventário.`
                    }
                });
            }
        }

        return movimentacao_id;
    });
}

module.exports = {
    findAllWithUsersAndItems,
    executeMovementTransaction
};
