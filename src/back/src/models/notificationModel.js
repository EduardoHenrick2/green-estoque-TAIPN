function formatNotificationResponse(notification) {
    return {
        id: notification.id,
        tipo: notification.tipo,
        mensagem: notification.mensagem,
        lida: notification.lida,
        criado_em: notification.criadoEm
    };
}

module.exports = {
    formatNotificationResponse
};
