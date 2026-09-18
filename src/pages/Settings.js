import React, { useState } from 'react';
import { User, Bell, Shield, Palette, Moon, Sun, Monitor, Check, Globe, Lock, Eye, EyeOff, Download, LogOut } from 'lucide-react';
import { useAuth } from '../auth/AuthContext';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import './Settings.css';

const TABS = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy & Security', icon: Shield },
];

const ToggleSwitch = ({ checked, onChange, label, description }) => (
    <div className="toggle-row">
        <div className="toggle-info">
            <span className="toggle-label">{label}</span>
            {description && <span className="toggle-desc">{description}</span>}
        </div>
        <button
            className={`toggle-switch ${checked ? 'active' : ''}`}
            onClick={() => onChange(!checked)}
            role="switch"
            aria-checked={checked}
        >
            <span className="toggle-thumb" />
        </button>
    </div>
);

/* ──────────────── Profile Tab ──────────────── */
const ProfileTab = ({ user }) => (
    <>
        <Card className="settings-card">
            <h3 className="settings-card-title">Profile Information</h3>
            <p className="settings-card-desc">Update your photo and personal details.</p>

            <div className="settings-form-group profile-photo-group">
                <div className="profile-photo-container">
                    <img src={user?.avatar} alt={user?.name} className="profile-photo-large" />
                    <div className="photo-actions">
                        <Button variant="secondary" size="sm">Change photo</Button>
                        <Button variant="ghost" size="sm" className="text-danger">Remove</Button>
                    </div>
                </div>
            </div>

            <div className="settings-form-grid">
                <Input label="Full name" defaultValue={user?.name} />
                <Input label="Email address" defaultValue={user?.email} type="email" />
                <Input label="Phone number" placeholder="+1 (555) 000-0000" type="tel" />
                <Input label="Location" placeholder="San Francisco, CA" />
            </div>

            <div className="settings-divider"></div>

            <div className="settings-actions">
                <Button>Save Changes</Button>
            </div>
        </Card>

        <Card className="settings-card">
            <h3 className="settings-card-title">Danger Zone</h3>
            <p className="settings-card-desc">Irreversible account actions.</p>

            <div className="danger-zone-item">
                <div>
                    <h4>Delete account</h4>
                    <p>Permanently delete your account and all your data.</p>
                </div>
                <Button variant="secondary" className="btn-danger">Delete account</Button>
            </div>
        </Card>
    </>
);

/* ──────────────── Appearance Tab ──────────────── */
const AppearanceTab = () => {
    const [theme, setTheme] = useState('light');
    const [accentColor, setAccentColor] = useState('#3b82f6');
    const [fontSize, setFontSize] = useState('medium');
    const [sidebarCompact, setSidebarCompact] = useState(false);

    const themes = [
        { id: 'light', label: 'Light', icon: Sun },
        { id: 'dark', label: 'Dark', icon: Moon },
        { id: 'system', label: 'System', icon: Monitor },
    ];

    const accentColors = [
        { color: '#3b82f6', name: 'Blue' },
        { color: '#8b5cf6', name: 'Purple' },
        { color: '#10b981', name: 'Green' },
        { color: '#f59e0b', name: 'Amber' },
        { color: '#ef4444', name: 'Red' },
        { color: '#ec4899', name: 'Pink' },
    ];

    const fontSizes = [
        { id: 'small', label: 'Small' },
        { id: 'medium', label: 'Medium' },
        { id: 'large', label: 'Large' },
    ];

    return (
        <>
            <Card className="settings-card">
                <h3 className="settings-card-title">Theme</h3>
                <p className="settings-card-desc">Choose how JobTrack looks to you.</p>

                <div className="theme-selector">
                    {themes.map(t => (
                        <button
                            key={t.id}
                            className={`theme-option ${theme === t.id ? 'active' : ''}`}
                            onClick={() => setTheme(t.id)}
                        >
                            <div className={`theme-preview theme-preview--${t.id}`}>
                                <t.icon size={24} />
                            </div>
                            <span className="theme-option-label">{t.label}</span>
                            {theme === t.id && <Check size={16} className="theme-check" />}
                        </button>
                    ))}
                </div>
            </Card>

            <Card className="settings-card">
                <h3 className="settings-card-title">Accent Color</h3>
                <p className="settings-card-desc">Pick a color that reflects your style.</p>

                <div className="accent-color-grid">
                    {accentColors.map(c => (
                        <button
                            key={c.color}
                            className={`accent-swatch ${accentColor === c.color ? 'active' : ''}`}
                            style={{ '--swatch-color': c.color }}
                            onClick={() => setAccentColor(c.color)}
                            title={c.name}
                        >
                            {accentColor === c.color && <Check size={16} />}
                        </button>
                    ))}
                </div>
            </Card>

            <Card className="settings-card">
                <h3 className="settings-card-title">Font Size</h3>
                <p className="settings-card-desc">Adjust the text size across the application.</p>

                <div className="font-size-selector">
                    {fontSizes.map(f => (
                        <button
                            key={f.id}
                            className={`font-size-option ${fontSize === f.id ? 'active' : ''}`}
                            onClick={() => setFontSize(f.id)}
                        >
                            <span className={`font-size-sample font-size-sample--${f.id}`}>Aa</span>
                            <span className="font-size-label">{f.label}</span>
                        </button>
                    ))}
                </div>
            </Card>

            <Card className="settings-card">
                <h3 className="settings-card-title">Layout</h3>
                <p className="settings-card-desc">Customize layout preferences.</p>

                <ToggleSwitch
                    label="Compact sidebar"
                    description="Show only icons in the sidebar to save space."
                    checked={sidebarCompact}
                    onChange={setSidebarCompact}
                />
            </Card>
        </>
    );
};

/* ──────────────── Notifications Tab ──────────────── */
const NotificationsTab = () => {
    const [emailNotifs, setEmailNotifs] = useState(true);
    const [pushNotifs, setPushNotifs] = useState(false);
    const [interviewReminders, setInterviewReminders] = useState(true);
    const [deadlineAlerts, setDeadlineAlerts] = useState(true);
    const [weeklyDigest, setWeeklyDigest] = useState(false);

    return (
        <>
            <Card className="settings-card">
                <h3 className="settings-card-title">Notification Channels</h3>
                <p className="settings-card-desc">Choose how you'd like to receive notifications.</p>

                <div className="toggles-list">
                    <ToggleSwitch
                        label="Email notifications"
                        description="Get notified about important updates via email."
                        checked={emailNotifs}
                        onChange={setEmailNotifs}
                    />
                    <ToggleSwitch
                        label="Push notifications"
                        description="Receive browser push notifications."
                        checked={pushNotifs}
                        onChange={setPushNotifs}
                    />
                </div>
            </Card>

            <Card className="settings-card">
                <h3 className="settings-card-title">Alert Preferences</h3>
                <p className="settings-card-desc">Fine-tune which events trigger notifications.</p>

                <div className="toggles-list">
                    <ToggleSwitch
                        label="Interview reminders"
                        description="Get reminded 24 hours before each interview."
                        checked={interviewReminders}
                        onChange={setInterviewReminders}
                    />
                    <ToggleSwitch
                        label="Deadline alerts"
                        description="Alert when an application deadline is approaching."
                        checked={deadlineAlerts}
                        onChange={setDeadlineAlerts}
                    />
                    <ToggleSwitch
                        label="Weekly digest"
                        description="Receive a weekly summary of your progress."
                        checked={weeklyDigest}
                        onChange={setWeeklyDigest}
                    />
                </div>
            </Card>
        </>
    );
};

/* ──────────────── Privacy & Security Tab ──────────────── */
const PrivacyTab = () => {
    const { logout } = useAuth();
    const [twoFactor, setTwoFactor] = useState(false);
    const [activityLog, setActivityLog] = useState(true);

    return (
        <>
            <Card className="settings-card">
                <h3 className="settings-card-title">Password</h3>
                <p className="settings-card-desc">Keep your account secure with a strong password.</p>

                <div className="settings-form-grid">
                    <Input label="Current password" type="password" placeholder="••••••••" />
                    <div></div>
                    <Input label="New password" type="password" placeholder="••••••••" />
                    <Input label="Confirm new password" type="password" placeholder="••••••••" />
                </div>

                <div className="settings-divider"></div>
                <div className="settings-actions">
                    <Button>Update Password</Button>
                </div>
            </Card>

            <Card className="settings-card">
                <h3 className="settings-card-title">Security</h3>
                <p className="settings-card-desc">Advanced security options.</p>

                <div className="toggles-list">
                    <ToggleSwitch
                        label="Two-factor authentication"
                        description="Add an extra layer of security to your account."
                        checked={twoFactor}
                        onChange={setTwoFactor}
                    />
                    <ToggleSwitch
                        label="Activity log"
                        description="Track login activity and sessions."
                        checked={activityLog}
                        onChange={setActivityLog}
                    />
                </div>
            </Card>

            <Card className="settings-card">
                <h3 className="settings-card-title">Data & Privacy</h3>
                <p className="settings-card-desc">Manage your data and account access.</p>

                <div className="privacy-actions-list">
                    <button className="privacy-action-btn">
                        <Download size={18} />
                        <div>
                            <span className="privacy-action-title">Export your data</span>
                            <span className="privacy-action-desc">Download a copy of all your data.</span>
                        </div>
                    </button>
                    <button className="privacy-action-btn" onClick={logout}>
                        <LogOut size={18} />
                        <div>
                            <span className="privacy-action-title">Sign out of all devices</span>
                            <span className="privacy-action-desc">Log out of every active session.</span>
                        </div>
                    </button>
                </div>
            </Card>
        </>
    );
};

/* ──────────────── Main Settings Component ──────────────── */
const Settings = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('profile');

    const renderTab = () => {
        switch (activeTab) {
            case 'profile': return <ProfileTab user={user} />;
            case 'appearance': return <AppearanceTab />;
            case 'notifications': return <NotificationsTab />;
            case 'privacy': return <PrivacyTab />;
            default: return <ProfileTab user={user} />;
        }
    };

    return (
        <div className="settings-container animate-fade-in">
            <div className="settings-header">
                <div>
                    <h2 className="page-title-main">Settings</h2>
                    <p className="page-subtitle">Manage your account preferences and app settings.</p>
                </div>
            </div>

            <div className="settings-layout">
                <aside className="settings-sidebar">
                    <nav className="settings-nav">
                        {TABS.map(tab => (
                            <button
                                key={tab.id}
                                className={`settings-nav-item ${activeTab === tab.id ? 'active' : ''}`}
                                onClick={() => setActiveTab(tab.id)}
                            >
                                <tab.icon size={18} /> {tab.label}
                            </button>
                        ))}
                    </nav>
                </aside>

                <div className="settings-content">
                    {renderTab()}
                </div>
            </div>
        </div>
    );
};

export default Settings;
