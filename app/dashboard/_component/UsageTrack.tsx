'use client';
import { useContext, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { eq } from 'drizzle-orm';
import { db } from '@/utils/db';
import { aioutput } from '@/utils/schema';
import { TotalUsageContext } from '@/app/(context)/TotalUsageContext';
import { UpdateContext } from '@/app/(context)/UpdateContext';

interface HistoryItem {
  airesponse: string | null;
}

const UsageTrack: React.FC = () => {
  const { user } = useUser();
  const { totalUsage, setTotalUsage } = useContext(TotalUsageContext);
  const { UpdateCredit } = useContext(UpdateContext);

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  useEffect(() => {
    if (user && UpdateCredit) {
      fetchData();
    }
  }, [UpdateCredit, user]);

  const fetchData = async () => {
    try {
      const userEmail = user?.primaryEmailAddress?.emailAddress;
      if (!userEmail) return;

      const results: HistoryItem[] = await db
        .select()
        .from(aioutput)
        .where(eq(aioutput.createby, userEmail));

      calculateTotalUsage(results);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const calculateTotalUsage = (results: HistoryItem[]) => {
    const totalUsage = results.reduce((acc, { airesponse: prim }) => {
      if (prim && typeof prim === 'string') {
        return acc + Math.floor(prim.length / 5.532); // Adjust the divisor as needed
      }
      return acc;
    }, 0);

    setTotalUsage(totalUsage);
    console.log('Calculated total usage:', totalUsage);
  };

  return (
    <div className='m-5 z-1000 border-2 border-text rounded-xl' style={{ cursor: 'url(/poin.png), auto' }}>
      <div className='bg-prim text-white rounded-lg p-3 font-p'>
        <h2 className='font-medium'>Credits</h2>
        <div className='h-2 bg-second/25 w-full rounded-full'>
          <div
            className='h-2 bg-white rounded-full'
            style={{ width: `${(totalUsage / 100000) * 100}%` }}
          />
        </div>
        <h2 className='text-xs my-2'>{totalUsage}/100000 Creditsa</h2>
      </div>
    </div>
  );
};

export default UsageTrack;
