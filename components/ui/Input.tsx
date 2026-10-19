import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: React.ReactNode;
  required?: boolean;
  helperText?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  icon,
  required,
  helperText,
  error,
  className = '',
  ...props
}) => {
  return (
    <div className="w-full">
      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
        {label} {required && <span className="text-primary-500">*</span>}
      </label>
      <div className="relative flex items-center">
        {icon && (
          <div className="absolute left-4 text-gray-400 pointer-events-none flex items-center justify-center">
            {icon}
          </div>
        )}
        <input
          className={`w-full py-3.5 ${icon ? 'pl-11' : 'pl-4'} pr-4 rounded-xl bg-white border-2 text-sm text-gray-900 placeholder-gray-400 font-medium transition-all duration-200 outline-none shadow-sm focus:border-primary-500 focus:ring-4 focus:ring-primary-100 ${
            error ? 'border-red-400 bg-red-50/20' : 'border-gray-200 hover:border-gray-300'
          } ${className}`}
          {...props}
        />
      </div>
      {helperText && !error && (
        <p className="mt-1.5 text-xs text-gray-400">{helperText}</p>
      )}
      {error && (
        <p className="mt-1.5 text-xs text-red-500 font-medium">{error}</p>
      )}
    </div>
  );
};

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  required?: boolean;
  helperText?: string;
  error?: string;
}

export const Textarea: React.FC<TextareaProps> = ({
  label,
  required,
  helperText,
  error,
  className = '',
  rows = 3,
  ...props
}) => {
  return (
    <div className="w-full">
      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
        {label} {required && <span className="text-primary-500">*</span>}
      </label>
      <textarea
        rows={rows}
        className={`w-full p-4 rounded-xl bg-white border-2 text-sm text-gray-900 placeholder-gray-400 font-medium transition-all duration-200 outline-none shadow-sm focus:border-primary-500 focus:ring-4 focus:ring-primary-100 resize-none ${
          error ? 'border-red-400 bg-red-50/20' : 'border-gray-200 hover:border-gray-300'
        } ${className}`}
        {...props}
      />
      {helperText && !error && (
        <p className="mt-1.5 text-xs text-gray-400">{helperText}</p>
      )}
      {error && (
        <p className="mt-1.5 text-xs text-red-500 font-medium">{error}</p>
      )}
    </div>
  );
};
