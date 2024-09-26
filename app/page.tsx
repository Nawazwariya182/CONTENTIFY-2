import { Button } from "@/components/ui/button";
import { BarChartIcon, BoltIcon, BriefcaseIcon, FacebookIcon, InstagramIcon, LaptopIcon, LinkedinIcon, PaletteIcon, PencilIcon, TwitterIcon, YoutubeIcon } from "lucide-react";
import Image from "next/image";
import Link from 'next/link'
import Footer from "./dashboard/_component/Footer";

export default function Home() {
  return (
<div className="flex flex-col min-h-[100dvh] font-p"style={{ cursor: 'url(/curs.png), auto' }}>
      <header className="text-primary-foreground py-12 md:py-20" style={{ 
      background: 'url("/Back.svg") no-repeat center center', 
      backgroundSize: 'cover'
    }}>
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:items-center">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Unleash Your Creativity with AI
              </h1>
              <p className="max-w-[600px] text-lg text-primary-foreground/80">
                Discover the power of AI-driven content creation. Our platform helps you generate high-quality, engaging
                content with ease.
              </p>
              <div>
                <Link href={'/dashboard'}>
                <Button
                  className="inline-flex items-center justify-center rounded-md bg-primary-foreground px-6 py-3 text-sm font-medium text-primary transition-colors hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  style={{ cursor: 'url(/poin.png), auto' }}>
                  Get Started
                </Button>
                </Link>
              </div>
            </div>
            <div className="flex justify-center">
              <img
                src="/logo1.svg"
                width="500"
                height="500"
                alt="Hero"
                className="max-w-full rounded-lg object-cover p-20"
                style={{ aspectRatio: "50/50", objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="py-12 md:py-20">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="grid gap-4">
                <PencilIcon className="h-8 w-8 text-primary" />
                <h3 className="text-xl font-bold">Content Generation</h3>
                <p className="text-muted-foreground">
                  Effortlessly generate high-quality content for your projects, from blog posts to social media updates.
                </p>
              </div>
              <div className="grid gap-4">
                <PaletteIcon className="h-8 w-8 text-primary" />
                <h3 className="text-xl font-bold">Creative Ideation</h3>
                <p className="text-muted-foreground">
                  Unlock your creative potential with our AI-powered ideation tools, helping you brainstorm and explore
                  new content ideas.
                </p>
              </div>
              <div className="grid gap-4">
                <BoltIcon className="h-8 w-8 text-primary" />
                <h3 className="text-xl font-bold">Intelligent Optimization</h3>
                <p className="text-muted-foreground">
                  Leverage our advanced AI algorithms to optimize your content for maximum engagement and performance.
                </p>
              </div>
              <div className="grid gap-4">
                <LaptopIcon className="h-8 w-8 text-primary" />
                <h3 className="text-xl font-bold">Seamless Workflow</h3>
                <p className="text-muted-foreground">
                  Integrate our platform seamlessly into your existing content creation workflow, saving you time and
                  effort.
                </p>
              </div>
              <div className="grid gap-4">
                <BriefcaseIcon className="h-8 w-8 text-primary" />
                <h3 className="text-xl font-bold">Enterprise-Grade Security</h3>
                <p className="text-muted-foreground">
                  Rest assured that your content and data are secure with our enterprise-level security measures.
                </p>
              </div>
              <div className="grid gap-4">
                <BarChartIcon className="h-8 w-8 text-primary" />
                <h3 className="text-xl font-bold">Robust Analytics</h3>
                <p className="text-muted-foreground">
                  Gain valuable insights into your content performance with our comprehensive analytics and reporting
                  tools.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      {/* <div className="bg-muted text-muted-foreground py-6 w-full shrink-0">
        <div className="container px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm">&copy; 2024 AI Content Creator. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-sm hover:underline" >
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm hover:underline" >
              Terms of Service
            </Link>

              <Link href="#" aria-label="Twitter" >
                <InstagramIcon className="h-5 w-5" />
              </Link>
              <Link href="#" aria-label="Facebook" >
                <YoutubeIcon className="h-5 w-5" />
              </Link>
              <Link href="#" aria-label="LinkedIn" >
                <LinkedinIcon className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div> */}
        <Footer/>
      </div>
  
  );
}
