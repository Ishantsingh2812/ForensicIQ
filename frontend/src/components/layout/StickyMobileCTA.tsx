import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

export const StickyMobileCTA: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // If on /analyzer, observe if the textarea is currently in view
    if (location.pathname === '/analyzer') {
      const textarea = document.getElementById('scenario-input');
      if (!textarea) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          // If the scenario form is in view, hide the sticky bar
          setIsVisible(!entry.isIntersecting);
        },
        { threshold: 0.3 }
      );

      observer.observe(textarea);
      return () => observer.disconnect();
    } else {
      setIsVisible(true);
    }
  }, [location.pathname]);

  const handleAction = () => {
    if (location.pathname === '/analyzer') {
      const textarea = document.getElementById('scenario-input');
      textarea?.scrollIntoView({ behavior: 'smooth' });
      textarea?.focus();
    } else {
      navigate('/analyzer');
    }
  };

  if (!isVisible) return null;

  return (
    <div
      role="region"
      aria-label="Mobile quick action"
      className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-forensic-900/95 backdrop-blur-md border-t border-forensic-700/80 p-3 pb-safe shadow-2xl transition-all duration-300 animate-in slide-in-from-bottom"
    >
      <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
        <div className="flex flex-col">
          <span className="text-xs font-bold text-white flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-evidence-cyan" />
            Paste Crime Scenario
          </span>
          <span className="text-[10px] text-slate-400">Get Instant IPC ↔ BNS Mapping</span>
        </div>
        <Button
          size="sm"
          variant="primary"
          onClick={handleAction}
          className="shrink-0 px-4 py-2 font-bold min-h-[44px]"
          rightIcon={<ArrowRight className="w-4 h-4" />}
        >
          Analyze Case
        </Button>
      </div>
    </div>
  );
};
