import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Search, Bell } from 'lucide-react';
import { useAuth } from '../auth/AuthContext';
import './Navbar.css';

const Navbar = () => {
    const { user } = useAuth();
    const location = useLocation();

    const getPageTitle = (pathname) => {
        const path = pathname.split('/')[1];
        if (!path) return 'Dashboard';
        return path.charAt(0).toUpperCase() + path.slice(1);
    };

    return (
        <header className="navbar">
            <div className="navbar-left">
                <h1 className="page-title">{getPageTitle(location.pathname)}</h1>
            </div>

            <div className="navbar-right">
                <div className="search-container">
                    <Search size={18} className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search applications..."
                        className="search-input"
                    />
                </div>

                <button className="icon-btn notification-btn">
                    <Bell size={20} />
                    <span className="notification-badge"></span>
                </button>

                <Link to="/settings" className="navbar-avatar-container" title="Settings">
                    <img src={user?.avatar} alt={user?.name} className="navbar-avatar" />
                </Link>
            </div>
        </header>
    );
};

export default Navbar;
