function formatMovementListItem(movement) {
    const valor_total = movement.itens.reduce((sum, item) => {
        const preco = item.precoUnitario ? Number(item.precoUnitario) : 0;
        return sum + (item.quantidade * preco);
    }, 0);

    return {
        id: movement.id,
        tipo: movement.tipo,
        status: movement.status,
        data_movimentacao: movement.dataMovimentacao,
        usuario: movement.usuario?.nome || null,
        valor_total
    };
}

module.exports = {
    formatMovementListItem
};
