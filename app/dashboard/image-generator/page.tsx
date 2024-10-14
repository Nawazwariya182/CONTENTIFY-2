'use client'

import { useState } from "react";
import { generateImage } from "@/utils/generateImage";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Image, Loader2Icon } from "lucide-react";
import Link from "next/link";

export default function Component() {
  const [prompt, setPrompt] = useState("");
  const [size, setSize] = useState("1024x1024");
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const generatedImage = await generateImage(prompt, size);

    if (generatedImage) {
      setImage(generatedImage);
    } else {
      console.error("Failed to generate image.");
    }

    setLoading(false);
  };

  return (
    <div className="grid md:grid-cols-2 gap-8 w-full max-w-6xl mx-auto py-12 px-4">
      <div className="flex flex-col gap-6">
        <Link href={"/dashboard"}>
          <Button className="bg-prim text-back hover:bg-white hover:text-text hover:border-2 hover:border-acc transition-all w-20" style={{ cursor: 'url(/poin.png), auto' }}>
            <ArrowLeft /> Back
          </Button>
        </Link>
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">Image Generation</h1>
          <p className="text-muted-foreground">Create stunning images from text prompts using our advanced AI model.</p>
          <p className="text-red-500 text-sm">The image will not be saved!!</p>
        </div>
        <form className="grid gap-4" onSubmit={handleSubmit}>
          <div className="grid gap-2">
            <Label htmlFor="prompt">Prompt</Label>
            <Textarea
              id="prompt"
              placeholder="Enter a description of the image you want to generate..."
              rows={1}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              style={{ cursor: 'url(/type.png), auto' }}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="size">Size</Label>
            <Select value={size} onValueChange={(value) => setSize(value)} >
              <SelectTrigger className="w-full" style={{ cursor: 'url(/poin.png), auto' }}>
                <SelectValue placeholder="Select size" />
              </SelectTrigger>
              <SelectContent >
                <SelectItem value="1024x1024" style={{ cursor: 'url(/curs.png), auto' }}>1024x1024</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full flex items-center justify-center bg-prim hover:bg-back hover:text-acc hover:border-2 hover:border-prim" disabled={loading} style={{ cursor: 'url(/poin.png), auto' }}>
            {loading ? (
              <>
                <Loader2Icon className="animate-spin text-text mr-2 font-bold" />
                Generating
              </>
            ) : (
              "Generate Image"
            )}
          </Button>
        </form>
      </div>
      <div className="flex items-center justify-center border-2 border-text/80 rounded-xl">
        {image ? (
          <img
            src={image}
            alt="Generated Image"
            width={800}
            height={800}
            className="max-w-full h-auto rounded-lg shadow-lg"
            style={{ aspectRatio: "800/800", objectFit: "cover" }}
          />
        ) : (
          <Image />
        )}
      </div>
    </div>
  );
}
