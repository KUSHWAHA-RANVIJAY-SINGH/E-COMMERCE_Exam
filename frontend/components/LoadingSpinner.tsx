'use client';

interface LoadingSpinnerProps {
         size?: 'sm' | 'md' | 'lg';
         color?: 'primary' | 'white' | 'secondary';
}

export default function LoadingSpinner({ size = 'md', color = 'primary' }: LoadingSpinnerProps) {
         const sizeClasses = {
                  sm: 'w-5 h-5 border-2',
                  md: 'w-10 h-10 border-3',
                  lg: 'w-16 h-16 border-4'
         };

         const colorClasses = {
                  primary: 'border-indigo-200 border-t-indigo-600',
                  white: 'border-white/30 border-t-white',
                  secondary: 'border-pink-200 border-t-pink-600'
         };

         return (
                  <div className={`spinner ${sizeClasses[size]} ${colorClasses[color]} rounded-full animate-spin`}></div>
         );
}
