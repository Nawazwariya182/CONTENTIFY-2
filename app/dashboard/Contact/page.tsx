import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { FacebookIcon, GitlabIcon, InstagramIcon, LinkedinIcon, TwitterIcon } from "lucide-react"
import Link from "next/link"

export default function Component() {
  return (
    <div className="flex flex-col min-h-dvh">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container grid max-w-5xl gap-12 px-4 md:px-6">
            <div className="space-y-2 flex flex-col text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Meet the Team</h2>
              <p className="max-w-[700px] flex text-center text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our dedicated team is here to help you with all your needs.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              <div className="flex flex-col items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="/logo.svg" alt="Sofia Davis" />
                  <AvatarFallback>#NW</AvatarFallback>
                </Avatar>
                <div className="space-y-1 text-center">
                  <h4 className="text-lg font-medium">Nawaz Wariya</h4>
                  <p className="text-sm text-muted-foreground">CEO, Manager & Senior Developer</p>
                  <div className="flex items-center justify-center gap-2">
                    <Link href="#" className="text-muted-foreground hover:text-primary" prefetch={false}>
                      <LinkedinIcon className="h-5 w-5" />
                    </Link>
                    <Link href="#" className="text-muted-foreground hover:text-primary" prefetch={false}>
                      <TwitterIcon className="h-5 w-5" />
                    </Link>
                    <Link href="#" className="text-muted-foreground hover:text-primary" prefetch={false}>
                      <GitlabIcon className="h-5 w-5" />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="/logo.svg" alt="Jackson Lee" />
                  <AvatarFallback>SK</AvatarFallback>
                </Avatar>
                <div className="space-y-1 text-center">
                  <h4 className="text-lg font-medium">Shaikh Tabish</h4>
                  <p className="text-sm text-muted-foreground">CTO</p>
                  <div className="flex items-center justify-center gap-2">
                    <Link href="#" className="text-muted-foreground hover:text-primary" prefetch={false}>
                      <LinkedinIcon className="h-5 w-5" />
                    </Link>
                    <Link href="#" className="text-muted-foreground hover:text-primary" prefetch={false}>
                      <TwitterIcon className="h-5 w-5" />
                    </Link>
                    <Link href="#" className="text-muted-foreground hover:text-primary" prefetch={false}>
                      <GitlabIcon className="h-5 w-5" />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="/logo.svg" alt="Olivia Nguyen" />
                  <AvatarFallback>ZD</AvatarFallback>
                </Avatar>
                <div className="space-y-1 text-center">
                  <h4 className="text-lg font-medium">Zaid Shaikh</h4>
                  <p className="text-sm text-muted-foreground">Lead Designer & Content Creator</p>
                  <div className="flex items-center justify-center gap-2">
                    <Link href="#" className="text-muted-foreground hover:text-primary" prefetch={false}>
                      <LinkedinIcon className="h-5 w-5" />
                    </Link>
                    <Link href="#" className="text-muted-foreground hover:text-primary" prefetch={false}>
                      <TwitterIcon className="h-5 w-5" />
                    </Link>
                    <Link href="#" className="text-muted-foreground hover:text-primary" prefetch={false}>
                      <GitlabIcon className="h-5 w-5" />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="/logo.svg" alt="Michael Chen" />
                  <AvatarFallback>MS</AvatarFallback>
                </Avatar>
                <div className="space-y-1 text-center">
                  <h4 className="text-lg font-medium">Mustafa Shaikh</h4>
                  <p className="text-sm text-muted-foreground">Market Manager</p>
                  <div className="flex items-center justify-center gap-2">
                    <Link href="#" className="text-muted-foreground hover:text-primary" prefetch={false}>
                      <LinkedinIcon className="h-5 w-5" />
                    </Link>
                    <Link href="#" className="text-muted-foreground hover:text-primary" prefetch={false}>
                      <TwitterIcon className="h-5 w-5" />
                    </Link>
                    <Link href="#" className="text-muted-foreground hover:text-primary" prefetch={false}>
                      <GitlabIcon className="h-5 w-5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
