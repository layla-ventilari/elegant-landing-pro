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
  return <section className="relative min-h-screen flex items-center pt-20 section-padding overflow-hidden bg-white">
      <div className="hero-shape" aria-hidden="true"></div>
      
      
    </section>;
};
export default HeroSection;