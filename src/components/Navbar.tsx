'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Users, UserCheck, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Students', href: '/students', icon: Users },
  { name: 'Teachers', href: '/teachers', icon: UserCheck },
  { name: 'Courses', href: '/courses', icon: BookOpen },
];

const Navbar: React.FC = () => {
  const pathname = usePathname();

  return (
    <nav className="glass border-b border-white/30 backdrop-blur-xl shadow-2xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-2xl font-bold text-white hover:scale-105 transition-transform duration-300">
                📚 School Management
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      'inline-flex items-center px-3 pt-1 border-b-2 text-sm font-medium transition-all duration-300',
                      isActive
                        ? 'border-white text-white bg-white/10'
                        : 'border-transparent text-white/70 hover:border-white/50 hover:text-white hover:bg-white/5'
                    )}
                  >
                    <Icon size={18} className="mr-2" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className="sm:hidden">
        <div className="pt-2 pb-3 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-all duration-300',
                  isActive
                    ? 'bg-white/20 border-white text-white'
                    : 'border-transparent text-white/70 hover:bg-white/10 hover:border-white/50 hover:text-white'
                )}
              >
                <div className="flex items-center">
                  <Icon size={18} className="mr-3" />
                  {item.name}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;