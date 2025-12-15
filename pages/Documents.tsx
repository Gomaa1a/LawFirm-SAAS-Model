import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, MoreVertical, FileText, X, Download, Eye } from 'lucide-react';
import { DocumentStatus } from '../types';

const documents = [
  { id: 1, name: 'NDA_TechCorp_Final.pdf', category: 'Contract', date: '2023-11-01', author: 'Sarah Al-Balushi', status: 'Approved' },
  { id: 2, name: 'Employment_Offer_JSmith.docx', category: 'HR', date: '2023-10-28', author: 'HR Dept', status: 'Pending Review' },
  { id: 3, name: 'Court_Summons_Case_102.pdf', category: 'Litigation', date: '2023-10-25', author: 'Ahmed Al-Lawati', status: 'Categorized' },
  { id: 4, name: 'Office_Lease_Muscat.pdf', category: 'Real Estate', date: '2023-10-20', author: 'Admin', status: 'Approved' },
  { id: 5, name: 'Consulting_Agreement_v2.docx', category: 'Contract', date: '2023-10-15', author: 'Sarah Al-Balushi', status: 'Draft' },
];

const Documents: React.FC = () => {
  const navigate = useNavigate();
  const [selectedDocument, setSelectedDocument] = useState<typeof documents[0] | null>(null);

  const handleFilter = () => {
    alert('Filter panel would slide out here (Phase 2 feature). Showing all documents for now.');
  };

  const handleAction = (docName: string) => {
    alert(`Menu options for ${docName}: Download, Rename, Delete.`);
  };

  return (
    <div className="space-y-6 relative">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Document Library</h1>
          <p className="mt-1 text-sm text-gray-500">Manage, search, and track all legal documents.</p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <button 
            onClick={handleFilter}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </button>
          <button 
            onClick={() => navigate('/document-intake')}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
          >
            <FileText className="h-4 w-4 mr-2" />
            New Document
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative rounded-md shadow-sm max-w-lg">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2.5 border"
          placeholder="Search by name, content, or tag..."
        />
      </div>

      {/* Table */}
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Document Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Uploaded By
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {documents.map((doc) => (
                    <tr key={doc.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div 
                          className="flex items-center cursor-pointer group"
                          onClick={() => setSelectedDocument(doc)}
                        >
                          <div className="flex-shrink-0 h-8 w-8 text-blue-500 group-hover:text-blue-700 transition-colors">
                            <FileText />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 group-hover:text-blue-700 underline-offset-2 group-hover:underline transition-all">
                              {doc.name}
                            </div>
                            <div className="text-xs text-gray-400 sm:hidden">Click to preview</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {doc.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                          ${doc.status === 'Approved' ? 'bg-green-100 text-green-800' : 
                            doc.status === 'Pending Review' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}`}>
                          {doc.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {doc.author}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {doc.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button 
                            onClick={() => setSelectedDocument(doc)}
                            className="text-gray-400 hover:text-blue-600 p-1 hover:bg-gray-100 rounded-full transition-colors"
                            title="Preview"
                          >
                            <Eye className="h-5 w-5" />
                          </button>
                          <button 
                            onClick={(e) => { e.stopPropagation(); handleAction(doc.name); }}
                            className="text-gray-400 hover:text-gray-500 p-1 hover:bg-gray-100 rounded-full transition-colors"
                          >
                            <MoreVertical className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Document Preview Modal */}
      {selectedDocument && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Background overlay */}
            <div 
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" 
              aria-hidden="true" 
              onClick={() => setSelectedDocument(null)}
            ></div>

            {/* Modal panel */}
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-5xl sm:w-full sm:p-6">
              <div className="absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={() => setSelectedDocument(null)}
                >
                  <span className="sr-only">Close</span>
                  <X className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="flex flex-col h-full">
                <div className="border-b border-gray-200 pb-4 mb-4 flex justify-between items-center">
                   <div>
                     <h3 className="text-xl leading-6 font-semibold text-gray-900" id="modal-title">
                       {selectedDocument.name}
                     </h3>
                     <p className="text-sm text-gray-500 mt-1">
                       Uploaded by {selectedDocument.author} on {selectedDocument.date}
                     </p>
                   </div>
                   <button 
                     className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                     onClick={() => alert(`Downloading ${selectedDocument.name}...`)}
                   >
                     <Download className="h-4 w-4 mr-2" />
                     Download
                   </button>
                </div>
                
                <div className="bg-slate-50 border border-gray-200 rounded-lg h-[60vh] flex flex-col items-center justify-center p-8 overflow-y-auto">
                    {/* Placeholder content for preview */}
                    <div className="max-w-2xl w-full bg-white shadow-sm border border-gray-200 p-8 min-h-full">
                        <div className="w-full flex justify-between items-start border-b pb-4 mb-6">
                           <div className="h-8 w-32 bg-gray-200 rounded animate-pulse"></div>
                           <div className="h-8 w-8 bg-gray-200 rounded-full animate-pulse"></div>
                        </div>
                        <div className="space-y-4">
                            <div className="h-4 bg-gray-100 rounded w-3/4"></div>
                            <div className="h-4 bg-gray-100 rounded w-full"></div>
                            <div className="h-4 bg-gray-100 rounded w-5/6"></div>
                            <div className="h-4 bg-gray-100 rounded w-full"></div>
                            <div className="h-4 bg-gray-100 rounded w-4/5"></div>
                        </div>
                        <div className="mt-8 space-y-4">
                            <div className="h-4 bg-gray-100 rounded w-full"></div>
                            <div className="h-4 bg-gray-100 rounded w-full"></div>
                            <div className="h-4 bg-gray-100 rounded w-3/4"></div>
                        </div>
                        <div className="mt-12 flex justify-center">
                            <div className="text-center">
                                <FileText className="h-12 w-12 text-blue-200 mx-auto" />
                                <p className="mt-2 text-sm text-gray-400">Preview Mode</p>
                                <p className="text-xs text-gray-300">This is a placeholder for the actual document content rendering.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                   <div className="text-sm text-gray-500 flex items-center">
                      <span className="font-medium mr-2">Status:</span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                          ${selectedDocument.status === 'Approved' ? 'bg-green-100 text-green-800' : 
                            selectedDocument.status === 'Pending Review' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}`}>
                          {selectedDocument.status}
                      </span>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Documents;