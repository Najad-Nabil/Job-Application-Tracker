import React, { forwardRef, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import clsx from 'clsx';
import './Input.css';

export const Input = forwardRef(({
    label,
    error,
    type = 'text',
    className,
    icon: Icon,
    ...props
}, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';
    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

    return (
        <div className="input-group">
            {label && <label className="input-label">{label}</label>}
            <div className="input-wrapper">
                {Icon && <Icon className="input-icon" size={18} />}
                <input
                    ref={ref}
                    type={inputType}
                    className={clsx(
                        'input-field',
                        Icon && 'has-icon',
                        isPassword && 'has-password-toggle',
                        error && 'input-error',
                        className
                    )}
                    {...props}
                />
                {isPassword && (
                    <button
                        type="button"
                        className="password-toggle"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                )}
            </div>
            {error && <span className="error-message">{error}</span>}
        </div>
    );
});

Input.displayName = 'Input';
