import React from 'react';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'text',
  width,
  height,
}) => {
  const baseClasses = 'animate-pulse bg-gray-200 dark:bg-gray-700';

  const variants = {
    text: 'rounded h-4',
    circular: 'rounded-full',
    rectangular: 'rounded-xl',
  };

  const style: React.CSSProperties = {
    width: width || (variant === 'circular' ? height : undefined),
    height: height || (variant === 'text' ? undefined : width),
  };

  return (
    <div
      className={`${baseClasses} ${variants[variant]} ${className}`}
      style={style}
    />
  );
};

// Pre-built skeleton patterns
export const PropertyCardSkeleton: React.FC = () => (
  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-card overflow-hidden">
    <Skeleton variant="rectangular" className="w-full h-48" />
    <div className="p-4 space-y-3">
      <Skeleton variant="text" className="w-3/4 h-5" />
      <Skeleton variant="text" className="w-1/2 h-4" />
      <div className="flex gap-2">
        <Skeleton variant="text" className="w-20 h-6" />
        <Skeleton variant="text" className="w-20 h-6" />
      </div>
    </div>
  </div>
);

export const StatCardSkeleton: React.FC = () => (
  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-card p-6">
    <div className="flex items-start justify-between">
      <div className="space-y-2">
        <Skeleton variant="text" className="w-20 h-4" />
        <Skeleton variant="text" className="w-16 h-8" />
      </div>
      <Skeleton variant="circular" width={40} height={40} />
    </div>
  </div>
);

export const TableSkeleton: React.FC<{ rows?: number }> = ({ rows = 5 }) => (
  <div className="space-y-3">
    {Array.from({ length: rows }).map((_, i) => (
      <div key={i} className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl">
        <Skeleton variant="circular" width={40} height={40} />
        <div className="flex-1 space-y-2">
          <Skeleton variant="text" className="w-1/3 h-4" />
          <Skeleton variant="text" className="w-1/4 h-3" />
        </div>
        <Skeleton variant="text" className="w-20 h-6" />
      </div>
    ))}
  </div>
);
