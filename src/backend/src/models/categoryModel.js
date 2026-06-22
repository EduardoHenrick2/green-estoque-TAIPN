function buildCategoryPayload(data) {
    return {
        nome: data.nome ? data.nome.trim() : '',
        descricao: data.descricao ? data.descricao.trim() : null
    };
}

function formatCategoryResponse(category) {
    return {
        id: category.id,
        nome: category.nome,
        descricao: category.descricao
    };
}

module.exports = {
    buildCategoryPayload,
    formatCategoryResponse
};