import { useState } from 'react';
import { Menu } from 'lucide-react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { cn } from '../lib/utils';
import { PERSONAL_INFO } from '../consts';

interface NavItem {
  label: string;
  href: string;
}

interface MobileMenuProps {
  items: NavItem[];
  currentPath: string;
}

export function MobileMenu({ items, currentPath }: MobileMenuProps) {
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === '/') return currentPath === '/';
    return currentPath.startsWith(href);
  };

  return (
    <div className="sm:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Open navigation" className="h-8 w-8">
            <Menu className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" aria-describedby={undefined} className="w-64 bg-neutral-50 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 p-0">
          <SheetHeader className="px-6 py-5 border-b border-neutral-200 dark:border-neutral-800">
            <SheetTitle className="text-left text-sm font-bold text-neutral-900 dark:text-neutral-100">
              {PERSONAL_INFO.name}
            </SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col py-4">
            {items.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  'px-6 py-3 text-sm font-medium capitalize transition-colors',
                  isActive(item.href)
                    ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                )}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}
