// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
// import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
// import { Button } from "@/components/ui/button"

// export default function Component() {
//   return (
//     <div className="grid md:grid-cols-2 gap-8 w-full max-w-6xl mx-auto py-12 px-4">
//       <div className="flex flex-col gap-6">
//         <div className="space-y-4">
//           <h1 className="text-4xl font-bold">Image Generation</h1>
//           <p className="text-muted-foreground">Create stunning images from text prompts using our advanced AI model.</p>
//         </div>
//         <form className="grid gap-4">
//           <div className="grid gap-2">
//             <Label htmlFor="prompt">Prompt</Label>
//             <Textarea id="prompt" placeholder="Enter a description of the image you want to generate..." rows={3} />
//           </div>
//           <div className="grid md:grid-cols-2 gap-4">
//             <div className="grid gap-2">
//               <Label htmlFor="size">Size</Label>
//               <Select defaultValue="512x512">
//                 <SelectTrigger className="w-full">
//                   <SelectValue placeholder="Select size" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="256x256">256x256</SelectItem>
//                   <SelectItem value="512x512">512x512</SelectItem>
//                   <SelectItem value="1024x1024">1024x1024</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>
//           <Button type="submit" className="w-full">
//             Generate Image
//           </Button>
//         </form>
//       </div>
//       <div className="flex items-center justify-center">
//         <img
//           src="/placeholder.svg"
//           alt="Generated Image"
//           width={800}
//           height={800}
//           className="max-w-full h-auto rounded-lg shadow-lg"
//           style={{ aspectRatio: "800/800", objectFit: "cover" }}
//         />
//       </div>
//     </div>
//   )
// }
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
  const [size, setSize] = useState("512x512");
  const [model, setModel] = useState("dreamlike-photoreal-2.0");
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const generatedImage = await generateImage(prompt, size, model);

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
          <Button className="bg-black text-white hover:bg-white hover:text-black hover:border-2 hover:border-black transition-all w-20">
            <ArrowLeft/>  Back
          </Button>
          </Link>
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">Image Generation</h1>
          <p className="text-muted-foreground">Create stunning images from text prompts using our advanced AI model.</p>
          <p className="text-red-500 text-sm">The image will not be saved.</p>
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
            />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="size">Size</Label>
              <Select value={size} onValueChange={(value) => setSize(value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="256x256">256x256</SelectItem>
                  <SelectItem value="512x512">512x512</SelectItem>
                  <SelectItem value="1024x1024">1024x1024</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="model">Model</Label>
              <Select value={model} onValueChange={(value) => setModel(value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dreamlike-art/dreamlike-photoreal-2.0">dreamlike-photoreal-2.0</SelectItem>
                  <SelectItem value="stabilityai/stable-diffusion-2">Stable Diffusion 2</SelectItem>
                  <SelectItem value="runwayml/stable-diffusion-v1-5">Stable Diffusion v1.5</SelectItem>
                  <SelectItem value="prompthero/openjourney-v4">OpenJourney v4</SelectItem>
                  <SelectItem value="CompVis/stable-diffusion-v1-4">CompVis/stable-diffusion-v1-4</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button type="submit" className="w-full flex items-center justify-center" disabled={loading}>
            {loading ? (
              <>
                <Loader2Icon className="animate-spin text-black mr-2 font-bold" />
                Generating
              </>
            ) : (
              "Generate Image"
            )}
          </Button>
        </form>
      </div>
      <div className="flex items-center justify-center">
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
