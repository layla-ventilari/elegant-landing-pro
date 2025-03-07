
import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const headingElement = headingRef.current;
    const descriptionElement = descriptionRef.current;
    const ctaElement = ctaRef.current;
    
    if (headingElement) {
      headingElement.classList.add('animate-fade-in');
    }
    
    setTimeout(() => {
      if (descriptionElement) {
        descriptionElement.classList.add('animate-fade-in');
      }
    }, 200);
    
    setTimeout(() => {
      if (ctaElement) {
        ctaElement.classList.add('animate-fade-in');
      }
    }, 400);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-20 section-padding overflow-hidden bg-white">
      <div className="hero-shape" aria-hidden="true"></div>
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 py-20">
        <div className="flex flex-col justify-center">
          <div className="space-y-8">
            <span className="inline-block px-3 py-1 rounded-full bg-accent text-primary text-xs font-medium tracking-wide mb-2 opacity-0 animate-fade-in">
              Premium Collection
            </span>
            
            <h1 
              ref={headingRef} 
              className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold leading-tight tracking-tighter opacity-0 text-shadow"
            >
              Unlock Your <span className="text-gradient">Exclusive</span> Package Today
            </h1>
            
            <p 
              ref={descriptionRef} 
              className="text-lg md:text-xl text-foreground/80 max-w-xl opacity-0"
            >
              Curated premium packages designed to elevate your experience. Each package crafted with precision and attention to detail for the discerning client.
            </p>
            
            <div ref={ctaRef} className="flex flex-wrap gap-4 pt-4 opacity-0">
              <Button size="lg" className="group" asChild>
                <Link to="/#packages">
                  Shop Now
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/#testimonials">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
        
        <div className="relative lg:flex items-center justify-center hidden">
          <div className="relative w-full h-[500px] rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 hover:shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent z-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
              alt="Exclusive Package" 
              className="w-full h-full object-cover object-center transform transition-transform duration-700 hover:scale-105"
            />
          </div>
          
          <div className="absolute -bottom-8 -left-8 glass-card p-6 rounded-xl animate-float shadow-lg">
            <p className="text-sm font-medium mb-2">Limited Offer</p>
            <p className="text-3xl font-display font-semibold text-primary">25% OFF</p>
            <p className="text-xs text-foreground/70 mt-1">Use code: EXCLUSIVE25</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
