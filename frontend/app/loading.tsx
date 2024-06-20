// src/pages/loading.js
import React from 'react';

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="w-16 h-16 border-b-4 border-blue-500 rounded-full animate-spin"></div>
        </div>
        <div className="text-lg text-gray-700">Loading...</div>
      </div>
    </div>
  );
}
