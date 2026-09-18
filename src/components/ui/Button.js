import React from 'react';
import clsx from 'clsx';
import './Button.css';

export const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    className,
    fullWidth = false,
    isLoading = false,
    ...props
}) => {
    return (
        <button
            className={clsx(
                'btn',
                `btn-${variant}`,
                `btn-${size}`,
                fullWidth && 'btn-full',
                isLoading && 'btn-loading',
                className
            )}
            disabled={isLoading || props.disabled}
            {...props}
        >
            {isLoading ? <span className="loader"></span> : children}
        </button>
    );
};
