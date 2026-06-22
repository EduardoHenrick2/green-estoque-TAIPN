import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import NotificationDropdown from '../NotificationDropdown/NotificationDropdown';
import UserMenu from '../UserMenu/UserMenu';
import './Header.css';

const Header = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState('');

    const handleSearchKeyDown = (e) => {
        if (e.key === 'Enter' && search.trim()) {
            navigate(`/produtos?search=${encodeURIComponent(search.trim())}`);
            setSearch('');
        }
    };

    return (
        <header className="header">
            <div className="header-search">
                <Search size={16} className="search-icon" />
                <input
                    type="text"
                    placeholder="Buscar produtos... (Enter para pesquisar)"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={handleSearchKeyDown}
                />
            </div>

            <div className="header-actions">
                <NotificationDropdown />
                <UserMenu />
            </div>
        </header>
    );
};

export default Header;
