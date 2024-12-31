import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/utils/db';
import { aioutput } from '@/utils/schema';
import { desc, eq } from 'drizzle-orm';
import { auth } from '@clerk/nextjs/server';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    if (!db) {
      console.error('Database connection not established');
      return NextResponse.json({ error: 'Database connection error' }, { status: 500 });
    }

    const { userId } = auth();
    if (!userId) {
      console.error('User not authenticated');
      return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
    }

    const data = await db
      .select()
      .from(aioutput)
      .where(eq(aioutput.createby, userId))
      .orderBy(desc(aioutput.createdat))
      .execute();

    console.log('Fetched data:', data);

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ error: 'Error fetching data' }, { status: 500 });
  }
}