import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { Moon, Sun, Monitor, Info, Globe } from 'lucide-react';
import './Settings.css';


const Settings = () => {
    const { theme, toggleTheme } = useTheme();
    const apiUrl = import.meta.env.VITE_API_URL || '/api';

    return (
        <div className="page-container">
            <div className="page-header">
                <h2>Configurações</h2>
            </div>

            {/* Seção de Aparência */}
            <div className="settings-section card">
                <div className="settings-section-title">
                    <Monitor size={18} />
                    <h3>Aparência</h3>
                </div>

                <div className="setting-row">
                    <div className="setting-info">
                        <strong>Tema da interface</strong>
                        <p>Escolha entre o modo claro (padrão) e o modo escuro.</p>
                    </div>
                    <div className="theme-toggle-group">
                        <button
                            className={`theme-option ${theme === 'light' ? 'active' : ''}`}
                            onClick={() => theme !== 'light' && toggleTheme()}
                        >
                            <Sun size={18} />
                            <span>Claro</span>
                        </button>
                        <button
                            className={`theme-option ${theme === 'dark' ? 'active' : ''}`}
                            onClick={() => theme !== 'dark' && toggleTheme()}
                        >
                            <Moon size={18} />
                            <span>Escuro</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Seção de Informações do Sistema */}
            <div className="settings-section card">
                <div className="settings-section-title">
                    <Info size={18} />
                    <h3>Informações do sistema</h3>
                </div>

                <div className="info-grid">
                    <div className="info-item">
                        <span className="info-label">Sistema</span>
                        <span className="info-value">Green Estoque</span>
                    </div>
                    <div className="info-item">
                        <span className="info-label">Empresa</span>
                        <span className="info-value">Green Volt</span>
                    </div>
                    <div className="info-item">
                        <span className="info-label">Versão</span>
                        <span className="info-value">1.0.0</span>
                    </div>
                    <div className="info-item">
                        <span className="info-label">Segmento</span>
                        <span className="info-value">Energia Fotovoltaica</span>
                    </div>
                    <div className="info-item">
                        <span className="info-label">Backend</span>
                        <span className="info-value">Node.js + Express + MySQL</span>
                    </div>
                    <div className="info-item">
                        <span className="info-label">Frontend</span>
                        <span className="info-value">React + Vite + CSS Vanilla</span>
                    </div>
                </div>
            </div>

            {/* Seção de API */}
            <div className="settings-section card">
                <div className="settings-section-title">
                    <Globe size={18} />
                    <h3>Conexão com a API</h3>
                </div>
                <div className="setting-row">
                    <div className="setting-info">
                        <strong>URL da API</strong>
                        <p>Endereço base do backend configurado no Axios.</p>
                    </div>
                    <code className="api-url-badge">{apiUrl}</code>
                </div>
            </div>
        </div>
    );
};

export default Settings;
