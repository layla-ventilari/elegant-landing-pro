
import React, { useState, useEffect, useRef } from 'react';
import { Check, Star, ArrowRight, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type Package = {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  features: string[];
  popular: boolean;
  limited?: boolean;
  tag?: string;
};

const packages: Package[] = [
  {
    id: 1,
    name: "Essentials",
    price: 99,
    originalPrice: 129,
    description: "Perfect starter package for those looking to experience exclusivity.",
    features: [
      "Premium support",
      "Quick delivery",
      "Basic customization",
      "30-day warranty"
    ],
    popular: false,
    tag: "BEST SELLER"
  },
  {
    id: 2,
    name: "Premium",
    price: 199,
    originalPrice: 249,
    description: "Our most popular package with enhanced features and prioritized service.",
    features: [
      "24/7 Premium support",
      "Express delivery",
      "Advanced customization",
      "60-day warranty",
      "Exclusive member events"
    ],
    popular: true,
    limited: true
  },
  {
    id: 3,
    name: "Ultimate",
    price: 349,
    description: "The complete experience with no compromises for the true connoisseur.",
    features: [
      "Dedicated account manager",
      "White glove delivery",
      "Full customization suite",
      "Lifetime warranty",
      "VIP member events",
      "Early access to new releases"
    ],
    popular: false
  }
];

const PackagesSection = () => {
  const [activePackage, setActivePackage] = useState<number | null>(null);
  const packagesRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (packagesRef.current) {
      observer.observe(packagesRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="packages" className="py-24 section-padding bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">Packages</Badge>
          <h2 className="text-3xl md:text-4xl font-display font-semibold mb-4 tracking-tight">
            Choose Your Perfect Package
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Discover our expertly curated packages designed to meet your specific needs.
            Each option provides exceptional value and exclusive benefits.
          </p>
        </div>

        <div 
          ref={packagesRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {packages.map((pkg, index) => (
            <div 
              key={pkg.id}
              className={cn(
                "rounded-xl p-6 transition-all duration-500 ease-out bg-white border border-border/50 relative flex flex-col h-full hover:shadow-lg",
                pkg.popular ? "shadow-lg ring-2 ring-primary/20" : "shadow-md",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
              )}
              style={{ transitionDelay: `${index * 150}ms` }}
              onMouseEnter={() => setActivePackage(pkg.id)}
              onMouseLeave={() => setActivePackage(null)}
            >
              {pkg.popular && (
                <div className="absolute top-0 right-6 transform -translate-y-1/2">
                  <Badge className="bg-primary text-white px-3 py-1 font-medium">
                    Most Popular
                  </Badge>
                </div>
              )}

              {pkg.tag && (
                <Badge variant="secondary" className="mb-4 inline-flex">
                  {pkg.tag}
                </Badge>
              )}

              <h3 className="text-xl font-semibold mb-2">{pkg.name}</h3>
              
              <div className="flex items-baseline mb-4">
                <span className="text-3xl font-display font-bold">${pkg.price}</span>
                {pkg.originalPrice && (
                  <span className="ml-2 text-foreground/60 line-through text-sm">
                    ${pkg.originalPrice}
                  </span>
                )}
              </div>
              
              <p className="text-foreground/70 mb-6 text-sm">
                {pkg.description}
              </p>
              
              <ul className="space-y-3 mb-8 flex-grow">
                {pkg.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <Check className="h-5 w-5 text-primary shrink-0 mr-2" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              
              {pkg.limited && (
                <div className="flex items-center text-xs text-foreground/70 mb-4">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>Limited time offer</span>
                </div>
              )}
              
              <Button 
                className={cn(
                  "mt-auto group transition-all",
                  pkg.popular ? "bg-primary hover:bg-primary/90" : ""
                )}
                variant={pkg.popular ? "default" : "outline"}
                size="lg"
              >
                {pkg.popular ? "Get Started" : "Buy Now"}
                <ArrowRight className={cn(
                  "ml-2 h-4 w-4 transition-transform",
                  activePackage === pkg.id ? "transform translate-x-1" : ""
                )} />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PackagesSection;
