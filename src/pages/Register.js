import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User } from 'lucide-react';
import { useAuth } from '../auth/AuthContext';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import AuthLayout from './AuthLayout';
import './AuthForms.css';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [agreedToTerms, setAgreedToTerms] = useState(false);

    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const calculatePasswordStrength = (password) => {
        let score = 0;
        if (!password) return 0;
        if (password.length > 8) score += 1;
        if (/[A-Z]/.test(password)) score += 1;
        if (/[0-9]/.test(password)) score += 1;
        if (/[^A-Za-z0-9]/.test(password)) score += 1;
        return score;
    };

    const strength = calculatePasswordStrength(formData.password);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
            setError('Please fill in all fields');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (!agreedToTerms) {
            setError('You must agree to the Terms of Service');
            return;
        }

        setIsSubmitting(true);
        const result = await register(formData.name, formData.email, formData.password);
        setIsSubmitting(false);

        if (result.success && result.requiresEmailConfirmation) {
            setSuccessMessage('Account created. Please check your email to confirm your account before signing in.');
            return;
        }

        if (result.success) {
            navigate('/dashboard');
        } else {
            setError(result.error);
        }
    };

    return (
        <AuthLayout
            title="Create an account"
            subtitle="Start organizing your job search today."
        >
            <form onSubmit={handleSubmit} className="auth-form">
                {error && <div className="auth-error-banner animate-fade-in">{error}</div>}

                {successMessage && (
                    <div className="auth-success-banner animate-fade-in">
                        {successMessage}
                    </div>
                )}

                <Input
                    label="Full name"
                    name="name"
                    placeholder="John Doe"
                    icon={User}
                    value={formData.name}
                    onChange={handleChange}
                />

                <Input
                    label="Email address"
                    name="email"
                    placeholder="name@example.com"
                    type="email"
                    icon={Mail}
                    value={formData.email}
                    onChange={handleChange}
                />

                <div style={{ width: '100%' }}>
                    <Input
                        label="Password"
                        name="password"
                        placeholder="Create a password"
                        type="password"
                        icon={Lock}
                        value={formData.password}
                        onChange={handleChange}
                    />
                    {formData.password && (
                        <div className="password-strength">
                            <div className="strength-bars">
                                {[1, 2, 3, 4].map(level => (
                                    <div
                                        key={level}
                                        className={`strength-bar ${strength >= level ? 'active' : ''}`}
                                        data-strength={level}
                                    />
                                ))}
                            </div>
                            <span className="strength-text">
                                {strength < 2 ? 'Weak' : strength < 4 ? 'Good' : 'Strong'}
                            </span>
                        </div>
                    )}
                </div>

                <Input
                    label="Confirm password"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    type="password"
                    icon={Lock}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                />

                <div className="auth-options" style={{ justifyContent: 'flex-start' }}>
                    <label className="checkbox-container">
                        <input
                            type="checkbox"
                            className="custom-checkbox"
                            checked={agreedToTerms}
                            onChange={(e) => setAgreedToTerms(e.target.checked)}
                        />
                        <span className="checkbox-label">
                            I agree to the <a href="#" className="auth-link">Terms</a> and <a href="#" className="auth-link">Privacy Policy</a>
                        </span>
                    </label>
                </div>

                <Button
                    type="submit"
                    fullWidth
                    size="lg"
                    isLoading={isSubmitting}
                >
                    Create account
                </Button>
            </form>

            <div className="auth-redirect">
                Already have an account? <Link to="/login" className="auth-link-bold">Sign in</Link>
            </div>
        </AuthLayout>
    );
};

export default Register;
