import { CalendarDays, Mail, Pencil, ShieldAlert, ShieldCheck, User } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import './Profile.css';

const Profile = () => {
    const { user, loading } = useAuth();

    if (loading || !user) {
        return (
            <div className="loading-state">
                <div className="spinner" /> Carregando perfil...
            </div>
        );
    }

    const userName = user.nome || 'Usuário';
    const userEmail = user.email || 'Não informado';
    const userProfile = user.perfil || 'Sem perfil';
    const accountStatus = user.status || (user.ativo === false ? 'Inativa' : 'Ativa');
    const createdAt = user.criado_em
        ? new Date(user.criado_em).toLocaleDateString('pt-BR')
        : 'Não informado';
    const avatarLetter = userName.charAt(0).toUpperCase();

    return (
        <div className="page-container">
            <div className="page-header">
                <div>
                    <h2>Meu perfil</h2>
                    <p className="profile-subtitle">Dados do usuário conectado ao Green Estoque</p>
                </div>
                <button type="button" className="btn-primary">
                    <Pencil size={17} />
                    Editar perfil
                </button>
            </div>

            <div className="profile-card card">
                <div className="profile-hero">
                    <div className="profile-avatar">{avatarLetter}</div>
                    <div>
                        <h3>{userName}</h3>
                        <span>{userProfile}</span>
                    </div>
                </div>

                <div className="profile-details">
                    <div className="profile-detail-item">
                        <User size={18} />
                        <div>
                            <span>Nome</span>
                            <strong>{userName}</strong>
                        </div>
                    </div>

                    <div className="profile-detail-item">
                        <Mail size={18} />
                        <div>
                            <span>E-mail</span>
                            <strong>{userEmail}</strong>
                        </div>
                    </div>

                    <div className="profile-detail-item">
                        <ShieldCheck size={18} />
                        <div>
                            <span>Perfil</span>
                            <strong>{userProfile}</strong>
                        </div>
                    </div>

                    <div className="profile-detail-item">
                        <ShieldAlert size={18} />
                        <div>
                            <span>Status da conta</span>
                            <strong>{accountStatus}</strong>
                        </div>
                    </div>

                    <div className="profile-detail-item">
                        <CalendarDays size={18} />
                        <div>
                            <span>Data de criação</span>
                            <strong>{createdAt}</strong>
                        </div>
                    </div>
                </div>

                <div className="profile-notice">
                    <ShieldCheck size={18} />
                    <p>Alterações de permissão devem ser aprovadas pelo administrador.</p>
                </div>
            </div>
        </div>
    );
};

export default Profile;
