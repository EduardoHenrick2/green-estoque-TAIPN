import React from 'react';
import { ShieldCheck, Lock } from 'lucide-react';
import './Permissions.css';


/* Tabela estática de permissões por perfil */
const ROLES = ['ADMINISTRADOR', 'GERENTE', 'ESTOQUISTA', 'VENDEDOR'];

const RESOURCES = [
    {
        group: 'Dashboard',
        items: [
            { name: 'Visualizar resumo', perms: [true, true, true, true] },
            { name: 'Visualizar gráficos', perms: [true, true, false, false] },
        ]
    },
    {
        group: 'Produtos',
        items: [
            { name: 'Listar produtos', perms: [true, true, true, true] },
            { name: 'Criar produto', perms: [true, true, true, false] },
            { name: 'Editar produto', perms: [true, true, true, false] },
            { name: 'Inativar produto', perms: [true, true, false, false] },
        ]
    },
    {
        group: 'Movimentações',
        items: [
            { name: 'Registrar entrada', perms: [true, true, true, false] },
            { name: 'Registrar saída', perms: [true, true, true, true] },
            { name: 'Registrar retorno', perms: [true, true, true, false] },
            { name: 'Realizar ajuste', perms: [true, true, false, false] },
        ]
    },
    {
        group: 'Fornecedores',
        items: [
            { name: 'Listar fornecedores', perms: [true, true, true, false] },
            { name: 'Criar/Editar fornecedor', perms: [true, true, false, false] },
            { name: 'Excluir fornecedor', perms: [true, false, false, false] },
        ]
    },
    {
        group: 'Usuários & Permissões',
        items: [
            { name: 'Listar usuários', perms: [true, false, false, false] },
            { name: 'Criar/Editar usuário', perms: [true, false, false, false] },
            { name: 'Inativar usuário', perms: [true, false, false, false] },
            { name: 'Gerenciar permissões', perms: [true, false, false, false] },
        ]
    },
];

const RoleColors = {
    ADMINISTRADOR: 'admin',
    GERENTE: 'gerente',
    ESTOQUISTA: 'estoquista',
    VENDEDOR: 'vendedor',
};

const Permissions = () => {
    return (
        <div className="page-container">
            <div className="page-header">
                <div>
                    <h2>Permissões</h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>
                        Controle de acesso por perfil do sistema Green Estoque
                    </p>
                </div>
            </div>

            {/* Legenda de perfis */}
            <div className="card perm-roles-grid">
                {ROLES.map(role => (
                    <div key={role} className={`perm-role-card ${RoleColors[role]}`}>
                        <ShieldCheck size={22} />
                        <strong>{role}</strong>
                    </div>
                ))}
            </div>

            {/* Tabela de permissões */}
            <div className="table-container">
                <table className="data-table perm-table">
                    <thead>
                        <tr>
                            <th>Recurso / Ação</th>
                            {ROLES.map(role => (
                                <th key={role} className="text-center">
                                    <span className={`perfil-badge ${RoleColors[role]}`}>{role}</span>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {RESOURCES.map(group => (
                            <React.Fragment key={group.group}>
                                <tr className="perm-group-row">
                                    <td colSpan={ROLES.length + 1}>
                                        <span className="perm-group-label">{group.group}</span>
                                    </td>
                                </tr>
                                {group.items.map(item => (
                                    <tr key={item.name}>
                                        <td className="perm-item-name">
                                            <Lock size={13} style={{ marginRight: 8, opacity: 0.5 }} />
                                            {item.name}
                                        </td>
                                        {item.perms.map((allowed, i) => (
                                            <td key={i} className="text-center">
                                                {allowed
                                                    ? <span className="perm-check">✓</span>
                                                    : <span className="perm-deny">—</span>
                                                }
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="card perm-note">
                <ShieldCheck size={18} color="var(--accent-green-dark)" />
                <p>
                    As permissões acima são definidas pelo perfil de cada usuário.
                    Para alterar o perfil de um usuário, acesse a página <a href="/usuarios">Usuários</a>.
                </p>
            </div>
        </div>
    );
};

export default Permissions;
