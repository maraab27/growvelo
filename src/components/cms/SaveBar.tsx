import React from 'react';
import { useAdminSession } from '@/hooks/useAdminSession';
import { Save, ShieldAlert } from 'lucide-react';

export const SaveBar = () => {
  const { isAdmin } = useAdminSession();

  if (!isAdmin) return null;

  return (
    <div className="fixed top-4 left-0 w-full z-50 px-4 no-print pointer-events-none">
      <div className="max-w-3xl mx-auto glass-strong bg-primary/5 border-primary/20 p-2 sm:p-3 rounded-full flex flex-col sm:flex-row items-center justify-between gap-2 pointer-events-auto shadow-lg backdrop-blur-xl">
        <div className="flex items-center gap-2 sm:gap-3 text-primary font-bangla px-2">
          <ShieldAlert className="w-5 h-5 animate-pulse" />
          <span className="font-bold text-sm sm:text-base">অ্যাডমিন মোড চালু আছে</span>
        </div>
        
        <div className="flex items-center gap-2 bg-background/90 px-4 py-1.5 rounded-full text-xs sm:text-sm font-bangla border border-border text-muted-foreground">
          <Save className="w-4 h-4 text-green-500" />
          <span>টেক্সট এডিট করে বাইরে ক্লিক করলেই সেভ হবে</span>
        </div>
      </div>
    </div>
  );
};
