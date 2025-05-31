/*
  Copyright © 2025 Nawaz & Tabish All rights reserved.
  Project: Contentify (Proprietary Software)
  
  This code is the exclusive property of the copyright holder.
  Unauthorized copying, modification, redistribution, or use of any part
  of this codebase — including the name “Contentify” — is strictly prohibited.

  This software is confidential and proprietary. By accessing or using this code,
  you agree to comply with the terms set forth in the LICENSE file.
*/
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { CpuIcon, FilePenIcon, PenIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Component() {
  return (
    <div className="flex flex-col min-h-dvh bg-back text-text">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-back">
        <div className="container px-4 md:px-6 grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Unleash the Power of{" "}
                <span className="text-acc">AI-Generated Content</span>
              </h1>
              <p className="max-w-[600px] text-text/70 md:text-xl">
                Discover how our advanced AI technology can create engaging,
                informative content tailored to your needs. Unlock new
                possibilities for your business or personal projects.
              </p>
            </div>
          </div>
          <Image
          priority
            src="/g4.jpeg"
            alt="AI Content Generation"
            width={600}
            height={400}
            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
          />
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6 space-y-12">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                How it Works
              </h2>
              <p className="max-w-[900px] text-text/70 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our AI-powered content generation process is designed to deliver
                high-quality, tailored results. Let's break it down
                step-by-step.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-start gap-12 lg:grid-cols-3">
            <div className="grid gap-4">
              <div className="bg-prim rounded-md p-4 flex items-center justify-center">
                <PenIcon className="w-8 h-8 text-[#f4fdf3]" />
              </div>
              <h3 className="text-xl font-bold">Prompt Engineering</h3>
              <p className="text-text/70">
                Our team of experts crafts detailed prompts that capture your
                specific requirements, ensuring the AI generates content
                tailored to your needs.
              </p>
            </div>
            <div className="grid gap-4">
              <div className="bg-second rounded-md p-4 flex items-center justify-center">
                <CpuIcon className="w-8 h-8 text-text" />
              </div>
              <h3 className="text-xl font-bold">AI Content Generation</h3>
              <p className="text-text/70">
                Our advanced AI models analyze the prompt and leverage their
                vast knowledge to produce high-quality, original content in a
                matter of seconds.
              </p>
            </div>
            <div className="grid gap-4">
              <div className="bg-second/75 rounded-md p-4 flex items-center justify-center">
                <FilePenIcon className="w-8 h-8 text-text" />
              </div>
              <h3 className="text-xl font-bold">Review and Refine</h3>
              <p className="text-text/70">
                Our team reviews the generated content, providing feedback and
                making any necessary adjustments to ensure it meets your
                standards and expectations.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-back">
        <div className="container px-4 md:px-6 space-y-12">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Example Outputs
              </h2>
              <p className="max-w-[900px] text-text/70 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Check out some sample content generated by our AI to get a sense
                of the quality and versatility of our offerings.
              </p>
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            <Card className="h-full w-full bg-back border-prim">
              <CardHeader>
                <CardTitle>Blog Post</CardTitle>
                <CardDescription>
                  A 500-word blog post on the benefits of AI-generated content.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Image
          priority
                  src="/g.webp"
                  alt="Blog post illustration"
                  width={300}
                  height={200}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <p className="text-[#071504]/70">
                  "Artificial intelligence has revolutionized the way we
                  approach content creation. By leveraging the power of advanced
                  language models, businesses and individuals can now generate
                  high-quality, engaging content at a fraction of the time and
                  cost..."
                </p>
              </CardContent>
            </Card>
            <Card className="h-full w-full bg-back border-prim">
              <CardHeader>
                <CardTitle>Product Description</CardTitle>
                <CardDescription>
                  A detailed product description for a new smart home device.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Image
          priority
                  src="/g2.webp"
                  alt="Smart home device illustration"
                  width={300}
                  height={200}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <p className="text-text/70">
                  "Introducing the Acme Smart Home Hub, the ultimate solution
                  for seamless home automation. Powered by cutting-edge AI
                  technology, this compact device integrates with a wide range
                  of smart home devices..."
                </p>
              </CardContent>
            </Card>
            <Card className="h-full w-full bg-back border-prim">
              <CardHeader>
                <CardTitle>Social Media Post</CardTitle>
                <CardDescription>
                  A captivating social media post for a new product launch.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Image
          priority
                  src="/g3.webp"
                  alt="Social media post illustration"
                  width={300}
                  height={200}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <p className="text-text/70">
                  "Attention, tech enthusiasts! We're thrilled to announce the
                  launch of our latest innovation, the Acme Smartwatch. Designed
                  to revolutionize the way you track your fitness and stay
                  connected..."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6 space-y-12">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Ready to Elevate Your Content?
              </h2>
              <p className="max-w-[900px] text-text/70 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our AI-powered content generation service is here to help you
                create engaging, high-quality content with ease. Get started
                today and unlock new possibilities for your business or personal
                projects.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link
                href="/dashboard/Contact"
                className="inline-flex h-10 items-center justify-center rounded-md bg-prim px-8 text-sm font-medium text-back shadow transition-colors hover:bg-prim/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-acc disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
                style={{ cursor: "url(/poin.png), auto" }}
              >
                Contact Us
              </Link>
              <Link
                href="/dashboard/Pricing"
                className="inline-flex h-10 items-center justify-center rounded-md border border-prim bg-back px-8 text-sm font-medium shadow-sm transition-colors hover:bg-second hover:text-text focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-acc disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
                style={{ cursor: "url(/poin.png), auto" }}
              >
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
