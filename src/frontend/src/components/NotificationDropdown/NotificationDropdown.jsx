/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, CheckCheck, PackageX, Settings, ShieldAlert, Truck, User, Warehouse } from 'lucide-react';
import api from '../../api/api';
import './NotificationDropdown.css';

const routeByType = {
    ESTOQUE_BAIXO: '/produtos?status=baixo',
    SEM_ESTOQUE: '/produtos?status=sem-estoque',
    MOVIMENTACAO: '/movimentacoes',
    ENTREGA: '/movimentacoes',
    PEDIDO_ENTREGUE: '/movimentacoes',
    USUARIO: '/usuarios',
    SISTEMA: '/configuracoes',
    AVISO_SISTEMA: '/configuracoes'
};

const typeMeta = {
    ESTOQUE_BAIXO: { label: 'Estoque baixo', icon: Warehouse },
    SEM_ESTOQUE: { label: 'Sem estoque', icon: PackageX },
    MOVIMENTACAO: { label: 'Movimentação', icon: Truck },
    ENTREGA: { label: 'Entrega', icon: Truck },
    PEDIDO_ENTREGUE: { label: 'Entrega', icon: Truck },
    USUARIO: { label: 'Usuário', icon: User },
    SISTEMA: { label: 'Sistema', icon: Settings },
    AVISO_SISTEMA: { label: 'Sistema', icon: Settings }
};

const isUnread = (notification) => notification.lida !== true && notification.lida !== 1;

const formatDate = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });
};

const NotificationDropdown = () => {
    const navigate = useNavigate();
    const dropdownRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(false);

    const unreadCount = useMemo(() => notifications.filter(isUnread).length, [notifications]);

    const loadNotifications = async () => {
        setLoading(true);
        try {
            const response = await api.get('/notifications');
            setNotifications(response.data || []);
        } catch (error) {
            console.error('Erro ao buscar notificações:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadNotifications();
    }, []);

    useEffect(() => {
        if (isOpen) {
            loadNotifications();
        }
    }, [isOpen]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEscape);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
        };
    }, []);

    const markAsRead = async (notification) => {
        if (isUnread(notification)) {
            await api.put(`/notifications/${notification.id}/read`);
            setNotifications((current) =>
                current.map((item) => (item.id === notification.id ? { ...item, lida: true } : item))
            );
        }
    };

    const handleNotificationClick = async (notification) => {
        try {
            await markAsRead(notification);
        } catch (error) {
            console.error('Erro ao marcar notificação como lida:', error);
        }

        const route = routeByType[notification.tipo] || '/configuracoes';
        setIsOpen(false);
        navigate(route);
    };

    const handleMarkAllAsRead = async () => {
        const unreadNotifications = notifications.filter(isUnread);
        if (unreadNotifications.length === 0) return;

        try {
            await Promise.all(unreadNotifications.map((notification) => api.put(`/notifications/${notification.id}/read`)));
            setNotifications((current) => current.map((notification) => ({ ...notification, lida: true })));
        } catch (error) {
            console.error('Erro ao marcar todas as notificações como lidas:', error);
        }
    };

    return (
        <div className="notification-dropdown" ref={dropdownRef}>
            <button
                type="button"
                className={`notification-trigger ${isOpen ? 'active' : ''}`}
                title="Notificações"
                aria-label="Notificações"
                aria-haspopup="menu"
                aria-expanded={isOpen}
                onClick={() => setIsOpen((current) => !current)}
            >
                <Bell size={19} />
                {unreadCount > 0 && <span className="notification-badge">{unreadCount > 9 ? '9+' : unreadCount}</span>}
            </button>

            {isOpen && (
                <div className="notification-panel" role="menu">
                    <div className="notification-header">
                        <div>
                            <strong>Notificações</strong>
                            <span>{unreadCount} não lida{unreadCount === 1 ? '' : 's'}</span>
                        </div>
                        <button type="button" onClick={handleMarkAllAsRead} disabled={unreadCount === 0}>
                            <CheckCheck size={15} />
                            Marcar todas
                        </button>
                    </div>

                    <div className="notification-list">
                        {loading ? (
                            <div className="notification-empty">Carregando notificações...</div>
                        ) : notifications.length === 0 ? (
                            <div className="notification-empty">
                                <ShieldAlert size={22} />
                                Nenhuma notificação no momento.
                            </div>
                        ) : (
                            notifications.map((notification) => {
                                const meta = typeMeta[notification.tipo] || { label: notification.tipo || 'Sistema', icon: Settings };
                                const Icon = meta.icon;

                                return (
                                    <button
                                        type="button"
                                        key={notification.id}
                                        className={`notification-item ${isUnread(notification) ? 'unread' : ''}`}
                                        onClick={() => handleNotificationClick(notification)}
                                        role="menuitem"
                                    >
                                        <span className="notification-icon">
                                            <Icon size={16} />
                                        </span>
                                        <span className="notification-content">
                                            <span className="notification-type">{meta.label}</span>
                                            <span className="notification-message">{notification.mensagem}</span>
                                            <span className="notification-date">{formatDate(notification.criado_em)}</span>
                                        </span>
                                    </button>
                                );
                            })
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotificationDropdown;
