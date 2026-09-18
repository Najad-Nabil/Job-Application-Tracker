import React from 'react';
import { Calendar as CalendarIcon, Clock, Video, FileText } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { MOCK_INTERVIEWS } from '../data/mockData';
import './Interviews.css';

const Interviews = () => {
    return (
        <div className="interviews-container animate-fade-in">
            <div className="interviews-header">
                <div>
                    <h2 className="page-title-main">Interviews</h2>
                    <p className="page-subtitle">Manage your upcoming and past interviews.</p>
                </div>
                <Button>
                    <CalendarIcon size={18} /> Schedule Interview
                </Button>
            </div>

            <div className="interviews-grid">
                <div className="upcoming-section">
                    <h3 className="section-title">Upcoming</h3>
                    <div className="upcoming-list">
                        {MOCK_INTERVIEWS.map(interview => (
                            <Card key={interview.id} className="interview-detailed-card animate-slide-up">
                                <div className="id-card-left">
                                    <div className="id-calendar-box">
                                        <span className="id-month">{new Date(interview.date).toLocaleString('default', { month: 'short' })}</span>
                                        <span className="id-day">{new Date(interview.date).getDate()}</span>
                                    </div>
                                </div>
                                <div className="id-card-main">
                                    <div className="id-card-header">
                                        <h4 className="id-role">{interview.role}</h4>
                                        <Badge variant="primary">{interview.type}</Badge>
                                    </div>
                                    <p className="id-company">{interview.company}</p>

                                    <div className="id-meta">
                                        <span className="id-meta-item"><Clock size={16} /> {interview.time}</span>
                                        <a href={interview.meetingLink} target="_blank" rel="noreferrer" className="id-meta-item link">
                                            <Video size={16} /> Join Meeting
                                        </a>
                                    </div>

                                    <div className="id-notes">
                                        <FileText size={16} /> <span>{interview.preparationNotes}</span>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Interviews;
