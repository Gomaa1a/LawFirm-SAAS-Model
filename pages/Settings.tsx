import React, { useState } from 'react';
import { Server, Save } from 'lucide-react';

const Settings: React.FC = () => {
  const [hosting, setHosting] = useState('odp');

  const handleSave = () => {
      alert(`Settings Saved Successfully!\n\nHosting Preference: ${hosting === 'odp' ? 'Oman Data Park' : 'AWS Cloud'}\n\nThis configuration has been applied globally.`);
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h2 className="text-2xl font-bold leading-7 text-gray-900">Platform Settings</h2>
        <p className="mt-1 text-sm text-gray-500">Configure global application parameters.</p>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Infrastructure & Hosting</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">Select your preferred data residency location.</p>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
          <div className="space-y-4">
            <div className="flex items-start">
               <div className="flex items-center h-5">
                 <input
                   id="odp"
                   name="hosting"
                   type="radio"
                   checked={hosting === 'odp'}
                   onChange={() => setHosting('odp')}
                   className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                 />
               </div>
               <div className="ml-3 text-sm">
                 <label htmlFor="odp" className="font-medium text-gray-700">Oman Data Park (ODP)</label>
                 <p className="text-gray-500">Data remains physically within the Sultanate of Oman. Compliant with strict data sovereignty laws.</p>
               </div>
            </div>
            <div className="flex items-start">
               <div className="flex items-center h-5">
                 <input
                   id="aws"
                   name="hosting"
                   type="radio"
                   checked={hosting === 'aws'}
                   onChange={() => setHosting('aws')}
                   className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                 />
               </div>
               <div className="ml-3 text-sm">
                 <label htmlFor="aws" className="font-medium text-gray-700">AWS / Azure Cloud</label>
                 <p className="text-gray-500">High availability international hosting (Middle East Region). Recommended for scale.</p>
               </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:px-6 flex justify-end">
            <button 
                onClick={handleSave}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
                <Save className="h-4 w-4 mr-2" />
                Save Configuration
            </button>
        </div>
      </div>
      
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">User Management</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">MVP license supports up to 20 users.</p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
             <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                <div className="flex">
                    <div className="flex-shrink-0">
                        <Server className="h-5 w-5 text-blue-400" />
                    </div>
                    <div className="ml-3">
                        <p className="text-sm text-blue-700">
                            Current Usage: <strong>4 / 20 Seats Used</strong>
                        </p>
                    </div>
                </div>
             </div>
          </div>
      </div>
    </div>
  );
};

export default Settings;