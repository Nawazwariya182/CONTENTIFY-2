import { NextResponse } from 'next/server';
import { db } from '@/utils/db';
import { aioutput } from '@/utils/schema';
import { sql } from 'drizzle-orm';

export const dynamic = 'force-dynamic';

export async function GET() {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json(
      { error: 'Debug endpoint only available in development' },
      { status: 403 }
    );
  }

  try {
    // Get database statistics
    const stats = await db
      .select({
        totalCount: sql<number>`count(*)`,
        uniqueUsers: sql<number>`count(distinct createby)`,
        latestRecord: sql<string>`max(createdat)`,
        sampleUsers: sql<string[]>`array_agg(distinct createby) limit 5`
      })
      .from(aioutput);

    // Get sample records
    const samples = await db
      .select()
      .from(aioutput)
      .limit(2);

    return NextResponse.json({
      stats: stats[0],
      samples: samples.map(s => ({
        ...s,
        airesponse: s.airesponse.substring(0, 50) + '...'
      }))
    });

  } catch (error) {
    return NextResponse.json({
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: process.env.NODE_ENV === 'development' ? error instanceof Error ? error.stack : undefined : undefined
    }, { status: 500 });
  }
}

