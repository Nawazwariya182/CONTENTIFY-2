import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BarChartIcon, BoltIcon, BriefcaseIcon, InstagramIcon, LaptopIcon, LinkedinIcon, PaletteIcon, PencilIcon, YoutubeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-back" style={{ cursor: 'url(/curs.png), auto' }}>
      <header className="bg-back text-text py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/logo.svg" alt="AI Content Creator Logo" width={40} height={40} style={{ cursor: 'url(/poin.png), auto' }}/>
            <span className="text-xl font-bold" style={{ cursor: 'url(/poin.png), auto' }}>Contentify</span>
          </Link>
          <nav className="hidden sm:block">
            <ul className="flex space-x-4">
              {["Home", "Features", "About", "Services", "Gallery"].map((item) => (
                <li key={item}>
                  <Link href={`#${item.toLowerCase()}`} className="hover:text-acc transition-colors" style={{ cursor: 'url(/poin.png), auto' }}>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-20 bg-back text-text">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
              <div className="space-y-6">
                <h1 className="text-5xl font-bold tracking-tight">
                  AI-Powered Content
                  <span className="block text-prim">with a Creative Twist</span>
                </h1>
                <p className="max-w-[600px] text-lg text-text/80">
                  Step into a world of innovation and creativity as we invite you to embark on an unforgettable journey through AI-driven content creation.
                </p>
                <div className="flex space-x-4">
                  <Link href={'/dashboard'}>
                    <Button className="bg-prim text-back border-2 hover:bg-white hover:text-acc  border-prim transition-colors" style={{ cursor: 'url(/poin.png), auto' }}>
                      Get Started
                    </Button>
                  </Link >
                  <Link href={'/dashboard/How'}>
                  <Button variant="outline" className="text-acc border-acc hover:bg-acc hover:text-back" style={{ cursor: 'url(/poin.png), auto' }}>
                    Learn More
                  </Button>
                  </Link>
                </div>
              </div>
              <div className="mt-10 lg:mt-0 relative">
                <Image
                  src="/g4.jpeg"
                  alt="AI Content Creation"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-xl"
                />
                <div className="absolute top-4 right-4 bg-acc text-back px-4 py-2 rounded-full font-bold">
                  AI Powered
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-text">Our Features</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                { icon: PencilIcon, title: "Content Generation", description: "Effortlessly generate high-quality content for your projects." },
                { icon: PaletteIcon, title: "Creative Ideation", description: "Unlock your creative potential with our AI-powered ideation tools." },
                { icon: BoltIcon, title: "Intelligent Optimization", description: "Optimize your content for maximum engagement and performance." },
                { icon: LaptopIcon, title: "Seamless Workflow", description: "Integrate our platform seamlessly into your existing workflow." },
                { icon: BriefcaseIcon, title: "Enterprise-Grade Security", description: "Ensure your content and data are secure with our measures." },
                { icon: BarChartIcon, title: "Robust Analytics", description: "Gain valuable insights into your content performance." },
              ].map((feature, index) => (
                <Card key={index} className="bg-second border-none transition-all hover:shadow-lg">
                  <CardContent className="p-6">
                    <feature.icon className="h-12 w-12 text-acc mb-4" />
                    <h3 className="text-xl font-bold text-text mb-2">{feature.title}</h3>
                    <p className="text-text/80">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="py-20 bg-back text-text">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 lg:grid-cols-2 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">About AI Content Creator</h2>
                <p className="text-lg mb-6">
                  We're revolutionizing content creation with cutting-edge AI technology. Our platform empowers creators,
                  marketers, and businesses to produce high-quality content faster and more efficiently than ever before.
                </p>
                <Button className="bg-prim text-back hover:text-acc border-2 border-prim hover:bg-white transition-colors" style={{ cursor: 'url(/poin.png), auto' }}>
                  Learn More
                </Button>
              </div>
              <div className="mt-10 lg:mt-0">
                <Image
                  src="/g.webp"
                  alt="AI Content Creator team"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* <section id="gallery" className="py-20 bg-second">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-text">Our Gallery</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {["Calc", "HTD", "QueryX", "RPS", "Invitation", "Contentify"].map((item) => (
                <div key={item} className="relative group overflow-hidden rounded-lg">
                  <Image
                    src={`/${item}.png`}
                    alt={`Gallery Image ${item}`}
                    width={400}
                    height={300}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button className="bg-prim text-back border-2 border-prim hover:text-acc hover:bg-white" style={{ cursor: 'url(/poin.png), auto' }}>
                      View Project
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section> */}
      </main>

      <footer className="bg-back text-text py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <Image src="/logo.svg" alt="AI Content Creator Logo" width={40} height={40} />
              <p className="mt-2">&copy; 2024 AI Content Creator. All rights reserved.</p>
            </div>
            <div className="flex space-x-4">
              <Link href="https://www.instagram.com/contentify_ai/profilecard/?igsh=MWp1b2kwZ2N3eWRsYQ==" aria-label="Instagram"style={{ cursor: 'url(/poin.png), auto' }}>
                <InstagramIcon className="h-6 w-6 hover:text-acc" />
              </Link>
              <Link href="https://youtube.com/@contentify-ai?si=WIfo6UW8kfiIy1oJ" aria-label="YouTube"style={{ cursor: 'url(/poin.png), auto' }}>
                <YoutubeIcon className="h-6 w-6 hover:text-acc" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
