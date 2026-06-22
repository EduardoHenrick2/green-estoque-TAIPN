const notificationRepository = require('../repositories/notificationRepository');
const AppError = require('../utils/AppError');
const { formatNotificationResponse } = require('../models/notificationModel');

async function getNotifications(filters = {}) {
    const parsedFilters = {};
    
    if (filters.lida !== undefined) {
        parsedFilters.lida = filters.lida === 'true' || filters.lida === '1';
    }

    const notifications = await notificationRepository.findAll(parsedFilters);
    return notifications.map(formatNotificationResponse);
}

async function markAsRead(id) {
    const existing = await notificationRepository.findById(id);
    if (!existing) {
        throw new AppError('Notificação não encontrada.', 404);
    }

    await notificationRepository.updateLida(id, true);

    return {
        message: 'Notificação marcada como lida.'
    };
}

module.exports = {
    getNotifications,
    markAsRead
};
