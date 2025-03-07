
import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300 ease-in-out section-padding",
      isScrolled ? "backdrop-blur-md bg-white/90 shadow-sm" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <h1 className="text-xl font-semibold tracking-tighter">
            <span className="font-display">Exclusive</span>
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/#packages" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
            Packages
          </Link>
          <Link to="/#testimonials" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
            Testimonials
          </Link>
          <Link to="/#contact" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
            Contact
          </Link>
          <Button variant="outline" size="sm" className="ml-4 group" asChild>
            <Link to="/#packages">
              <ShoppingBag className="mr-2 h-4 w-4 group-hover:text-primary transition-colors" />
              <span>Shop Now</span>
            </Link>
          </Button>
        </nav>

        {/* Mobile Navigation Toggle */}
        <button 
          className="md:hidden text-foreground/90 hover:text-primary transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={cn(
        "fixed inset-0 z-40 bg-white/95 backdrop-blur-md transform transition-transform duration-300 ease-in-out md:hidden flex flex-col items-center justify-center",
        isMenuOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <nav className="flex flex-col items-center space-y-8 text-lg">
          <Link 
            to="/#packages" 
            className="font-medium hover:text-primary transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Packages
          </Link>
          <Link 
            to="/#testimonials" 
            className="font-medium hover:text-primary transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Testimonials
          </Link>
          <Link 
            to="/#contact" 
            className="font-medium hover:text-primary transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </Link>
          <Button className="mt-4" onClick={() => setIsMenuOpen(false)} asChild>
            <Link to="/#packages">
              <ShoppingBag className="mr-2 h-4 w-4" />
              <span>Shop Now</span>
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
