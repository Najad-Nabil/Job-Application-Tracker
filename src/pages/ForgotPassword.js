import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, ArrowLeft } from 'lucide-react';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import AuthLayout from './AuthLayout';
import './AuthForms.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) return;

        setIsSubmitting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsSubmitting(false);
        setIsSubmitted(true);
    };

    return (
        <AuthLayout
            title="Reset password"
            subtitle={isSubmitted ? "Check your email" : "Enter your email to receive a reset link."}
        >
            {isSubmitted ? (
                <div className="auth-form" style={{ textAlign: 'center' }}>
                    <div style={{
                        width: 48,
                        height: 48,
                        background: 'var(--color-success-bg)',
                        color: 'var(--color-success)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 16px'
                    }}>
                        <Mail size={24} />
                    </div>
                    <p style={{ color: 'var(--color-text-muted)', marginBottom: 24, lineHeight: 1.5 }}>
                        We've sent a password reset link to <strong>{email}</strong>.
                        Please check your inbox and follow the instructions.
                    </p>
                    <Link to="/login" style={{ textDecoration: 'none' }}>
                        <Button fullWidth size="lg">Return to sign in</Button>
                    </Link>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="auth-form">
                    <Input
                        label="Email address"
                        placeholder="name@example.com"
                        type="email"
                        icon={Mail}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <Button
                        type="submit"
                        fullWidth
                        size="lg"
                        isLoading={isSubmitting}
                    >
                        Send reset link
                    </Button>

                    <div style={{ textAlign: 'center', marginTop: 16 }}>
                        <Link to="/login" className="auth-link" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                            <ArrowLeft size={16} />
                            Back to sign in
                        </Link>
                    </div>
                </form>
            )}
        </AuthLayout>
    );
};

export default ForgotPassword;
