
import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full py-20">
      <div className="w-12 h-12 border-4 border-zinc-800 border-t-blue-500 rounded-full animate-spin"></div>
      <p className="mt-4 text-zinc-400 font-medium">Loading skips...</p>
    </div>
  );
};

export default LoadingSpinner;
