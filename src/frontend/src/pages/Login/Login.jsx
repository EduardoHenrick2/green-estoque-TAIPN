import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ArrowRight,
    Check,
    Eye,
    EyeOff,
    Lock,
    Mail,
    ShieldCheck,
    User,
    UserPlus
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import logoGreenEstoque from '../../assets/logo-horizontal.png';
import './Login.css';

const Login = () => {
    const [activeTab, setActiveTab] = useState('login');
    const [loginData, setLoginData] = useState({ email: '', senha: '' });
    const [registerData, setRegisterData] = useState({
        nome: '',
        email: '',
        funcao: '',
        senha: '',
        confirmarSenha: ''
    });
    const [remember, setRemember] = useState(true);
    const [feedback, setFeedback] = useState({ type: '', message: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [showLoginPassword, setShowLoginPassword] = useState(false);
    const [showRegisterPassword, setShowRegisterPassword] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setFeedback({ type: '', message: '' });
    };

    const handleLoginSubmit = async (event) => {
        event.preventDefault();
        setFeedback({ type: '', message: '' });
        setIsLoading(true);

        try {
            await login(loginData.email.trim(), loginData.senha, remember);
            navigate('/');
        } catch (err) {
            setFeedback({ type: 'error', message: err.message });
        } finally {
            setIsLoading(false);
        }
    };

    const handleRegisterSubmit = async (event) => {
        event.preventDefault();
        setFeedback({ type: '', message: '' });

        if (registerData.senha.length < 6) {
            setFeedback({ type: 'error', message: 'A senha deve ter pelo menos 6 caracteres.' });
            return;
        }

        if (registerData.senha !== registerData.confirmarSenha) {
            setFeedback({ type: 'error', message: 'As senhas informadas não conferem.' });
            return;
        }

        setFeedback({
            type: 'info',
            message: 'Solicitação enviada para aprovação do administrador.'
        });
    };

    const showPasswordButton = (isVisible, onClick, label) => (
        <button
            type="button"
            className="auth-password-toggle"
            onClick={onClick}
            aria-label={label}
            title={label}
        >
            {isVisible ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
    );

    return (
        <div className="auth-page">
            <section className="auth-showcase" aria-label="Green Estoque">
                <div className="auth-brand">
                    <img src={logoGreenEstoque} alt="Green Estoque by Green Volt" className="auth-logo" />
                    <span className="brand-rule" />
                    <h1>Gestão inteligente de estoque fotovoltaico</h1>
                    <p>
                        Controle completo de módulos, inversores e materiais fotovoltaicos com eficiência e segurança.
                    </p>
                </div>

                <div className="showcase-scene" aria-hidden="true">
                    <div className="scene-horizon">
                        <span className="scene-hill hill-back" />
                        <span className="scene-hill hill-front" />
                        <span className="wind-turbine turbine-one" />
                        <span className="wind-turbine turbine-two" />
                    </div>

                    <div className="solar-field">
                        {Array.from({ length: 10 }).map((_, index) => (
                            <span key={index} />
                        ))}
                    </div>

                    <div className="pallet-stack">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <span key={index} />
                        ))}
                    </div>

                    <div className="inventory-screen">
                        <div className="screen-top" />
                        <div className="screen-body">
                            <div className="screen-chart">
                                <span />
                            </div>
                            <div className="screen-rows">
                                <i />
                                <i />
                                <i />
                                <i />
                            </div>
                        </div>
                        <div className="screen-footer">
                            <span />
                            <span />
                            <span />
                        </div>
                    </div>

                    <div className="warehouse-rack">
                        {Array.from({ length: 10 }).map((_, index) => (
                            <span key={index} />
                        ))}
                    </div>

                    <div className="side-crates">
                        <span />
                        <span />
                        <span />
                    </div>
                </div>
            </section>

            <main className="auth-panel-wrap">
                <section className="auth-card" aria-label="Acesso ao Green Estoque">
                    <div className="auth-tabs" role="tablist" aria-label="Alternar formulário">
                        <button
                            type="button"
                            role="tab"
                            aria-selected={activeTab === 'login'}
                            className={activeTab === 'login' ? 'active' : ''}
                            onClick={() => handleTabChange('login')}
                        >
                            Entrar
                        </button>
                        <button
                            type="button"
                            role="tab"
                            aria-selected={activeTab === 'register'}
                            className={activeTab === 'register' ? 'active' : ''}
                            onClick={() => handleTabChange('register')}
                        >
                            Registrar
                        </button>
                    </div>

                    <div className="auth-form-area">
                        {feedback.message && (
                            <div className={`auth-message ${feedback.type}`} role="alert">
                                {feedback.message}
                            </div>
                        )}

                        {activeTab === 'login' ? (
                            <form className="auth-form" onSubmit={handleLoginSubmit}>
                                <div className="auth-field">
                                    <label htmlFor="login-email">E-mail</label>
                                    <div className="auth-input-shell">
                                        <Mail size={21} />
                                        <input
                                            type="email"
                                            id="login-email"
                                            placeholder="seu@email.com"
                                            value={loginData.email}
                                            onChange={(event) => setLoginData({ ...loginData, email: event.target.value })}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="auth-field">
                                    <label htmlFor="login-senha">Senha</label>
                                    <div className="auth-input-shell">
                                        <Lock size={21} />
                                        <input
                                            type={showLoginPassword ? 'text' : 'password'}
                                            id="login-senha"
                                            placeholder="Digite sua senha"
                                            value={loginData.senha}
                                            onChange={(event) => setLoginData({ ...loginData, senha: event.target.value })}
                                            required
                                        />
                                        {showPasswordButton(
                                            showLoginPassword,
                                            () => setShowLoginPassword(!showLoginPassword),
                                            showLoginPassword ? 'Ocultar senha' : 'Mostrar senha'
                                        )}
                                    </div>
                                </div>

                                <div className="auth-options">
                                    <label className="auth-checkbox">
                                        <input
                                            type="checkbox"
                                            checked={remember}
                                            onChange={(event) => setRemember(event.target.checked)}
                                        />
                                        <span className="checkmark">
                                            <Check size={14} />
                                        </span>
                                        <span>Lembrar de mim</span>
                                    </label>

                                    <button
                                        type="button"
                                        className="auth-link"
                                        onClick={() =>
                                            setFeedback({
                                                type: 'info',
                                                message: 'A recuperação de senha deve ser solicitada ao administrador.'
                                            })
                                        }
                                    >
                                        Esqueci minha senha
                                    </button>
                                </div>

                                <button type="submit" className="auth-submit" disabled={isLoading}>
                                    <span>{isLoading ? 'Entrando...' : 'Entrar'}</span>
                                    <ArrowRight size={24} />
                                </button>

                                <div className="auth-divider">
                                    <span>ou</span>
                                </div>

                                <div className="auth-switch">
                                    <p>Ainda não tem acesso?</p>
                                    <button type="button" onClick={() => handleTabChange('register')}>
                                        <span>Solicitar acesso</span>
                                        <UserPlus size={24} />
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <form className="auth-form request-form" onSubmit={handleRegisterSubmit}>
                                <div className="auth-request-note">
                                    Sua solicitação será enviada para aprovação do administrador.
                                </div>

                                <div className="auth-field">
                                    <label htmlFor="register-nome">Nome completo</label>
                                    <div className="auth-input-shell">
                                        <User size={21} />
                                        <input
                                            type="text"
                                            id="register-nome"
                                            placeholder="Seu nome completo"
                                            value={registerData.nome}
                                            onChange={(event) =>
                                                setRegisterData({ ...registerData, nome: event.target.value })
                                            }
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="auth-field">
                                    <label htmlFor="register-email">E-mail</label>
                                    <div className="auth-input-shell">
                                        <Mail size={21} />
                                        <input
                                            type="email"
                                            id="register-email"
                                            placeholder="seu@email.com"
                                            value={registerData.email}
                                            onChange={(event) =>
                                                setRegisterData({ ...registerData, email: event.target.value })
                                            }
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="auth-field">
                                    <label htmlFor="register-funcao">Função desejada</label>
                                    <div className="auth-input-shell">
                                        <UserPlus size={21} />
                                        <select
                                            id="register-funcao"
                                            value={registerData.funcao}
                                            onChange={(event) =>
                                                setRegisterData({ ...registerData, funcao: event.target.value })
                                            }
                                            required
                                        >
                                            <option value="" disabled>Selecione uma função</option>
                                            <option value="Operacional">Operacional</option>
                                            <option value="Gestor">Gestor</option>
                                            <option value="Administrador">Administrador</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="auth-field">
                                    <label htmlFor="register-senha">Senha</label>
                                    <div className="auth-input-shell">
                                        <Lock size={21} />
                                        <input
                                            type={showRegisterPassword ? 'text' : 'password'}
                                            id="register-senha"
                                            placeholder="Crie uma senha"
                                            value={registerData.senha}
                                            onChange={(event) =>
                                                setRegisterData({ ...registerData, senha: event.target.value })
                                            }
                                            required
                                        />
                                        {showPasswordButton(
                                            showRegisterPassword,
                                            () => setShowRegisterPassword(!showRegisterPassword),
                                            showRegisterPassword ? 'Ocultar senha' : 'Mostrar senha'
                                        )}
                                    </div>
                                </div>

                                <div className="auth-field">
                                    <label htmlFor="register-confirmar">Confirmar senha</label>
                                    <div className="auth-input-shell">
                                        <Lock size={21} />
                                        <input
                                            type={showRegisterPassword ? 'text' : 'password'}
                                            id="register-confirmar"
                                            placeholder="Repita sua senha"
                                            value={registerData.confirmarSenha}
                                            onChange={(event) =>
                                                setRegisterData({ ...registerData, confirmarSenha: event.target.value })
                                            }
                                            required
                                        />
                                    </div>
                                </div>

                                <button type="submit" className="auth-submit" disabled={isLoading}>
                                    <span>Enviar solicitação</span>
                                    <ArrowRight size={24} />
                                </button>

                                <div className="auth-switch compact">
                                    <p>Já possui acesso?</p>
                                    <button type="button" onClick={() => handleTabChange('login')}>
                                        <span>Entrar</span>
                                        <ArrowRight size={22} />
                                    </button>
                                </div>
                            </form>
                        )}

                        <div className="auth-admin-note">
                            <span>
                                <ShieldCheck size={20} />
                            </span>
                            <p>O acesso ao sistema é gerenciado pelo administrador.</p>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Login;
