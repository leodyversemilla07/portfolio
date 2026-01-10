import React, { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';

interface MobileMenuProps {
  items: string[];
}

export function MobileMenu({ items }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <div className="sm:hidden relative" ref={menuRef}>
      <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Toggle menu" className="h-8 w-8">
        {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </Button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-neutral-800 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700 py-2 animate-in slide-in-from-top-2">
          <div className="flex flex-col">
            {items.map((item) => (
              <a
                key={item}
                href={`#${item}`}
                className="px-4 py-2.5 text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-neutral-100 dark:hover:bg-neutral-700/50 capitalize transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}