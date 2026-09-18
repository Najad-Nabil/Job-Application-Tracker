import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import { useAuth } from '../auth/AuthContext';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import AuthLayout from './AuthLayout';
import './AuthForms.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }

        setIsSubmitting(true);
        const result = await login(email, password);
        setIsSubmitting(false);

        if (result.success) {
            navigate('/dashboard');
        } else {
            setError(result.error);
        }
    };

    return (
        <AuthLayout
            title="Welcome back"
            subtitle="Enter your details to access your account."
        >
            <form onSubmit={handleSubmit} className="auth-form">
                {error && <div className="auth-error-banner animate-fade-in">{error}</div>}

                <Input
                    label="Email address"
                    placeholder="name@example.com"
                    type="email"
                    icon={Mail}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <Input
                    label="Password"
                    placeholder="••••••••"
                    type="password"
                    icon={Lock}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <div className="auth-options">
                    <label className="checkbox-container">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="checkbox-label">Remember me</span>
                    </label>
                    <Link to="/forgot-password" className="auth-link">Forgot password?</Link>
                </div>

                <Button
                    type="submit"
                    fullWidth
                    size="lg"
                    isLoading={isSubmitting}
                >
                    Sign in
                </Button>
            </form>

            <div className="auth-redirect">
                Don't have an account? <Link to="/register" className="auth-link-bold">Sign up</Link>
            </div>
        </AuthLayout>
    );
};

export default Login;
