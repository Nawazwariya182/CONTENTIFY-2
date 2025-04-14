/*
  Copyright © 2025 Nawaz & Tabish All rights reserved.
  Project: Contentify (Proprietary Software)
  
  This code is the exclusive property of the copyright holder.
  Unauthorized copying, modification, redistribution, or use of any part
  of this codebase — including the name “Contentify” — is strictly prohibited.

  This software is confidential and proprietary. By accessing or using this code,
  you agree to comply with the terms set forth in the LICENSE file.
*/
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckIcon } from "lucide-react";

export default function Component() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-20 lg:py-24 bg-back text-text">
      <div className="grid gap-8 md:gap-12 lg:gap-16">
        <div className="text-center space-y-4 md:space-y-6">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            Choose Your Plan
          </h1>
          <p className="text-text/70 md:text-lg lg:text-xl max-w-2xl mx-auto">
            Select the perfect package to unlock the full potential of
            AI-powered content creation.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 md:gap-8 lg:gap-12">
          {[
            {
              title: "Basic",
              price: "$9",
              description: "For individuals and small teams",
              features: [
                "Up to 10,000 words per month",
                "Basic content templates",
                "Standard image generation",
                "Community support",
              ],
              color: "second",
            },
            {
              title: "Pro",
              price: "$49",
              description: "For growing businesses",
              features: [
                "Up to 50,000 words per month",
                "Advanced content templates",
                "Premium image generation",
                "Priority support",
              ],
              color: "prim",
              featured: true,
            },
            {
              title: "Enterprise",
              price: "$199",
              description: "For large organizations",
              features: [
                "Unlimited words per month",
                "Custom content templates",
                "Advanced AI-powered editing",
                "Dedicated account manager",
              ],
              color: "acc",
            },
          ].map((plan, index) => (
            <Card
              key={index}
              className={`p-6 md:p-8 lg:p-10 bg-${plan.color} ${plan.featured ? "ring-4 ring-prim ring-opacity-50" : ""} rounded-xl transform transition-all duration-300 hover:scale-105`}
            >
              <div className="space-y-4 md:space-y-6">
                <div className="space-y-2">
                  <h3 className="text-lg md:text-xl lg:text-2xl font-bold">
                    {plan.title}
                  </h3>
                  <p
                    className={`${plan.featured ? "text-back" : "text-text"}/80 md:text-lg lg:text-xl`}
                  >
                    {plan.description}
                  </p>
                </div>
                <div className="flex items-end gap-2">
                  <span className="text-4xl md:text-5xl lg:text-6xl font-bold">
                    {plan.price}
                  </span>
                  <span
                    className={`${plan.featured ? "text-back" : "text-text"}/80 text-sm md:text-base lg:text-lg`}
                  >
                    /month
                  </span>
                </div>
                <ul className="space-y-2 text-text/80">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-2">
                      <CheckIcon
                        className={`w-5 h-5 ${plan.featured ? "text-back" : "text-prim"}`}
                      />
                      <span
                        className={
                          plan.featured ? "text-back/90" : "text-text/90"
                        }
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <Button
                  size="lg"
                  className={`w-full ${plan.featured ? "bg-back text-prim hover:bg-back/90" : `bg-prim text-back hover:bg-prim/90`}`}
                >
                  {plan.title === "Enterprise"
                    ? "Contact Sales"
                    : "Get Started"}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
