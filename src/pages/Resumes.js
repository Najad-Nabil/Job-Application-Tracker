import React from 'react';
import { FileText, Download, Clock } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { MOCK_RESUMES } from '../data/mockData';
import './Resumes.css';

const Resumes = () => {
    return (
        <div className="resumes-container animate-fade-in">
            <div className="resumes-header">
                <div>
                    <h2 className="page-title-main">Resumes</h2>
                    <p className="page-subtitle">Manage and track your tailored resume versions.</p>
                </div>
            </div>

            <div className="resumes-grid">
                {MOCK_RESUMES.map(resume => (
                    <Card key={resume.id} className="resume-card animate-slide-up">
                        <div className="resume-card-top">
                            <div className="resume-icon-wrapper">
                                <FileText size={24} />
                            </div>
                            <Badge variant="neutral">v{resume.version}</Badge>
                        </div>

                        <h3 className="resume-name">{resume.name}</h3>
                        <p className="resume-target">{resume.targetRole}</p>

                        <div className="resume-meta">
                            <span className="r-meta-item">
                                <Clock size={14} /> Updated {new Date(resume.lastUpdated).toLocaleDateString()}
                            </span>
                        </div>

                        <div className="resume-footer">
                            <div className="r-usage">
                                <span className="r-usage-count">{resume.applicationsCount}</span>
                                <span className="r-usage-label">Applications</span>
                            </div>
                            <button className="icon-btn-small" title="Download">
                                <Download size={18} />
                            </button>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Resumes;
