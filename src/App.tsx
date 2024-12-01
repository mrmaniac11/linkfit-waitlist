import React from 'react';
import WaitlistForm from './components/WaitlistForm';
import ValueProposition from './components/ValueProposition';
import { Sparkles } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Section */}
      <div className="w-full md:w-1/2 bg-green-500 p-8 md:p-16 flex items-center justify-center overflow-hidden">
        <ValueProposition />
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/2 bg-white p-8 md:p-16 flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="flex items-center justify-center mb-8">
            <Sparkles className="text-green-500 w-8 h-8 mr-2" />
            <span className="text-2xl font-bold text-gray-800">LikFit</span>
          </div>
          <WaitlistForm />
        </div>
      </div>
    </div>
  );
}

export default App;