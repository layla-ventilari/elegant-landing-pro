
import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

type Testimonial = {
  id: number;
  name: string;
  position: string;
  avatar: string;
  content: string;
  rating: number;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    position: "Marketing Director",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    content: "The Premium package exceeded all my expectations. The dedicated support team was responsive and the customization options were exactly what our company needed.",
    rating: 5
  },
  {
    id: 2,
    name: "David Martinez",
    position: "CEO, TechStart",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    content: "As someone who values quality and attention to detail, the Ultimate package was the perfect choice. Every aspect was carefully thought through.",
    rating: 5
  },
  {
    id: 3,
    name: "Emily Wong",
    position: "Creative Director",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    content: "I started with the Essentials package and was so impressed that I upgraded to Premium. The difference was noticeable and worth every penny.",
    rating: 4
  },
  {
    id: 4,
    name: "Robert Chen",
    position: "Product Manager",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    content: "The white glove delivery service from the Ultimate package made me feel like a valued customer. I'll definitely be recommending this to my network.",
    rating: 5
  }
];

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

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

    if (testimonialsRef.current) {
      observer.observe(testimonialsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [activeIndex, isAnimating]);

  return (
    <section id="testimonials" className="py-24 section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">Testimonials</Badge>
          <h2 className="text-3xl md:text-4xl font-display font-semibold mb-4 tracking-tight">
            What Our Clients Say
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Discover why our exclusive packages have earned the trust and praise of clients worldwide.
          </p>
        </div>

        <div 
          ref={testimonialsRef}
          className={cn(
            "relative overflow-hidden rounded-2xl bg-accent/30 p-8 md:p-12 transition-opacity duration-700",
            isVisible ? "opacity-100" : "opacity-0"
          )}
        >
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
          </div>

          <div className="relative z-10">
            <div className="flex flex-col md:flex-row gap-8 md:items-center">
              <div className="md:w-1/3 flex flex-col items-center md:items-start">
                <div className="mb-6 relative">
                  <Avatar className="w-20 h-20 border-4 border-white shadow-lg">
                    <AvatarImage src={testimonials[activeIndex].avatar} alt={testimonials[activeIndex].name} />
                    <AvatarFallback>{testimonials[activeIndex].name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-3 -right-3 bg-white rounded-full p-1 shadow-md">
                    <div className="bg-primary rounded-full p-1">
                      <Star className="h-4 w-4 text-white fill-white" />
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-center md:text-left">{testimonials[activeIndex].name}</h3>
                <p className="text-foreground/70 text-sm mb-4 text-center md:text-left">{testimonials[activeIndex].position}</p>

                <div className="flex mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={cn(
                        "h-5 w-5",
                        i < testimonials[activeIndex].rating 
                          ? "text-primary fill-primary" 
                          : "text-muted-foreground"
                      )} 
                    />
                  ))}
                </div>
              </div>

              <div className="md:w-2/3">
                <blockquote 
                  className={cn(
                    "text-xl md:text-2xl font-display italic leading-relaxed mb-8 transition-all duration-500",
                    isAnimating ? "opacity-0 translate-x-8" : "opacity-100 translate-x-0"
                  )}
                >
                  "{testimonials[activeIndex].content}"
                </blockquote>

                <div className="flex space-x-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      className={cn(
                        "w-3 h-3 rounded-full transition-all duration-300 focus:outline-none",
                        activeIndex === index 
                          ? "bg-primary scale-125" 
                          : "bg-primary/30 hover:bg-primary/50"
                      )}
                      onClick={() => setActiveIndex(index)}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="absolute top-1/2 -translate-y-1/2 left-4 md:left-8">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-white/80 hover:bg-white shadow-md"
              onClick={prevSlide}
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </div>

          <div className="absolute top-1/2 -translate-y-1/2 right-4 md:right-8">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-white/80 hover:bg-white shadow-md"
              onClick={nextSlide}
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
