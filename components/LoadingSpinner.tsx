
import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] w-full p-8">
      <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
      <p className="mt-4 text-gray-500 font-medium">Loading Visionary experiences...</p>
    </div>
  );
};

export default LoadingSpinner;
