function formatSupplierResponse(supplier) {
    return {
        id: supplier.id,
        nome: supplier.nome,
        cnpj: supplier.cnpj,
        contato: supplier.contato,
        email: supplier.email,
        telefone: supplier.telefone,
        criado_em: supplier.criadoEm
    };
}

module.exports = {
    formatSupplierResponse
};
