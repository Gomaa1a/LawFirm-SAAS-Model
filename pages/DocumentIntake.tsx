import React, { useState, useRef } from 'react';
import { 
  Upload, 
  FileText, 
  Image as ImageIcon, 
  CheckCircle, 
  Loader2, 
  AlertTriangle,
  Eye,
  ArrowUpCircle
} from 'lucide-react';
import { DocumentStatus } from '../types';

interface UploadedFile {
  id: number;
  name: string;
  size: string;
  type: string;
  status: DocumentStatus;
  progress: number;
}

const DocumentIntake: React.FC = () => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [handwrittenMode, setHandwrittenMode] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [files, setFiles] = useState<UploadedFile[]>([
    { id: 1, name: 'Statement_Claim_v1.pdf', size: '2.4 MB', type: 'application/pdf', status: DocumentStatus.CATEGORIZED, progress: 100 },
    { id: 2, name: 'Evidence_Photos.jpg', size: '4.1 MB', type: 'image/jpeg', status: DocumentStatus.PROCESSING_OCR, progress: 45 },
    { id: 3, name: 'Meeting_Notes_Handwritten.pdf', size: '1.2 MB', type: 'application/pdf', status: DocumentStatus.REQUIRES_VERIFICATION, progress: 100 },
  ]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const simulateUpload = (file: File) => {
    const newFile: UploadedFile = {
      id: Date.now(),
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
      type: file.type || 'application/octet-stream',
      status: DocumentStatus.UPLOADING,
      progress: 0
    };

    setFiles(prev => [newFile, ...prev]);

    // Simulate progress
    const interval = setInterval(() => {
      setFiles(currentFiles => {
        return currentFiles.map(f => {
          if (f.id === newFile.id) {
            const increment = Math.random() * 15 + 5;
            const nextProgress = Math.min(f.progress + increment, 100);
            return { ...f, progress: nextProgress };
          }
          return f;
        });
      });
    }, 400);

    // Transition state when "upload" is done (simulated by timeout)
    setTimeout(() => {
        clearInterval(interval);
        setFiles(currentFiles => 
            currentFiles.map(f => f.id === newFile.id ? { ...f, progress: 100, status: DocumentStatus.PROCESSING_OCR } : f)
        );
        
        // Simulate OCR completion after upload
        setTimeout(() => {
            setFiles(currentFiles => 
                currentFiles.map(f => f.id === newFile.id ? { ...f, status: DocumentStatus.CATEGORIZED } : f)
            );
        }, 3000);
        
    }, 4000); // approx 4 seconds to upload
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        Array.from(e.dataTransfer.files).forEach(file => simulateUpload(file as File));
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
        Array.from(e.target.files).forEach(file => simulateUpload(file as File));
    }
    // Reset input so same file can be selected again if needed
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleReview = (fileName: string) => {
      alert(`Opening interactive review tool for: ${fileName}\n\nThis would launch the split-screen comparison editor.`);
  };

  const getStatusBadge = (status: DocumentStatus) => {
    switch (status) {
      case DocumentStatus.UPLOADING:
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700"><ArrowUpCircle className="w-3 h-3 mr-1 animate-bounce" /> Uploading...</span>;
      case DocumentStatus.PROCESSING_OCR:
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"><Loader2 className="w-3 h-3 mr-1 animate-spin" /> OCR Processing</span>;
      case DocumentStatus.CATEGORIZED:
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" /> Categorized</span>;
      case DocumentStatus.REQUIRES_VERIFICATION:
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800"><AlertTriangle className="w-3 h-3 mr-1" /> Verify Data</span>;
      default:
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">{status}</span>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Document Intake
          </h2>
          <p className="mt-1 text-sm text-gray-500">Upload legal documents for OCR, categorization, and storage.</p>
        </div>
      </div>

      {/* Upload Area */}
      <div className="bg-white shadow sm:rounded-lg p-6">
        <input 
            type="file" 
            ref={fileInputRef}
            className="hidden" 
            multiple 
            onChange={handleFileSelect}
            accept=".pdf,.docx,.jpg,.jpeg,.png"
        />
        <div 
          className={`border-2 border-dashed rounded-lg p-12 text-center flex flex-col items-center justify-center transition-colors cursor-pointer ${isDragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900">Upload a document</h3>
          <p className="mt-1 text-sm text-gray-500">Drag and drop or click to select</p>
          <p className="mt-2 text-xs text-gray-400">PDF, DOCX, JPEG up to 50MB</p>
          <button 
            type="button"
            className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current?.click();
            }}
          >
            Select Files
          </button>
        </div>

        {/* Handwritten Toggle */}
        <div className="mt-6 flex items-center justify-between bg-slate-50 p-4 rounded-md border border-slate-200">
          <div className="flex items-center">
            <div className={`flex items-center justify-center h-10 w-10 rounded-full ${handwrittenMode ? 'bg-amber-100' : 'bg-gray-200'}`}>
              <FileText className={`h-6 w-6 ${handwrittenMode ? 'text-amber-600' : 'text-gray-500'}`} />
            </div>
            <div className="ml-4">
              <h4 className="text-sm font-medium text-gray-900">Handwritten Data Review</h4>
              <p className="text-xs text-gray-500">Enable if uploading handwritten notes. Flag for manual verification.</p>
            </div>
          </div>
          <button
            onClick={() => setHandwrittenMode(!handwrittenMode)}
            className={`${handwrittenMode ? 'bg-amber-600' : 'bg-gray-200'} relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none`}
          >
            <span
              aria-hidden="true"
              className={`${handwrittenMode ? 'translate-x-5' : 'translate-x-0'} pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
            />
          </button>
        </div>
      </div>

      {/* Recent Uploads List */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Activity</h3>
        </div>
        <ul className="divide-y divide-gray-200">
          {files.map((file) => (
            <li key={file.id}>
              <div className="px-4 py-4 sm:px-6 hover:bg-gray-50 transition ease-in-out duration-150">
                <div className="flex items-center justify-between">
                  <div className="flex items-center truncate">
                    <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500">
                      {file.type.includes('image') ? <ImageIcon size={20} /> : <FileText size={20} />}
                    </div>
                    <div className="ml-4 truncate">
                      <div className="text-sm font-medium text-blue-600 truncate">{file.name}</div>
                      <div className="text-sm text-gray-500">{file.size} • {file.type.split('/')[1]?.toUpperCase() || 'FILE'}</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    {getStatusBadge(file.status)}
                    <div className="mt-2 text-xs text-gray-400">
                        {file.status === DocumentStatus.UPLOADING ? `${Math.round(file.progress)}%` : 'Uploaded just now'}
                    </div>
                  </div>
                </div>
                
                {/* Progress Bar for Uploading and OCR Processing */}
                {(file.status === DocumentStatus.UPLOADING || file.status === DocumentStatus.PROCESSING_OCR) && (
                   <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                     <div 
                        className={`h-1.5 rounded-full transition-all duration-300 ease-out ${file.status === DocumentStatus.UPLOADING ? 'bg-blue-600' : 'bg-indigo-500'}`} 
                        style={{ width: `${file.progress}%` }}
                     ></div>
                   </div>
                )}

                {file.status === DocumentStatus.REQUIRES_VERIFICATION && (
                   <div className="mt-2 flex justify-end">
                     <button 
                       onClick={() => handleReview(file.name)}
                       className="flex items-center text-xs text-amber-700 hover:text-amber-900 font-medium px-2 py-1 hover:bg-amber-50 rounded"
                     >
                       <Eye size={12} className="mr-1" /> Review Extracted Data
                     </button>
                   </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DocumentIntake;