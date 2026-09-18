import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Plus, LayoutGrid, List as ListIcon, MoreVertical, Calendar } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { MOCK_APPLICATIONS } from '../data/mockData';
import './Applications.css';

const KANBAN_STAGES = ['SAVED', 'APPLIED', 'ASSESSMENT', 'INTERVIEW', 'OFFER'];

const Applications = () => {
    const [view, setView] = useState('kanban');
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const filteredApps = MOCK_APPLICATIONS.filter(app =>
        app.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.jobTitle.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const renderKanbanBoard = () => {
        return (
            <div className="kanban-board">
                {KANBAN_STAGES.map(stage => {
                    const stageApps = filteredApps.filter(app => app.status === stage);
                    return (
                        <div key={stage} className="kanban-column">
                            <div className="kanban-column-header">
                                <h3 className="kanban-stage-title">{stage}</h3>
                                <span className="kanban-count">{stageApps.length}</span>
                            </div>
                            <div className="kanban-cards">
                                {stageApps.map(app => (
                                    <div
                                        key={app.id}
                                        className="kanban-card animate-slide-up"
                                        onClick={() => navigate(`/applications/${app.id}`)}
                                    >
                                        <div className="kanban-card-top">
                                            <img src={app.companyLogo} alt={app.company} className="k-card-logo" />
                                            <button className="icon-btn-small" onClick={(e) => { e.stopPropagation(); }}>
                                                <MoreVertical size={16} />
                                            </button>
                                        </div>
                                        <h4 className="k-card-role">{app.jobTitle}</h4>
                                        <p className="k-card-company">{app.company}</p>

                                        <div className="k-card-tags">
                                            <span className="k-card-tag">{app.location}</span>
                                            <span className="k-card-tag">{app.workMode}</span>
                                        </div>

                                        <div className="k-card-footer">
                                            <div className="k-card-date">
                                                <Calendar size={14} />
                                                <span>{new Date(app.deadline).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };

    const renderTableView = () => {
        return (
            <div className="table-container animate-fade-in">
                <table className="apps-table">
                    <thead>
                        <tr>
                            <th>Company</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Date Applied</th>
                            <th>Deadline</th>
                            <th>Location</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredApps.map(app => (
                            <tr key={app.id} onClick={() => navigate(`/applications/${app.id}`)}>
                                <td>
                                    <div className="t-company">
                                        <img src={app.companyLogo} alt={app.company} className="t-logo" />
                                        <span>{app.company}</span>
                                    </div>
                                </td>
                                <td className="t-role">{app.jobTitle}</td>
                                <td>
                                    <Badge variant={
                                        app.status === 'OFFER' ? 'success' :
                                            app.status === 'INTERVIEW' ? 'warning' :
                                                app.status === 'ASSESSMENT' ? 'info' : 'primary'
                                    }>
                                        {app.status}
                                    </Badge>
                                </td>
                                <td className="t-light">{new Date(app.applicationDate).toLocaleDateString()}</td>
                                <td className="t-light">{new Date(app.deadline).toLocaleDateString()}</td>
                                <td className="t-light">{app.location} ({app.workMode})</td>
                                <td>
                                    <button className="icon-btn-small" onClick={(e) => { e.stopPropagation(); }}>
                                        <MoreVertical size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    return (
        <div className="applications-container">
            <div className="applications-header">
                <div>
                    <h2 className="page-title-main">Applications</h2>
                    <p className="page-subtitle">Track every opportunity in one place.</p>
                </div>
                <Button icon={<Plus size={18} />}>
                    <Plus size={18} />
                    Add Application
                </Button>
            </div>

            <div className="applications-controls">
                <div className="controls-left">
                    <div className="search-box">
                        <Search size={18} className="search-icon-inline" />
                        <input
                            type="text"
                            placeholder="Search firm, role..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="search-input-inline"
                        />
                    </div>
                    <Button variant="secondary" size="md">
                        <Filter size={16} /> Filter
                    </Button>
                </div>

                <div className="view-toggle">
                    <button
                        className={`toggle-btn ${view === 'kanban' ? 'active' : ''}`}
                        onClick={() => setView('kanban')}
                    >
                        <LayoutGrid size={18} />
                    </button>
                    <button
                        className={`toggle-btn ${view === 'table' ? 'active' : ''}`}
                        onClick={() => setView('table')}
                    >
                        <ListIcon size={18} />
                    </button>
                </div>
            </div>

            <div className="applications-content">
                {view === 'kanban' ? renderKanbanBoard() : renderTableView()}
            </div>
        </div>
    );
};

export default Applications;
