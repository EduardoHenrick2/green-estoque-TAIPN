const checkRole = (rolesPermitidas) => {
    return (req, res, next) => {
        // req.usuario deve ser preenchido pelo authMiddleware antes de chegar aqui
        if (!req.usuario || !req.usuario.perfil) {
            return res.status(403).json({ error: 'Acesso negado. Identificação de perfil falhou.' });
        }

        // Verifica se o perfil do usuário logado está na lista de perfis permitidos para a rota
        if (!rolesPermitidas.includes(req.usuario.perfil)) {
            return res.status(403).json({ error: 'Acesso negado. Seu perfil não tem permissão para executar esta ação.' });
        }

        next(); // Continua o fluxo
    };
};

module.exports = { checkRole };
