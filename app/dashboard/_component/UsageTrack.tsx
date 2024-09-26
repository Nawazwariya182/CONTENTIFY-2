'use client'
import { useContext, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { eq } from 'drizzle-orm';
import { db } from '@/utils/db';
import { aioutput } from '@/utils/schema';
import { TotalUsageContext } from '@/app/(context)/TotalUsageContext';
import { UpdateContext } from '@/app/(context)/UpdateContext';

interface HISTORY {
  airesponse: string | null;
}

function UsageTrack() {
  const { user } = useUser();
  const { totalUsage, setTotalUsage } = useContext(TotalUsageContext);
  const { UpdateCredit } = useContext(UpdateContext);

  useEffect(() => {
    if (user) {
      GetData();
    }
  }, [user]);

  useEffect(() => {
    if (user && UpdateCredit) {
      GetData();
    }
  }, [UpdateCredit, user]);

  const GetData = async () => {
    try {
      if (!user?.primaryEmailAddress?.emailAddress) return;

      const result: HISTORY[] = await db
        .select()
        .from(aioutput)
        .where(eq(aioutput.createby, user.primaryEmailAddress.emailAddress));

      totalUsageCalculation(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const totalUsageCalculation = (result: HISTORY[]) => {
    let total = 0;
    result.forEach(element => {
      if (element.airesponse && typeof element.airesponse === 'string') {
        total += Math.floor(element.airesponse.length / 5.532); // Adjust the divisor as needed
      }
    });
    setTotalUsage(total);
    console.log('Calculated total usage:', total);
  }

  return (
    <div className='m-5 z-1000'>
      <div className='bg-primary text-white rounded-lg p-3 font-p'>
        <h2 className='font-medium'>Credits</h2>
        <div className='h-2 bg-gray-600 w-full rounded-full'>
          <div className='h-2 bg-white rounded-full' style={{ width: `${(totalUsage / 100000) * 100}%` }} />
        </div>
        <h2 className='text-xs my-2'>{totalUsage}/100000 Credits</h2>
      </div>
    </div>
  );
}

export default UsageTrack;
