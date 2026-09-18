import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import './MainLayout.css';

const MainLayout = () => {
    return (
        <div className="layout-container">
            <Sidebar />
            <div className="layout-content">
                <Navbar />
                <main className="layout-main">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default MainLayout;
