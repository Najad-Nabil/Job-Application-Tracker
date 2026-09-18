import React from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, LineChart, Line, Legend
} from 'recharts';
import { Card } from '../components/ui/Card';
import './Analytics.css';

const sourceData = [
    { name: 'No Data', value: 1 }, // Keep purely so Recharts pie doesn't crash on completely empty data
];

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#6366f1', '#94a3b8'];

const statusData = [
    { name: 'Saved', count: 0 },
    { name: 'Applied', count: 0 },
    { name: 'Assessment', count: 0 },
    { name: 'Interview', count: 0 },
    { name: 'Offer', count: 0 },
];

const timelineData = [
    { month: 'Jan', applications: 0, interviews: 0 },
    { month: 'Feb', applications: 0, interviews: 0 },
    { month: 'Mar', applications: 0, interviews: 0 },
    { month: 'Apr', applications: 0, interviews: 0 },
    { month: 'May', applications: 0, interviews: 0 },
    { month: 'Jun', applications: 0, interviews: 0 },
];

const Analytics = () => {
    return (
        <div className="analytics-container">
            <div className="analytics-header animate-fade-in">
                <h2>Analytics</h2>
                <p>Gain insights from your application data and conversion rates.</p>
            </div>

            <div className="analytics-grid">
                <Card className="chart-card animate-slide-up">
                    <h3 className="card-title">Applications vs Interviews</h3>
                    <div className="chart-container">
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={timelineData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: 'var(--color-text-muted)', fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--color-text-muted)', fontSize: 12 }} />
                                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: 'var(--shadow-md)' }} />
                                <Legend iconType="circle" wrapperStyle={{ fontSize: 12, paddingTop: 20 }} />
                                <Line type="monotone" dataKey="applications" name="Applications" stroke="var(--color-primary)" strokeWidth={3} dot={{ r: 4, fill: "var(--color-primary)", strokeWidth: 0 }} />
                                <Line type="monotone" dataKey="interviews" name="Interviews" stroke="var(--color-success)" strokeWidth={3} dot={{ r: 4, fill: "var(--color-success)", strokeWidth: 0 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                <Card className="chart-card animate-slide-up" style={{ animationDelay: '100ms' }}>
                    <h3 className="card-title">Application Status</h3>
                    <div className="chart-container">
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={statusData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--color-text-muted)', fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--color-text-muted)', fontSize: 12 }} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: 'var(--shadow-md)' }}
                                    cursor={{ fill: 'var(--color-bg-main)' }}
                                />
                                <Bar dataKey="count" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                <Card className="chart-card animate-slide-up" style={{ animationDelay: '200ms' }}>
                    <h3 className="card-title">Top Sources</h3>
                    <div className="chart-container chart-container-pie">
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={sourceData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={80}
                                    outerRadius={110}
                                    paddingAngle={5}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {sourceData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: 'var(--shadow-md)' }} />
                                <Legend iconType="circle" layout="vertical" verticalAlign="middle" align="right" wrapperStyle={{ fontSize: 13 }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                <Card className="funnel-metrics-card animate-slide-up" style={{ animationDelay: '300ms' }}>
                    <h3 className="card-title">Conversion Rates</h3>
                    <div className="conversion-stats">
                        <div className="conversion-item">
                            <div className="conversion-label">Application → Interview</div>
                            <div className="conversion-bar-container">
                                <div className="conversion-bar" style={{ width: '0%', backgroundColor: 'var(--color-primary)' }}></div>
                            </div>
                            <div className="conversion-value">0%</div>
                        </div>

                        <div className="conversion-item">
                            <div className="conversion-label">Interview → Offer</div>
                            <div className="conversion-bar-container">
                                <div className="conversion-bar" style={{ width: '0%', backgroundColor: 'var(--color-success)' }}></div>
                            </div>
                            <div className="conversion-value">0%</div>
                        </div>

                        <div className="conversion-item">
                            <div className="conversion-label">Application → Offer</div>
                            <div className="conversion-bar-container">
                                <div className="conversion-bar" style={{ width: '0%', backgroundColor: 'var(--color-warning)' }}></div>
                            </div>
                            <div className="conversion-value">0%</div>
                        </div>
                    </div>
                    <div className="conversion-footer">
                        <p className="conversion-insight">
                            <span className="insight-highlight">Insight:</span> Input more application data to see AI insights on your funnel conversion rate.
                        </p>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Analytics;
