/*
  Copyright © 2025 Nawaz & Tabish All rights reserved.
  Project: Contentify (Proprietary Software)
  
  This code is the exclusive property of the copyright holder.
  Unauthorized copying, modification, redistribution, or use of any part
  of this codebase — including the name “Contentify” — is strictly prohibited.

  This software is confidential and proprietary. By accessing or using this code,
  you agree to comply with the terms set forth in the LICENSE file.
*/
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { CalendarDaysIcon, UserIcon } from "lucide-react";

export default function Component() {
  return (
    <div className="flex flex-col min-h-dvh">
      <main className="container max-w-6xl px-4 md:px-6 py-12 flex gap-8">
        <div className="flex-1">
          <div className="grid gap-8">
            <article className="grid md:grid-cols-[200px_1fr] gap-6">
              <img
                src="https://www.contentrefined.com/wp-content/uploads/2024/05/human-hand-and-robot-hand-touching-fingertips-1200x694.jpg"
                width={200}
                height={150}
                alt="Blog Post Image"
                className="rounded-lg object-cover"
                style={{ aspectRatio: "200/150", objectFit: "cover" }}
              />
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <UserIcon className="w-4 h-4" />
                  <span>Content Refined</span>
                  <Separator orientation="vertical" />
                  <CalendarDaysIcon className="w-4 h-4" />
                  <span>August 9, 2024</span>
                </div>
                <h2 className="text-2xl font-bold">
                  <Link
                    href="https://www.contentrefined.com/ai-for-content-creation/"
                    className="hover:underline"
                    prefetch={false}
                    style={{ cursor: "url(/poin.png), auto" }}
                  >
                    The Future of Content Creation: How AI Is Revolutionizing
                    the Landscape
                  </Link>
                </h2>
                <p className="text-muted-foreground">
                  Explore the latest advancements in AI technology and how they
                  are transforming the content creation landscape.
                </p>
              </div>
            </article>
            <article className="grid md:grid-cols-[200px_1fr] gap-6">
              <img
                src="https://www.ralecon.com/blog/wp-content/uploads/2024/03/Unleashing-the-Potential-of-AI-Revolutionize-Your-Content-Creation-Workflow.png"
                width={200}
                height={150}
                alt="Blog Post Image"
                className="rounded-lg object-cover"
                style={{ aspectRatio: "200/150", objectFit: "cover" }}
              />
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <UserIcon className="w-4 h-4" />
                  <span>Ralecon</span>
                  <Separator orientation="vertical" />
                  <CalendarDaysIcon className="w-4 h-4" />
                  <span>Mar 1, 2024</span>
                </div>
                <h2 className="text-2xl font-bold">
                  <Link
                    href="#"
                    className="hover:underline"
                    prefetch={false}
                    style={{ cursor: "url(/poin.png), auto" }}
                  >
                    Unleashing the Potential of AI: Revolutionize Your Content
                    Creation Workflow
                  </Link>
                </h2>
                <p className="text-muted-foreground">
                  Discover how AI-powered content generation can streamline your
                  workflow and boost your productivity.
                </p>
              </div>
            </article>
            <article className="grid md:grid-cols-[200px_1fr] gap-6">
              <img
                src="https://miro.medium.com/v2/format:webp/0*pf6_GeVyoCQOnXRX"
                width={200}
                height={150}
                alt="Blog Post Image"
                className="rounded-lg object-cover"
                style={{ aspectRatio: "200/150", objectFit: "cover" }}
              />
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <UserIcon className="w-4 h-4" />
                  <span>Chase Gison</span>
                  <Separator orientation="vertical" />
                  <CalendarDaysIcon className="w-4 h-4" />
                  <span>Apr 10, 2024</span>
                </div>
                <h2 className="text-2xl font-bold">
                  <Link
                    href="#"
                    className="hover:underline"
                    prefetch={false}
                    style={{ cursor: "url(/poin.png), auto" }}
                  >
                    Mastering the Art of AI-Enhanced Content Curation
                  </Link>
                </h2>
                <p className="text-muted-foreground">
                  Learn how to leverage AI to curate and deliver the most
                  relevant and engaging content to your audience.
                </p>
              </div>
            </article>
          </div>
        </div>
        <div className="w-full md:w-80 space-y-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-acc">Categories</h3>
            <div className="grid gap-2">
              <Link
                href="#"
                className="text-sm font-medium hover:underline underline-offset-4"
                prefetch={false}
                style={{ cursor: "url(/poin.png), auto" }}
              >
                AI and Machine Learning
              </Link>
              <Link
                href="#"
                className="text-sm font-medium hover:underline underline-offset-4"
                prefetch={false}
                style={{ cursor: "url(/poin.png), auto" }}
              >
                Content Creation
              </Link>
              <Link
                href="#"
                className="text-sm font-medium hover:underline underline-offset-4"
                prefetch={false}
                style={{ cursor: "url(/poin.png), auto" }}
              >
                Automation
              </Link>
              <Link
                href="#"
                className="text-sm font-medium hover:underline underline-offset-4"
                prefetch={false}
                style={{ cursor: "url(/poin.png), auto" }}
              >
                Productivity
              </Link>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Recent Posts</h3>
            <div className="grid gap-4">
              <Link
                href="#"
                className="flex items-center gap-4 hover:underline underline-offset-4"
                prefetch={false}
                style={{ cursor: "url(/poin.png), auto" }}
              >
                <img
                  src="https://images.pexels.com/photos/18069694/pexels-photo-18069694.png?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                  width={64}
                  height={64}
                  alt="Recent Post Image"
                  className="rounded-lg object-cover"
                  style={{ aspectRatio: "64/64", objectFit: "cover" }}
                />
                <div className="space-y-1">
                  <h4 className="text-sm font-medium">
                    Unlocking the Potential of AI-Powered Content Generation
                  </h4>
                  <p className="text-xs text-muted-foreground">May 1, 2023</p>
                </div>
              </Link>
              <Link
                href="#"
                className="flex items-center gap-4 hover:underline underline-offset-4"
                prefetch={false}
                style={{ cursor: "url(/poin.png), auto" }}
              >
                <img
                  src="https://cdn.prod.website-files.com/64ac08fa304942f11983252c/6505c4d164476bd280b23bbc_image-17.png"
                  width={64}
                  height={64}
                  alt="Recent Post Image"
                  className="rounded-lg object-cover"
                  style={{ aspectRatio: "64/64", objectFit: "cover" }}
                />
                <div className="space-y-1">
                  <h4 className="text-sm font-medium">
                    Mastering the Art of AI-Driven Content Curation
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    April 15, 2023
                  </p>
                </div>
              </Link>
              <Link
                href="#"
                className="flex items-center gap-4 hover:underline underline-offset-4"
                prefetch={false}
                style={{ cursor: "url(/poin.png), auto" }}
              >
                <img
                  src="https://storage.googleapis.com/texta-ai.appspot.com/generated-images%2F1720553332580_gtfoj7.png"
                  width={64}
                  height={64}
                  alt="Recent Post Image"
                  className="rounded-lg object-cover"
                  style={{ aspectRatio: "64/64", objectFit: "cover" }}
                />
                <div className="space-y-1">
                  <h4 className="text-sm font-medium">
                    The Future of AI: Revolutionizing Content Creation
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    March 28, 2023
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
