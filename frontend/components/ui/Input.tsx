interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: string;
  label?: string;
  error?: string;
}

export default function Input({ icon, label, error, className = '', id, ...props }: InputProps) {
  const inputId = id || (label ? `input-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

  return (
    <div>
      {label && (
        <label htmlFor={inputId} className="block text-sm font-semibold text-gray-700 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-xl pointer-events-none z-10" aria-hidden="true">
            {icon}
          </span>
        )}
        <input
          id={inputId}
          style={{ paddingLeft: icon ? '3.5rem' : '1rem' }}
          className={`w-full pr-4 py-3 border-2 ${error ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-white'
            } rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all text-gray-900 placeholder-slate-400 ${className}`}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${inputId}-error` : undefined}
          suppressHydrationWarning
          {...props}
        />
      </div>
      {error && (
        <p id={error ? `${inputId}-error` : undefined} className="text-red-500 text-xs mt-1" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

