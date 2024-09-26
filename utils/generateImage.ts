export async function generateImage(prompt: string, size: string, model: string): Promise<string | null> {
  try {
    const response = await fetch(`https://api-inference.huggingface.co/models/${model}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          size: size, // Ensure the size parameter is supported by the API
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    // Handle binary data (image) directly
    const blob = await response.blob();
    const imageUrl = URL.createObjectURL(blob);

    return imageUrl;  // Return the image URL for display in your application
  } catch (error) {
    console.error("Error generating image:", error);
    return null;
  }
}
