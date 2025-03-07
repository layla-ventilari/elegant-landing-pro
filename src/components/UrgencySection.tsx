
import React, { useState, useEffect } from 'react';
import { AlertTriangle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const UrgencySection = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 8,
    minutes: 43,
    seconds: 12
  });
  
  const [stock, setStock] = useState(14);
  const totalStock = 50;
  const stockPercentage = (stock / totalStock) * 100;
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds -= 1;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes -= 1;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours -= 1;
            } else {
              hours = 23;
              if (days > 0) {
                days -= 1;
              }
            }
          }
        }
        
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  // Simulate random stock decreases
  useEffect(() => {
    const randomStockDecrease = () => {
      const timeout = Math.floor(Math.random() * (60000 - 30000) + 30000); // Between 30s and 1min
      
      const timer = setTimeout(() => {
        setStock(prev => Math.max(prev - 1, 0));
        randomStockDecrease();
      }, timeout);
      
      return timer;
    };
    
    const timer = randomStockDecrease();
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-16 bg-primary/5 section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <Badge variant="outline" className="mb-4 bg-primary/10">Limited Time</Badge>
            <h2 className="text-3xl md:text-4xl font-display font-semibold mb-6 tracking-tight">
              Special Offer Ending Soon
            </h2>
            <p className="text-foreground/70 mb-8 max-w-xl mx-auto lg:mx-0">
              Our exclusive packages are available for a limited time only. Secure yours now before this special offer expires.
            </p>
            
            <div className="grid grid-cols-4 gap-4 mb-10 max-w-md mx-auto lg:mx-0">
              <div className="bg-white rounded-lg p-3 shadow-sm border border-border/50">
                <span className="block text-3xl font-bold">{String(timeLeft.days).padStart(2, '0')}</span>
                <span className="text-xs text-foreground/70">Days</span>
              </div>
              <div className="bg-white rounded-lg p-3 shadow-sm border border-border/50">
                <span className="block text-3xl font-bold">{String(timeLeft.hours).padStart(2, '0')}</span>
                <span className="text-xs text-foreground/70">Hours</span>
              </div>
              <div className="bg-white rounded-lg p-3 shadow-sm border border-border/50">
                <span className="block text-3xl font-bold">{String(timeLeft.minutes).padStart(2, '0')}</span>
                <span className="text-xs text-foreground/70">Minutes</span>
              </div>
              <div className="bg-white rounded-lg p-3 shadow-sm border border-border/50">
                <span className="block text-3xl font-bold">{String(timeLeft.seconds).padStart(2, '0')}</span>
                <span className="text-xs text-foreground/70">Seconds</span>
              </div>
            </div>
            
            <Button size="lg" className="group" asChild>
              <Link to="/#packages">
                Secure Your Package
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
          
          <div className="bg-white rounded-xl p-6 border border-border/50 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Premium Package</h3>
              <Badge variant="secondary" className="bg-primary/10">25% OFF</Badge>
            </div>
            
            <p className="text-foreground/70 text-sm mb-6">
              Get our most popular package at a special discounted price. Limited availability.
            </p>
            
            <div className="flex items-baseline mb-2">
              <span className="text-3xl font-display font-bold">$199</span>
              <span className="ml-2 text-foreground/60 line-through text-sm">$249</span>
              <span className="ml-3 text-sm text-primary font-medium">Save $50</span>
            </div>
            
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Remaining Stock</span>
                <span className="text-sm font-semibold">{stock} left</span>
              </div>
              <Progress value={stockPercentage} className="h-2" />
            </div>
            
            {stock < 15 && (
              <div className={cn(
                "flex items-center text-sm bg-orange-50 border border-orange-200 rounded-md p-2 mb-6",
                stock < 5 ? "animate-pulse" : ""
              )}>
                <AlertTriangle className="h-4 w-4 text-orange-500 mr-2" />
                <span className="text-orange-800">
                  {stock < 5 ? "Almost gone! Order now while supplies last." : "Low stock alert! Don't miss out."}
                </span>
              </div>
            )}
            
            <Button size="lg" className="w-full bg-primary hover:bg-primary/90">
              Add to Cart
            </Button>
            
            <div className="flex items-center justify-center mt-4 text-xs text-foreground/70">
              <span>Secure payment</span>
              <span className="mx-2">•</span>
              <span>Money-back guarantee</span>
              <span className="mx-2">•</span>
              <span>Free shipping</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UrgencySection;
