function formatUserMeResponse(user) {
    return {
        id: user.id,
        nome: user.nome,
        email: user.email,
        criado_em: user.criadoEm,
        perfil: user.perfil?.nome || null
    };
}

function formatUserResponse(user) {
    return {
        id: user.id,
        nome: user.nome,
        email: user.email,
        criado_em: user.criadoEm,
        perfil: user.perfil?.nome || null,
        perfil_id: user.perfilId
    };
}

module.exports = {
    formatUserMeResponse,
    formatUserResponse
};
