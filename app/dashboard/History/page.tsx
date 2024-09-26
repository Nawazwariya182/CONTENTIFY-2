'use client'; // This component should be client-side

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader } from 'lucide-react';

// Define the props for TemplateCard
interface TemplateCardProps {
  name: string;
  desc: string;
}

// Simplified TemplateCard component with props typing
const TemplateCard: React.FC<TemplateCardProps> = ({ name, desc }) => (
  <div className="p-2 border border-gray-200 rounded-md">
    <p className="font-bold">{name}</p>
    <p>{desc}</p>
  </div>
);

export interface HISTORY {
  airesponse: string;
  createby: string;
  createdAt: string;
  formdata: string;
  id: number;
  templateslug: string;
}

const History: React.FC = () => {
  const [historyData, setHistoryData] = useState<HISTORY[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/history');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Fetched data:', data); // Confirm data structure here
        setHistoryData(data);
      } catch (error) {
        setError('Error fetching data');
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const cleanAIResponse = (response: string) => {
    // Replace unwanted characters and limit the response length
    const cleanedResponse = response.replace(/[#`*]/g, '').trim();
    return cleanedResponse.length > 100 ? `${cleanedResponse.slice(0, 100)}...` : cleanedResponse;
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">History</h1>
      <p className="mb-6 text-sm">Search your previously generated AI content</p>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-secondary">
            <tr>
              <th className="py-2 px-4 text-primary text-sm">Template</th>
              <th className="py-2 px-4 text-primary text-sm">AI Resp</th>
              <th className="py-2 px-4 text-primary text-sm">Words</th>
              <th className="py-2 px-4 text-primary text-sm">Copy</th>
            </tr>
          </thead>
          <tbody>
            {historyData.length > 0 ? (
              historyData.map((item) => (
                <tr key={item.id} className="border-t">
                  <td className="py-2 px-4 text-sm">
                    <div className="flex items-center">
                      <span className='text-primary font-bold'>{item.templateslug}</span>
                    </div>
                  </td>
                  <td className="py-2 px-4 text-sm">{cleanAIResponse(item.airesponse)}</td>
                  <td className="py-2 px-4 text-sm">{item.airesponse ? item.airesponse.split(' ').length : 'N/A'}</td>
                  <td className="py-2 px-4 text-sm">
                    <Button
                      className="text-white py-1 px-3 rounded text-sm"
                      style={{ cursor: 'url(/poin.png), auto' }}
                      onClick={() => item.airesponse && navigator.clipboard.writeText(item.airesponse)}
                    >
                      Copy
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="py-4 px-4 text-center">
                  <div className="flex items-center justify-center w-full h-full">
                    <Loader />
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default History;
