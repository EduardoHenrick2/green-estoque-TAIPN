const notificationService = require('../services/notificationService');

function handleError(res, error, defaultMessage) {
    console.error(defaultMessage, error);

    const statusCode = error.statusCode || 500;

    return res.status(statusCode).json({
        error: error.message || 'Erro interno no servidor.'
    });
}

async function getNotifications(req, res) {
    try {
        const notifications = await notificationService.getNotifications(req.query);
        return res.json(notifications);
    } catch (error) {
        return handleError(res, error, 'Erro ao buscar notificações:');
    }
}

async function markAsRead(req, res) {
    try {
        const result = await notificationService.markAsRead(req.params.id);
        return res.json(result);
    } catch (error) {
        return handleError(res, error, 'Erro ao marcar notificação como lida:');
    }
}

module.exports = {
    getNotifications,
    markAsRead
};
