import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileEdit, Check, ArrowRight, AlertOctagon } from 'lucide-react';
import { TemplateType } from '../types';

const templates = [
  { id: '1', title: 'Non-Disclosure Agreement', type: TemplateType.NDA, desc: 'Standard mutual NDA.' },
  { id: '2', title: 'Employment Contract', type: TemplateType.EMPLOYMENT, desc: 'Omani Labour Law compliant contract.' },
  { id: '3', title: 'Service Agreement', type: TemplateType.SERVICE_AGREEMENT, desc: 'General B2B service provision.' },
  { id: '4', title: 'Power of Attorney', type: TemplateType.POWER_OF_ATTORNEY, desc: 'Standard legal representation.' },
  { id: '5', title: 'Commercial Lease', type: TemplateType.LEASE_AGREEMENT, desc: 'Property rental agreement.' },
];

const Templates: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    const templateName = templates.find(t => t.id === selectedTemplate)?.title;
    alert(`Draft for "${templateName}" generated successfully!\n\nIt has been added to your Document Library with 'Draft' status.`);
    // In a real app, this would submit the form data to an API
    navigate('/documents');
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-5">
        <h2 className="text-2xl font-bold leading-7 text-gray-900">Template Generator</h2>
        <p className="mt-1 text-sm text-gray-500">Generate draft documents from approved templates.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Template List */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Select Document Type</h3>
          <div className="grid grid-cols-1 gap-4">
            {templates.map((t) => (
              <div 
                key={t.id}
                onClick={() => setSelectedTemplate(t.id)}
                className={`relative rounded-lg border p-4 shadow-sm cursor-pointer hover:border-blue-400 transition-all ${selectedTemplate === t.id ? 'border-blue-500 ring-1 ring-blue-500 bg-blue-50' : 'border-gray-300 bg-white'}`}
              >
                <div className="flex justify-between space-x-3">
                  <div className="min-w-0 flex-1">
                      <div className="flex items-center space-x-2">
                        <FileEdit className="h-5 w-5 text-blue-600" />
                        <span className="block text-sm font-medium text-gray-900">{t.title}</span>
                      </div>
                      <p className="mt-1 text-sm text-gray-500 truncate">{t.desc}</p>
                  </div>
                  {selectedTemplate === t.id && (
                    <Check className="h-5 w-5 text-blue-600" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Input Form Area */}
        <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 flex flex-col h-full">
            {selectedTemplate ? (
                <div className="space-y-4 animate-fadeIn">
                    <h3 className="text-lg font-medium text-gray-900">Draft Details: {templates.find(t => t.id === selectedTemplate)?.title}</h3>
                    <form className="space-y-4" onSubmit={handleGenerate}>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Party A Name</label>
                            <input required type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border" placeholder="e.g. Company Name" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Party B Name</label>
                            <input required type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border" placeholder="e.g. Employee Name" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Effective Date</label>
                            <input required type="date" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border" />
                        </div>
                        
                        <div className="mt-auto pt-6">
                            <div className="rounded-md bg-amber-50 p-4 mb-4">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <AlertOctagon className="h-5 w-5 text-amber-400" aria-hidden="true" />
                                    </div>
                                    <div className="ml-3">
                                        <h3 className="text-sm font-medium text-amber-800">Legal Disclaimer</h3>
                                        <div className="mt-2 text-sm text-amber-700">
                                            <p>This generator creates a draft based on standard templates. Manual Legal Team Review Required before finalization.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button 
                                type="submit"
                                className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
                            >
                                Generate Draft <ArrowRight className="ml-2 h-4 w-4" />
                            </button>
                        </div>
                    </form>
                </div>
            ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
                    <FileEdit className="h-12 w-12 mb-3 opacity-20" />
                    <p>Select a template to begin drafting</p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default Templates;