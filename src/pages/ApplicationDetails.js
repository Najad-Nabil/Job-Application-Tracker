import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Edit3, Trash2, Globe, MapPin, Building, Briefcase, Calendar, Banknote } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';
import { MOCK_APPLICATIONS } from '../data/mockData';
import './ApplicationDetails.css';

const ApplicationDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const app = MOCK_APPLICATIONS.find(a => a.id === id);

    if (!app) {
        return (
            <div className="flex-center" style={{ height: '60vh', flexDirection: 'column', gap: 16 }}>
                <h2>Application not found</h2>
                <Button onClick={() => navigate('/applications')}>Back to Applications</Button>
            </div>
        );
    }

    return (
        <div className="app-details-container animate-fade-in">
            <div className="app-details-header">
                <Link to="/applications" className="back-link">
                    <ArrowLeft size={20} />
                    <span>Back to Applications</span>
                </Link>
                <div className="app-details-actions">
                    <Button variant="secondary" size="md">
                        <Edit3 size={16} /> Edit
                    </Button>
                    <Button variant="secondary" size="md" className="btn-danger">
                        <Trash2 size={16} /> Delete
                    </Button>
                </div>
            </div>

            <div className="app-hero-card">
                <div className="app-hero-logo">
                    <img src={app.companyLogo} alt={app.company} />
                </div>
                <div className="app-hero-info">
                    <div className="app-hero-title-row">
                        <h1 className="app-hero-title">{app.jobTitle}</h1>
                        <Badge variant={
                            app.status === 'OFFER' ? 'success' :
                                app.status === 'INTERVIEW' ? 'warning' :
                                    app.status === 'ASSESSMENT' ? 'info' : 'primary'
                        }>
                            {app.status}
                        </Badge>
                    </div>
                    <p className="app-hero-company">{app.company}</p>
                    <div className="app-hero-meta">
                        <span className="app-hero-meta-item"><MapPin size={16} /> {app.location}</span>
                        <span className="app-hero-meta-item"><Building size={16} /> {app.workMode}</span>
                        <span className="app-hero-meta-item"><Briefcase size={16} /> {app.jobType}</span>
                        <span className="app-hero-meta-item"><Banknote size={16} /> {app.salary}</span>
                    </div>
                </div>
            </div>

            <div className="app-details-grid">
                <div className="app-details-main gap-24">
                    <Card className="app-section">
                        <h3 className="section-title">Job Description</h3>
                        <p className="section-content text-body">{app.jobDescription || 'No description provided.'}</p>
                        {app.jobUrl && (
                            <a href={app.jobUrl} target="_blank" rel="noopener noreferrer" className="job-url-link">
                                <Globe size={16} /> View Original Posting
                            </a>
                        )}
                    </Card>

                    <Card className="app-section">
                        <h3 className="section-title">Notes</h3>
                        <div className="notes-container">
                            <p className="section-content text-body">{app.notes || 'No notes added yet.'}</p>
                        </div>
                    </Card>
                </div>

                <div className="app-details-sidebar gap-24">
                    <Card className="app-section">
                        <h3 className="section-title">Timeline</h3>
                        <div className="timeline-list">
                            <div className="timeline-item">
                                <div className="timeline-dot active"></div>
                                <div className="timeline-content">
                                    <p className="timeline-title">Applied</p>
                                    <p className="timeline-date">{new Date(app.applicationDate).toLocaleDateString()}</p>
                                </div>
                            </div>
                            <div className="timeline-item">
                                <div className="timeline-dot"></div>
                                <div className="timeline-content">
                                    <p className="timeline-title">Deadline</p>
                                    <p className="timeline-date">{new Date(app.deadline).toLocaleDateString()}</p>
                                </div>
                            </div>
                        </div>
                    </Card>

                    <Card className="app-section">
                        <h3 className="section-title">Details</h3>
                        <div className="details-list">
                            <div className="detail-row">
                                <span className="detail-label">Source</span>
                                <span className="detail-value">{app.source}</span>
                            </div>
                            <div className="detail-row">
                                <span className="detail-label">Recruiter</span>
                                <span className="detail-value">{app.recruiter || 'N/A'}</span>
                            </div>
                            <div className="detail-row">
                                <span className="detail-label">Resume Used</span>
                                <span className="detail-value text-link">{app.selectedResume || 'None'}</span>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default ApplicationDetails;
