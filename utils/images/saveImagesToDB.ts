import { db } from '@/utils/db';
import { imageGen } from '../schemas/imagegenschema';

export async function saveImagesToDB(imageUrls: string[], prompt: string, style: string, userId: string | undefined) {
  if (!userId) {
    throw new Error("User ID is required to save images");
  }

  await db.insert(imageGen).values({
    userId,
    prompt,
    style,
    imageUrls: JSON.stringify(imageUrls),
    creditUsed: imageUrls.length * 300
  });
}