import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Briefcase, BookOpen, Layers, Trophy, Menu, Github, Linkedin, Mail } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navItems = [
    { name: 'Career', path: '/career', icon: Briefcase },
    { name: 'Publications', path: '/publications', icon: BookOpen },
    { name: 'Projects', path: '/projects', icon: Layers },
    { name: 'Awards', path: '/awards', icon: Trophy },
  ];

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Mobile Backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/80 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-zinc-950 border-r border-zinc-900 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-white tracking-tight">Jacob Klimczak</h1>
            <p className="text-sm text-zinc-500 font-medium">Software Engineer & Researcher</p>
          </div>

          <nav className="flex-1 px-4 space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsSidebarOpen(false)}
                className={({ isActive }) => cn(
                  "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                  isActive
                    ? "bg-primary-900/20 text-primary-400 border border-primary-900/50"
                    : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                )}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.name}
              </NavLink>
            ))}
          </nav>

          <div className="p-4 border-t border-zinc-900">
            <div className="flex justify-around items-center">
              <a href="https://github.com/jacob-klimczak" target="_blank" rel="noreferrer" className="p-2 text-zinc-500 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com/in/jacob-klimczak" target="_blank" rel="noreferrer" className="p-2 text-zinc-500 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="mailto:jacob.klimczak@mail.utoronto.ca" className="p-2 text-zinc-500 hover:text-white transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0">
        <header className="sticky top-0 z-30 flex items-center h-16 px-4 bg-black/80 backdrop-blur-md border-b border-zinc-900 lg:hidden">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 -ml-2 text-zinc-400 hover:text-white"
          >
            <Menu className="w-6 h-6" />
          </button>
          <span className="ml-4 text-lg font-semibold text-white">Jacob Klimczak</span>
        </header>

        <div className="max-w-6xl mx-auto p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
