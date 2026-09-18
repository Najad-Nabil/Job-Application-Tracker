import React from 'react';
import './AuthLayout.css';

const AuthLayout = ({ children, title, subtitle }) => {
    return (
        <div className="auth-container">
            <div className="auth-left">
                <div className="auth-brand">
                    <div className="logo-icon-large">JT</div>
                    <span className="logo-text-large">JobTrack</span>
                </div>
                <div className="auth-hero">
                    <h1 className="auth-hero-title">Your job search, organized.</h1>
                    <p className="auth-hero-subtitle">
                        Track every application, prepare for interviews, and manage your offers in one beautiful workspace.
                    </p>
                </div>
                <div className="auth-footer-text">
                    © {new Date().getFullYear()} JobTrack. All rights reserved.
                </div>
            </div>
            <div className="auth-right">
                <div className="auth-form-container">
                    <div className="auth-header">
                        <h2>{title}</h2>
                        {subtitle && <p>{subtitle}</p>}
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
