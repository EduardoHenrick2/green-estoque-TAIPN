import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { movementService } from '../../services/movementService';
import { Plus, ArrowDownRight, ArrowUpRight, RotateCcw, Wrench } from 'lucide-react';
import '../Categories/Categories.css'; // Usando base CSS das tabelas

const Movements = () => {
    const navigate = useNavigate();
    const [movements, setMovements] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadMovements();
    }, []);

    const loadMovements = async () => {
        try {
            const data = await movementService.getAll();
            setMovements(data);
        } catch (error) {
            console.error('Erro ao carregar movimentações:', error);
        } finally {
            setLoading(false);
        }
    };

    const getTypeIcon = (tipo) => {
        switch (tipo) {
            case 'ENTRADA': return <ArrowDownRight size={16} color="#4ade80" />;
            case 'SAIDA': return <ArrowUpRight size={16} color="#ef4444" />;
            case 'RETORNO': return <RotateCcw size={16} color="#3b82f6" />;
            case 'AJUSTE': return <Wrench size={16} color="#facc15" />;
            default: return null;
        }
    };

    return (
        <div className="page-container">
            <div className="page-header">
                <h2>Movimentações de Estoque</h2>
                <button className="btn-primary" onClick={() => navigate('/movimentacoes/nova')}>
                    <Plus size={18} />
                    Nova Movimentação
                </button>
            </div>

            <div className="table-container">
                {loading ? (
                    <div className="loading-state">Carregando histórico...</div>
                ) : (
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Data</th>
                                <th>Tipo Operação</th>
                                <th>Status</th>
                                <th>Usuário</th>
                                <th className="text-right">Valor Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {movements.map(mov => (
                                <tr key={mov.id}>
                                    <td style={{ color: '#9ca3af' }}>#{String(mov.id).padStart(4, '0')}</td>
                                    <td>{new Date(mov.data_movimentacao).toLocaleDateString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600' }}>
                                            {getTypeIcon(mov.tipo)}
                                            {mov.tipo}
                                        </div>
                                    </td>
                                    <td>
                                        <span className={`stock-badge ${mov.status.toLowerCase().replace('_', '-')}`}>
                                            {mov.status}
                                        </span>
                                    </td>
                                    <td>{mov.usuario || 'Sistema'}</td>
                                    <td className="text-right font-mono">
                                        {Number(mov.valor_total || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                    </td>
                                </tr>
                            ))}
                            {movements.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="empty-state">Nenhuma movimentação registrada.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default Movements;
