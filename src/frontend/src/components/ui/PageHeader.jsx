import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PageHeader = ({ title, showBack = false, backPath = '/', actions }) => {
    const navigate = useNavigate();

    return (
        <div className="page-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                {showBack && (
                    <button 
                        type="button"
                        className="icon-btn" 
                        onClick={() => navigate(backPath)} 
                        style={{ background: 'var(--bg-card)', color: 'var(--text-main)', border: '1px solid var(--border-color)' }}
                        title="Voltar"
                    >
                        <ArrowLeft size={20} />
                    </button>
                )}
                <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-main)' }}>{title}</h2>
            </div>
            {actions && (
                <div style={{ display: 'flex', gap: '12px' }}>
                    {actions}
                </div>
            )}
        </div>
    );
};

export default PageHeader;
