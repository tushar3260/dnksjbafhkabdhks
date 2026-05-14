import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Code2, LayoutDashboard, Settings } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-white/10 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto h-full px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="p-2 bg-primary/20 rounded-xl group-hover:bg-primary/30 transition-all">
            <Code2 className="text-primary" size={24} />
          </div>
          <span className="font-bold text-xl tracking-tight">WebTech <span className="text-primary">CBT</span></span>
        </Link>
        
        <div className="flex items-center gap-8">
          <Link to="/" className="nav-link flex items-center gap-2">
            <LayoutDashboard size={18} /> Dashboard
          </Link>
          <Link to="/practice" className="nav-link flex items-center gap-2">
            <Box size={18} /> Practice
          </Link>
          <Link to="/admin" className="nav-link flex items-center gap-2">
            <Settings size={18} /> Admin
          </Link>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-secondary p-[1px]">
            <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
              <span className="text-xs font-bold">TB</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
