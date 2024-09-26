import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckIcon } from "lucide-react"

export default function Component() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-20 lg:py-24">
      <div className="grid gap-8 md:gap-12 lg:gap-16">
        <div className="text-center space-y-4 md:space-y-6">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">Pricing</h1>
          <p className="text-muted-foreground md:text-lg lg:text-xl">
            Choose the plan that fits your needs and budget.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
          <Card className="p-6 md:p-8 lg:p-10 bg-muted rounded-xl">
            <div className="space-y-4 md:space-y-6">
              <div className="space-y-2">
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold">Basic</h3>
                <p className="text-muted-foreground md:text-lg lg:text-xl">For individuals and small teams.</p>
              </div>
              <div className="flex items-end gap-2">
                <span className="text-4xl md:text-5xl lg:text-6xl font-bold">$9</span>
                <span className="text-muted-foreground text-sm md:text-base lg:text-lg">/month</span>
              </div>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckIcon className="w-5 h-5 fill-primary" />
                  Up to 10,000 words per month
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon className="w-5 h-5 fill-primary" />
                  Basic content templates
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon className="w-5 h-5 fill-primary" />
                  Standard image generation
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon className="w-5 h-5 fill-primary" />
                  Community support
                </li>
              </ul>
              <Button size="lg" className="w-full">
                Get Started
              </Button>
            </div>
          </Card>
          <Card className="p-6 md:p-8 lg:p-10 bg-primary text-primary-foreground rounded-xl">
            <div className="space-y-4 md:space-y-6">
              <div className="space-y-2">
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold">Pro</h3>
                <p className="text-primary-foreground/80 md:text-lg lg:text-xl">For teams and businesses.</p>
              </div>
              <div className="flex items-end gap-2">
                <span className="text-4xl md:text-5xl lg:text-6xl font-bold">$49</span>
                <span className="text-primary-foreground/80 text-sm md:text-base lg:text-lg">/month</span>
              </div>
              <ul className="space-y-2 text-primary-foreground/80">
                <li className="flex items-center gap-2">
                  <CheckIcon className="w-5 h-5 fill-primary-foreground" />
                  Unlimited words per month
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon className="w-5 h-5 fill-primary-foreground" />
                  Advanced content templates
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon className="w-5 h-5 fill-primary-foreground" />
                  Premium image generation
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon className="w-5 h-5 fill-primary-foreground" />
                  Priority support
                </li>
              </ul>
              <Button size="lg" className="w-full" variant="secondary">
                Get Started
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
