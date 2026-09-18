import React from 'react';
import { Building2, Users } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { MOCK_COMPANIES } from '../data/mockData';
import './Companies.css';

const Companies = () => {
    return (
        <div className="companies-container animate-fade-in">
            <div className="companies-header">
                <div>
                    <h2 className="page-title-main">Companies</h2>
                    <p className="page-subtitle">Track your interactions across different organizations.</p>
                </div>
            </div>

            <div className="companies-grid">
                {MOCK_COMPANIES.map(company => (
                    <Card key={company.id} className="company-card animate-slide-up">
                        <div className="company-card-header">
                            <img src={company.logo} alt={company.name} className="company-logo-large" />
                            <h3 className="company-name">{company.name}</h3>
                            <p className="company-locations">{company.locations.join(' • ')}</p>
                        </div>

                        <div className="company-stats">
                            <div className="c-stat">
                                <span className="c-stat-label">Applications</span>
                                <span className="c-stat-value">{company.applicationsCount}</span>
                            </div>
                            <div className="c-stat">
                                <span className="c-stat-label">Interviews</span>
                                <span className="c-stat-value">{company.interviewsCount}</span>
                            </div>
                            <div className="c-stat">
                                <span className="c-stat-label">Offers</span>
                                <span className="c-stat-value c-stat-offer">{company.offersCount}</span>
                            </div>
                        </div>

                        <div className="company-card-footer">
                            <button className="text-btn flex-center" style={{ gap: 6 }}>
                                <Users size={16} /> View Contacts
                            </button>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Companies;
