/*
  Copyright © 2025 Nawaz & Tabish All rights reserved.
  Project: Contentify (Proprietary Software)
  
  This code is the exclusive property of the copyright holder.
  Unauthorized copying, modification, redistribution, or use of any part
  of this codebase — including the name “Contentify” — is strictly prohibited.

  This software is confidential and proprietary. By accessing or using this code,
  you agree to comply with the terms set forth in the LICENSE file.
*/
import { NextResponse } from 'next/server';
import { db } from '@/utils/db';
import { aioutput } from '@/utils/schema';
import { desc, eq } from 'drizzle-orm';
import { currentUser } from '@clerk/nextjs/server';

export const dynamic = 'force-dynamic';

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