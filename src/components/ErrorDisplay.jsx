
import React from 'react';

const ErrorDisplay = ({ message, onRetry }) => {
  return (
    <div className="w-full py-10 px-4 bg-red-900/20 border border-red-900/30 rounded-lg">
      <div className="flex flex-col items-center text-center">
        <div className="mb-4 p-3 rounded-full bg-red-900/30 text-red-500">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-red-400">Unable to load skips</h3>
        <p className="mt-2 text-sm text-red-300">
          {message || "There was an error loading skip data. Please try again."}
        </p>
        <button
          onClick={onRetry}
          className="mt-4 px-4 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 transition-colors"
        >
          Retry
        </button>
      </div>
    </div>
  );
};

export default ErrorDisplay;
