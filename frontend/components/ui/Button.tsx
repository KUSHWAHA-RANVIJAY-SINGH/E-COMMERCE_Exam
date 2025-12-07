interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  isLoading,
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = 'font-semibold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center';
  const variants = {
    primary: 'bg-gradient-to-r from-primary-600 to-accent-600 text-white shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 hover:scale-[1.02] active:scale-[0.98]',
    secondary: 'bg-white text-slate-700 border border-slate-200 hover:border-sidebar-300 hover:bg-slate-50 hover:text-slate-900',
    danger: 'bg-red-50 text-red-600 border border-red-100 hover:bg-red-100',
    outline: 'bg-transparent text-primary-600 border-2 border-primary-100 hover:border-primary-600 hover:bg-primary-50'
  };
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center justify-center gap-2">
          <div className="spinner w-5 h-5 border-2"></div>
          <span>Loading...</span>
        </span>
      ) : (
        children
      )}
    </button>
  );
}

