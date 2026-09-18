import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    Briefcase,
    Calendar,
    Building2,
    FileText,
    BarChart3,
    Settings,
    LogOut
} from 'lucide-react';
import { useAuth } from '../auth/AuthContext';
import './Sidebar.css';

const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Applications', path: '/applications', icon: Briefcase },
    { name: 'Interviews', path: '/interviews', icon: Calendar },
    { name: 'Companies', path: '/companies', icon: Building2 },
    { name: 'Resumes', path: '/resumes', icon: FileText },
    { name: 'Analytics', path: '/analytics', icon: BarChart3 },
];

const Sidebar = () => {
    const { user, logout } = useAuth();

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <div className="logo-container">
                    <div className="logo-icon">JT</div>
                    <span className="logo-text">JobTrack</span>
                </div>
            </div>

            <div className="sidebar-nav-container">
                <nav className="sidebar-nav">
                    <ul className="nav-list">
                        {navItems.map((item) => (
                            <li key={item.name} className="nav-item">
                                <NavLink
                                    to={item.path}
                                    className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                                >
                                    <item.icon size={20} className="nav-icon" />
                                    <span>{item.name}</span>
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>

            <div className="sidebar-footer">
                <ul className="nav-list">
                    <li className="nav-item">
                        <NavLink to="/settings" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                            <Settings size={20} className="nav-icon" />
                            <span>Settings</span>
                        </NavLink>
                    </li>
                </ul>

                <div className="user-profile">
                    <div className="user-info">
                        <img src={user?.avatar} alt={user?.name} className="user-avatar" />
                        <div className="user-details">
                            <span className="user-name">{user?.name}</span>
                        </div>
                    </div>
                    <button className="logout-btn" onClick={logout} title="Logout">
                        <LogOut size={18} />
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
