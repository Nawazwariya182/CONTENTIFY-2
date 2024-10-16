// app/api/history/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/utils/db'; // Import server-side db instance
import { aioutput } from '@/utils/schema';
import { desc, eq } from 'drizzle-orm';
import { currentUser } from '@clerk/nextjs/server'; // Adjust import based on actual use

export async function GET() {
  try {
    const user = await currentUser();
    if (!user?.emailAddresses[0]) {
      console.error('User not authenticated');
      return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
    }

    const email = user.emailAddresses[0].emailAddress;
    console.log(`Authenticated user email: ${email}`);

    const data = await db.select().from(aioutput).where(eq(aioutput.createby, email)).orderBy(desc(aioutput.createdat)).execute();
    console.log('Fetched data:', data);

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ error: 'Error fetching data' }, { status: 500 });
  }
}
