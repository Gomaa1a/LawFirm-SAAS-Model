import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Database, 
  ScanLine, 
  MessageSquare, 
  Clock, 
  TrendingUp, 
  AlertCircle 
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { WorkflowItem } from '../types';

const data = [
  { name: 'Week 1', scans: 120, queries: 400 },
  { name: 'Week 2', scans: 150, queries: 600 },
  { name: 'Week 3', scans: 200, queries: 800 },
  { name: 'Week 4', scans: 180, queries: 750 },
];

const pendingWorkflows: WorkflowItem[] = [
  { id: '1', title: 'NDA - TechCorp Oman', initiator: 'Sarah Al-Balushi', status: 'Pending', dueDate: '2023-11-15' },
  { id: '2', title: 'Lease - Muscat Hills', initiator: 'Ahmed Al-Lawati', status: 'Pending', dueDate: '2023-11-16' },
  { id: '3', title: 'Emp. Contract - J. Smith', initiator: 'HR Department', status: 'Pending', dueDate: '2023-11-18' },
];

const StatCard: React.FC<{ 
  title: string; 
  value: string; 
  limit: string; 
  icon: React.ElementType; 
  color: string 
}> = ({ title, value, limit, icon: Icon, color }) => (
  <div className="bg-white overflow-hidden shadow rounded-lg border-b-4" style={{ borderColor: color }}>
    <div className="p-5">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <Icon className="h-6 w-6 text-gray-400" aria-hidden="true" />
        </div>
        <div className="ml-5 w-0 flex-1">
          <dl>
            <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
            <dd>
              <div className="text-lg font-medium text-gray-900">{value}</div>
            </dd>
          </dl>
        </div>
      </div>
    </div>
    <div className="bg-gray-50 px-5 py-3">
      <div className="text-sm">
        <span className="text-gray-500 font-medium">{limit}</span>
      </div>
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleReview = (id: string) => {
    alert(`Opening review interface for workflow ID: ${id}`);
  };

  const handleReject = (id: string) => {
    if(window.confirm('Are you sure you want to reject this workflow?')) {
      alert(`Workflow ID: ${id} has been rejected.`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Executive Dashboard</h1>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Documents Stored" 
          value="124.5 GB" 
          limit="Capacity: 500GB" 
          icon={Database} 
          color="#3b82f6" 
        />
        <StatCard 
          title="Monthly OCR Scans" 
          value="450 / 1,000" 
          limit="45% Utilized" 
          icon={ScanLine} 
          color="#10b981" 
        />
        <StatCard 
          title="Chatbot Queries" 
          value="2,100 / 5,000" 
          limit="42% Utilized" 
          icon={MessageSquare} 
          color="#8b5cf6" 
        />
        <StatCard 
          title="Pending Approvals" 
          value="7 Items" 
          limit="Action Required" 
          icon={Clock} 
          color="#f59e0b" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="bg-white shadow rounded-lg p-6 lg:col-span-2">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-gray-500" />
            System Usage (Current Month)
          </h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                />
                <Bar dataKey="scans" name="OCR Scans" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="queries" name="AI Queries" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pending Workflows List */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4 flex items-center">
            <AlertCircle className="w-5 h-5 mr-2 text-gray-500" />
            Pending Workflows
          </h3>
          <ul className="divide-y divide-gray-200">
            {pendingWorkflows.map((item) => (
              <li key={item.id} className="py-4 flex flex-col">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-900">{item.title}</span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                    {item.status}
                  </span>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>By: {item.initiator}</span>
                  <span>Due: {item.dueDate}</span>
                </div>
                <div className="mt-2 flex justify-end space-x-2">
                   <button 
                     onClick={() => handleReview(item.id)}
                     className="text-xs text-blue-600 hover:text-blue-800 px-2 py-1 rounded hover:bg-blue-50 transition-colors"
                   >
                     Review
                   </button>
                   <button 
                     onClick={() => handleReject(item.id)}
                     className="text-xs text-red-600 hover:text-red-800 px-2 py-1 rounded hover:bg-red-50 transition-colors"
                   >
                     Reject
                   </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4 text-center">
            <button 
              onClick={() => navigate('/documents')}
              className="text-sm text-blue-600 font-medium hover:text-blue-500"
            >
              View all workflows &rarr;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;