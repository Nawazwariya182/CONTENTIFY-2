import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MountainIcon, Zap, Users, Lightbulb, Rocket } from "lucide-react"
import Image from "next/image"

export default function Component() {
  return (
    <div className="flex flex-col min-h-[100dvh] bg-back text-text">
      <header className="bg-second text-text py-12 md:py-20">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:items-center">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Unleash Your Creativity with AI
              </h1>
              <p className="max-w-[600px] text-lg">
                Discover the power of AI-driven content creation. Our platform helps you generate high-quality, engaging
                content with ease.
              </p>
              <div>
                <Button className="bg-prim text-back border-2 border-prim hover:bg-acc" style={{ cursor: 'url(/poin.png), auto' }}>Get Started</Button>
              </div>
            </div>
            <div className="flex justify-center">
              <Image
                src="/g2.webp"
                width={400}
                height={400}
                alt="AI-powered content creation"
                className="rounded-lg object-cover"
              />
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-second">
                <CardContent className="p-6">
                  <Zap className="w-12 h-12 text-prim mb-4" />
                  <h3 className="text-xl font-semibold mb-2">AI-Powered Content</h3>
                  <p>Generate high-quality content in seconds with our advanced AI algorithms.</p>
                </CardContent>
              </Card>
              <Card className="bg-second">
                <CardContent className="p-6">
                  <Users className="w-12 h-12 text-prim mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Collaboration Tools</h3>
                  <p>Work seamlessly with your team using our intuitive collaboration features.</p>
                </CardContent>
              </Card>
              <Card className="bg-second">
                <CardContent className="p-6">
                  <Lightbulb className="w-12 h-12 text-prim mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Idea Generation</h3>
                  <p>Never run out of ideas with our AI-powered brainstorming assistant.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-prim/75">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold text-center text-back mb-12">Our Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((step) => (
                <Card key={step} className="bg-back">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-acc flex items-center justify-center text-back font-bold text-xl mb-4">
                      {step}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Step {step}</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { name: "Nawaz Wariya", role: "CEO & Senior Developer" },
                { name: "Shaikh Tabish", role: "CTO" },
                { name: "Mohammed Zaid Shaikh", role: "Lead Designer" },
                { name: "Mustafa Shaikh", role: "Marketing Manager" },
              ].map((member, index) => (
                <Card key={index} className="bg-second">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <Avatar className="w-24 h-24 mb-4">
                      <AvatarImage src={`/placeholder.svg?height=96&width=96&text=${member.name.charAt(0)}`} alt={member.name} />
                      <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <h3 className="text-lg font-semibold">{member.name}</h3>
                    <p className="text-sm text-text/80">{member.role}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-acc">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2 items-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ready to Get Started?</h2>
                <p className="max-w-[600px] text-text md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of content creators who are already using Contentify to streamline their workflow and create amazing content.
                </p>
                <Button className="bg-prim text-back hover:bg-acc" style={{ cursor: 'url(/poin.png), auto' }}>Start Your Free Trial</Button>
              </div>
              <div className="flex justify-center">
                <Image
                  src="/g3.webp"
                  width={600}
                  height={400}
                  alt="Content creation process"
                  className="rounded-lg object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}