import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { MobileStickyCTA } from './MobileStickyCTA';
import { WhatsAppButton } from '../ui/WhatsAppButton';

export const PublicLayout: React.FC = () => {
  const { pathname } = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-ivory-100 text-charcoal-900 selection:bg-gold-500 selection:text-white">
      <Navbar />
      <main className="flex-grow pt-20 md:pt-24">
        <Outlet />
      </main>
      <Footer />
      <MobileStickyCTA />
      <WhatsAppButton />
    </div>
  );
};
