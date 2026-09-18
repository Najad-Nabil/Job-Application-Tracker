import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Briefcase, Calendar, CheckCircle2, Navigation } from 'lucide-react';
import { useAuth } from '../auth/AuthContext';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { MOCK_APPLICATIONS, MOCK_INTERVIEWS } from '../data/mockData';
import './Dashboard.css';

const activityData = [
    { name: 'Mon', applications: 0 },
    { name: 'Tue', applications: 0 },
    { name: 'Wed', applications: 0 },
    { name: 'Thu', applications: 0 },
    { name: 'Fri', applications: 0 },
    { name: 'Sat', applications: 0 },
    { name: 'Sun', applications: 0 },
];

const StatCard = ({ title, value, icon: Icon, trend }) => (
    <Card className="stat-card animate-slide-up">
        <div className="stat-header">
            <span className="stat-title">{title}</span>
            <div className="stat-icon-wrapper">
                <Icon size={20} className="stat-icon" />
            </div>
        </div>
        <div className="stat-content">
            <h3 className="stat-value">{value}</h3>
            {trend && (
                <span className={`stat-trend ${trend > 0 ? 'positive' : 'neutral'}`}>
                    {trend > 0 ? '+' : ''}{trend}% from last week
                </span>
            )}
        </div>
    </Card>
);

const Dashboard = () => {
    const { user } = useAuth();

    const totalApps = MOCK_APPLICATIONS.length;
    const activeApps = MOCK_APPLICATIONS.filter(a => ['APPLIED', 'ASSESSMENT', 'INTERVIEW'].includes(a.status)).length;
    const totalInterviews = MOCK_INTERVIEWS.length;
    const totalOffers = MOCK_APPLICATIONS.filter(a => a.status === 'OFFER').length;

    const recentApps = [...MOCK_APPLICATIONS].sort((a, b) => new Date(b.applicationDate) - new Date(a.applicationDate)).slice(0, 3);
    const upcomingInterviews = [...MOCK_INTERVIEWS].sort((a, b) => new Date(a.date) - new Date(b.date)).slice(0, 3);

    return (
        <div className="dashboard-container">
            <div className="dashboard-header animate-fade-in">
                <h2>Good morning, {user?.name.split(' ')[0] || 'User'}</h2>
                <p>Here's what's happening with your job search today.</p>
            </div>

            <div className="stats-grid">
                <StatCard title="Total Applications" value={totalApps} icon={Briefcase} trend={12} />
                <StatCard title="Active Applications" value={activeApps} icon={Navigation} trend={5} />
                <StatCard title="Interviews" value={totalInterviews} icon={Calendar} trend={0} />
                <StatCard title="Offers" value={totalOffers} icon={CheckCircle2} />
            </div>

            <div className="dashboard-main-grid">
                <div className="dashboard-col-large gap-24">
                    <Card className="chart-card animate-slide-up" style={{ animationDelay: '100ms' }}>
                        <h3 className="card-title">Application Activity</h3>
                        <div className="chart-container">
                            <ResponsiveContainer width="100%" height={300}>
                                <AreaChart data={activityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--color-text-muted)', fontSize: 12 }} dy={10} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--color-text-muted)', fontSize: 12 }} />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '8px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-md)' }}
                                    />
                                    <Area type="monotone" dataKey="applications" stroke="var(--color-primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorApps)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>

                    <Card className="recent-apps-card animate-slide-up" style={{ animationDelay: '200ms' }}>
                        <div className="flex-between" style={{ marginBottom: 20 }}>
                            <h3 className="card-title">Recent Applications</h3>
                            <button className="text-btn">View all</button>
                        </div>
                        <div className="recent-apps-list">
                            {recentApps.map(app => (
                                <div key={app.id} className="recent-app-item">
                                    <div className="recent-app-info">
                                        <img src={app.companyLogo} alt={app.company} className="app-company-logo" />
                                        <div>
                                            <h4 className="app-job-title">{app.jobTitle}</h4>
                                            <p className="app-company-name">{app.company} • {app.location}</p>
                                        </div>
                                    </div>
                                    <Badge variant={
                                        app.status === 'OFFER' ? 'success' :
                                            app.status === 'INTERVIEW' ? 'warning' :
                                                app.status === 'ASSESSMENT' ? 'info' : 'primary'
                                    }>
                                        {app.status}
                                    </Badge>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                <div className="dashboard-col-small gap-24">
                    <Card className="interviews-card animate-slide-up" style={{ animationDelay: '300ms' }}>
                        <h3 className="card-title" style={{ marginBottom: 20 }}>Upcoming Interviews</h3>
                        {upcomingInterviews.length > 0 ? (
                            <div className="interviews-list">
                                {upcomingInterviews.map((interview, i) => (
                                    <div key={interview.id} className="interview-item">
                                        <div className="interview-date-box">
                                            <span className="interview-month">{new Date(interview.date).toLocaleString('default', { month: 'short' })}</span>
                                            <span className="interview-day">{new Date(interview.date).getDate()}</span>
                                        </div>
                                        <div className="interview-details">
                                            <h4 className="interview-role">{interview.role}</h4>
                                            <p className="interview-company">{interview.company}</p>
                                            <span className="interview-time">{interview.time} • {interview.type}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="empty-state">No upcoming interviews</div>
                        )}
                    </Card>

                    <Card className="funnel-card animate-slide-up" style={{ animationDelay: '400ms' }}>
                        <h3 className="card-title" style={{ marginBottom: 20 }}>Pipeline</h3>
                        <div className="pipeline-stats">
                            <div className="pipeline-stat">
                                <span className="pipeline-label">Applied</span>
                                <span className="pipeline-value">{totalApps}</span>
                            </div>
                            <div className="pipeline-divider"></div>
                            <div className="pipeline-stat">
                                <span className="pipeline-label">Interviewing</span>
                                <span className="pipeline-value">{activeApps - MOCK_APPLICATIONS.filter(a => a.status === 'APPLIED').length}</span>
                            </div>
                            <div className="pipeline-divider"></div>
                            <div className="pipeline-stat">
                                <span className="pipeline-label">Offers</span>
                                <span className="pipeline-value">{totalOffers}</span>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
