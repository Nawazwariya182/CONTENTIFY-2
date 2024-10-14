import { NextResponse } from 'next/server';
import { db } from '@/utils/db';
import { aioutput } from '@/utils/schema';
import { desc, eq } from 'drizzle-orm';
import { currentUser } from '@clerk/nextjs/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    console.log('Fetching current user...');
    const user = await currentUser();
    if (!user?.emailAddresses[0]) {
      console.error('User not authenticated');
      return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
    }

    const email = user.emailAddresses[0].emailAddress;
    console.log(`Authenticated user email: ${email}`);

    console.log('Running database query...');
    const data = await db
      .select()
      .from(aioutput)
      .where(eq(aioutput.createby, email))
      .orderBy(desc(aioutput.createdat))
      .execute();

    console.log('Database query successful:', data);

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error occurred in GET request:', error);
    return NextResponse.json({ error: 'Error fetching data' }, { status: 500 });
  }
}