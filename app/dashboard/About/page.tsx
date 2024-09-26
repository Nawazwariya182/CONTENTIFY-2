/**
 * v0 by Vercel.
 * @see https://v0.dev/t/Q4tXkSafipU
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@headlessui/react"
import { Link, MountainIcon } from "lucide-react"
import Image from "next/image"

export default function Component() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="bg-slate-100 text-primary-foreground py-12 md:py-20">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:items-center">
            <div className="space-y-4">
              <h1 className="text-4xl text-black font-bold tracking-tight sm:text-5xl md:text-6xl">
                Unleash Your Creativity with AI
              </h1>
              <p className="max-w-[600px] text-lg text-black">
                Discover the power of AI-driven content creation. Our platform helps you generate high-quality, engaging
                content with ease.
              </p>
              <div>
              </div>
            </div>
            <div className="flex justify-center">
              <img
                src="/logo.svg"
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
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-10 sm:px-10 md:gap-16 lg:grid-cols-2">
            <div className="space-y-4">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Our History</div>
              <h2 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                Pioneering the Future of the Content Creation
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Founded in 2024, Contentify is on a mission to empower businesses to thrive in the digital age. Over the past decade, we've evolved into a leading provider of innovative web solutions, enabling our clients to achieve their goals through cutting-edge technology and unparalleled service.
              </p>
            </div>
            <div className="flex flex-col items-start space-y-4">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Our Values</div>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed">
              At the heart of Contentify are our core values: innovation, integrity, and customer-centricity. We are driven by a relentless pursuit of excellence, always seeking new ways to push the boundaries of what's possible. Our commitment to ethical business practices and unwavering dedication to our clients' success are the foundations upon which we've built our reputation in content creation.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="space-y-4 text-center">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Our Team</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Meet the Contentify Team</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our talented team of experts is dedicated to delivering exceptional results for our clients. Get to know
              the individuals who make Contentify a success.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <div className="flex flex-col items-center justify-center space-y-2">
              <Avatar className="h-24 w-24">
                <AvatarImage src="/placeholder-user.jpg" alt="John Doe" />
                <AvatarFallback>#NW</AvatarFallback>
              </Avatar>
              <div className="text-center">
                <h3 className="text-lg font-semibold">Nawaz Wariya</h3>
                <p className="text-muted-foreground">CEO, Manager & Senior Developer</p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center space-y-2">
              <Avatar className="h-24 w-24">
                <AvatarImage src="/placeholder-user.jpg" alt="Jane Smith" />
                <AvatarFallback>SK</AvatarFallback>
              </Avatar>
              <div className="text-center">
                <h3 className="text-lg font-semibold">Shaikh Tabish</h3>
                <p className="text-muted-foreground">CTO</p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center space-y-2">
              <Avatar className="h-24 w-24">
                <AvatarImage src="/placeholder-user.jpg" alt="Michael Johnson" />
                <AvatarFallback>ZD</AvatarFallback>
              </Avatar>
              <div className="text-center">
                <h3 className="text-lg font-semibold">Mohammed Zaid Shaikh</h3>
                <p className="text-muted-foreground">Lead Designer & Content Creator</p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center space-y-2">
              <Avatar className="h-24 w-24">
                <AvatarImage src="/placeholder-user.jpg" alt="Emily Davis" />
                <AvatarFallback>MS</AvatarFallback>
              </Avatar>
              <div className="text-center">
                <h3 className="text-lg font-semibold">Mustafa Shaikh</h3>
                <p className="text-muted-foreground">Marketing Manager</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
