
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import PackagesSection from '@/components/PackagesSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import UrgencySection from '@/components/UrgencySection';
import FooterSection from '@/components/FooterSection';
import ScrollToTopButton from '@/components/ScrollToTopButton';

const Index = () => {
  // Smooth scroll to sections when clicking on navigation links
  useEffect(() => {
    const handleHashChange = () => {
      const { hash } = window.location;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          setTimeout(() => {
            window.scrollTo({
              top: element.getBoundingClientRect().top + window.scrollY - 100,
              behavior: 'smooth'
            });
          }, 0);
        }
      }
    };

    // Handle initial hash on page load
    handleHashChange();

    // Set up listener for hash changes (when user clicks on navigation links)
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <PackagesSection />
      <TestimonialsSection />
      <UrgencySection />
      <FooterSection />
      <ScrollToTopButton />
    </div>
  );
};

export default Index;
