'use client'

import { useState, useContext } from "react";
import { generateAlternativePrompts } from "@/utils/images/generateEnhancedPrompts";
import { saveImagesToDB } from "@/utils/images/saveImagesToDB";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Image, Loader2Icon, ExternalLink } from 'lucide-react';
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useUser } from '@clerk/nextjs';
import { TotalUsageContext } from '@/app/(context)/TotalUsageContext';

const styles = [
  "Cinematic",
  "Art",
  "Anime",
  "Photorealistic",
  "Abstract",
  "Cartoon",
  "Mystery"
];

export default function UpdatedImageGenerator() {
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("");
  const [imageCount, setImageCount] = useState(1);
  const [enhancedPrompts, setEnhancedPrompts] = useState<string[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useUser();
  const { totalUsage, setTotalUsage } = useContext(TotalUsageContext);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (totalUsage + imageCount * 300 > 20000) {
      toast({
        title: "Not enough credits",
        description: "You don't have enough credits to generate these images.",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    try {
      const selectedStyle = style === "Mystery" ? styles[Math.floor(Math.random() * (styles.length - 1))] : style;
      const generatedPrompts = await generateAlternativePrompts(prompt, selectedStyle, imageCount);
      setEnhancedPrompts(generatedPrompts);

      const generatedImages = generatedPrompts.map(enhancedPrompt =>
        `https://image.pollinations.ai/prompt/${encodeURIComponent(enhancedPrompt)}`
      );

      if (generatedImages.length > 0) {
        setImages(generatedImages);
        await saveImagesToDB(generatedImages, prompt, selectedStyle, user?.id);
        setTotalUsage((prevUsage: number) => prevUsage + imageCount * 300);
        toast({
          title: "Images generated successfully",
          description: `${generatedImages.length} image(s) have been generated and saved.`,
        });
      } else {
        toast({
          title: "Generation failed",
          description: "Failed to generate images. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error generating images:", error);
      toast({
        title: "Error",
        description: "An error occurred while generating images.",
        variant: "destructive",
      });
    }

    setLoading(false);
  };

  return (
    <div className="w-full max-w-6xl mx-auto py-12 px-4">
      <div className="flex flex-col gap-6 mb-8">
        <Link href="/dashboard">
          <Button className="bg-prim hover:bg-back hover:text-acc hover:border-2 hover:border-prim transition-all w-20" style={{ cursor: 'url(/poin.png), auto' }}>
            <ArrowLeft className="text-xl" /> Back
          </Button>
        </Link>
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">Image Generation</h1>
          <p className="text-muted-foreground">Create stunning images from text prompts using our advanced AI model with style options.</p>
        </div>
        <form className="grid gap-4" onSubmit={handleSubmit}>
          <div className="grid gap-2">
            <Label htmlFor="prompt">Prompt</Label>
            <Textarea
              id="prompt"
              placeholder="Enter a description of the image you want to generate..."
              rows={3}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="resize-none"
              style={{ cursor: 'url(/type.png), auto' }}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="style">Style</Label>
            <Select value={style} onValueChange={setStyle}>
              <SelectTrigger style={{ cursor: 'url(/poin.png), auto' }}>
                <SelectValue placeholder="Select a style" style={{ cursor: 'url(/poin.png), auto' }}/>
              </SelectTrigger>
              <SelectContent style={{ cursor: 'url(/poin.png), auto' }}>
                {styles.map((s) => (
                  <SelectItem key={s} value={s} style={{ cursor: 'url(/poin.png), auto' }}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="imageCount">Number of Images (1-3)</Label>
            <Input
              id="imageCount"
              type="number"
              min={1}
              max={3}
              value={imageCount}
              style={{ cursor: 'url(/type.png), auto' }}
              onChange={(e) => setImageCount(Math.min(3, Math.max(1, parseInt(e.target.value))))}
            />
          </div>
          <Button type="submit" className="w-full bg-prim hover:bg-back hover:text-acc hover:border-2 hover:border-prim" disabled={loading} style={{ cursor: 'url(/poin.png), auto' }}>
            {loading ? (
              <>
                <Loader2Icon className="animate-spin mr-2" />
                Generating
              </>
            ) : (
              "Generate Images"
            )}
          </Button>
        </form>
      </div>
      {enhancedPrompts.length > 0 && (
        <div className="mb-8">
          {/* <h2 className="text-2xl font-bold mb-4">Enhanced Prompts</h2> */}
          <ul className="list-disc pl-5 space-y-2">
            {/* {enhancedPrompts.map((prompt, index) => (
              <li key={index}>
                <a
                  href={`https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline flex items-center"
                  style={{ cursor: 'url(/poin.png), auto' }}
                >
                  {prompt}
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </li>
            ))} */}
          </ul>
        </div>
      )}
      {images.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <div key={index} className="relative group">
              <img
                src={image}
                alt={`Generated Image ${index + 1}`}
                className="w-full h-auto rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Button
                  onClick={() => window.open(image, '_blank')}
                  className="bg-white text-black hover:bg-gray-200"
                  style={{ cursor: 'url(/poin.png), auto' }}
                >
                  Download
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
      {images.length === 0 && (
        <div className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-xl h-64">
          <Image className="text-gray-400" size={48} />
        </div>
      )}
    </div>
  );
}

