import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, LogOut, Settings, ShieldCheck, User } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import './UserMenu.css';

const getInitial = (name) => (name?.trim()?.charAt(0) || 'U').toUpperCase();

const canSeePermissions = (profile) => {
    const normalized = profile?.toUpperCase();
    return normalized === 'ADMINISTRADOR' || normalized === 'GESTOR';
};

const UserMenu = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const menuRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);

    const userName = user?.nome || 'Admin Sistema';
    const userEmail = user?.email || 'admin@greenestoque.com.br';
    const userProfile = user?.perfil || 'ADMINISTRADOR';
    const avatarLetter = getInitial(userName);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
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

    const goTo = (path) => {
        setIsOpen(false);
        navigate(path);
    };

    return (
        <div className="user-menu" ref={menuRef}>
            <button
                type="button"
                className={`user-menu-trigger ${isOpen ? 'active' : ''}`}
                onClick={() => setIsOpen((current) => !current)}
                aria-haspopup="menu"
                aria-expanded={isOpen}
            >
                <span className="user-menu-avatar">{avatarLetter}</span>
                <span className="user-menu-summary">
                    <span className="user-menu-name">{userName}</span>
                    <span className="user-menu-role">{userProfile}</span>
                </span>
                <ChevronDown className="user-menu-chevron" size={16} />
            </button>

            {isOpen && (
                <div className="user-menu-dropdown" role="menu">
                    <div className="user-menu-header">
                        <span className="user-menu-avatar large">{avatarLetter}</span>
                        <div>
                            <strong>{userName}</strong>
                            <span>{userEmail}</span>
                            <em>{userProfile}</em>
                        </div>
                    </div>

                    <div className="user-menu-list">
                        <button type="button" role="menuitem" onClick={() => goTo('/perfil')}>
                            <User size={16} />
                            <span>Meu perfil</span>
                        </button>

                        <button type="button" role="menuitem" onClick={() => goTo('/configuracoes')}>
                            <Settings size={16} />
                            <span>Configurações</span>
                        </button>

                        {canSeePermissions(userProfile) && (
                            <button type="button" role="menuitem" onClick={() => goTo('/permissoes')}>
                                <ShieldCheck size={16} />
                                <span>Permissões</span>
                            </button>
                        )}

                        <button type="button" role="menuitem" className="danger" onClick={logout}>
                            <LogOut size={16} />
                            <span>Sair</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserMenu;
