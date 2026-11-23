import { ReactNode, useEffect, useLayoutEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Home, LayoutGrid, Settings, Layers, Menu } from 'lucide-react';

const navItems = [
  { path: '/', icon: Home, label: 'Profile' },
  { path: '/gallery', icon: LayoutGrid, label: 'Gallery' },
  { path: '/dashboard', icon: Settings, label: 'Dashboard' },
  { path: '/builder', icon: Layers, label: 'Builder' },
];

// React 18 doesn't type the newer `popover` / `popovertarget` HTML attributes yet,
// so they are passed through untyped below.

/**
 * Shows the links inline when they all fit on one row, otherwise collapses
 * them into a native popover menu. No fixed breakpoint: it measures the row,
 * so longer labels or bigger text move the switch point automatically.
 */
function useResponsiveNav() {
  const headerRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);

  useLayoutEffect(() => {
    const header = headerRef.current;
    const inner = innerRef.current;
    const menu = menuRef.current;
    if (!header || !inner || !menu) return;

    let lastWidth = 0;

    const update = () => {
      const width = header.clientWidth;
      const isWide = header.classList.contains('is-wide');
      // While collapsed, only re-measure when the header has grown,
      // otherwise the layout would flip back and forth on every shrink.
      if (!isWide && width <= lastWidth) {
        lastWidth = width;
        return;
      }
      lastWidth = width;

      const wasOpen = menu.matches(':popover-open');
      header.classList.add('is-measuring', 'is-wide');
      menu.removeAttribute('popover');
      const fits = inner.scrollWidth <= inner.clientWidth;
      if (!fits) {
        header.classList.remove('is-wide');
        menu.setAttribute('popover', 'auto');
        if (wasOpen) menu.showPopover();
      }
      requestAnimationFrame(() => header.classList.remove('is-measuring'));
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(header);
    observer.observe(menu);
    return () => observer.disconnect();
  }, []);

  return { headerRef, innerRef, menuRef };
}

export function Layout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const { headerRef, innerRef, menuRef } = useResponsiveNav();

  // Give every page its own browser-tab title, and close the phone menu after navigating.
  useEffect(() => {
    const current = navItems.find((item) => item.path === location.pathname);
    document.title = current ? `${current.label} | DocShare` : 'DocShare';
    const menu = menuRef.current;
    if (menu?.matches(':popover-open')) menu.hidePopover();
  }, [location.pathname, menuRef]);

  return (
    <div className="flex h-dvh flex-col bg-background">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-background focus:px-4 focus:py-2 focus:shadow-lg"
      >
        Skip to main content
      </a>

      <header
        ref={headerRef}
        className="site-header border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      >
        <div
          ref={innerRef}
          className="header-inner mx-auto flex h-16 max-w-5xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8"
        >
          <Link to="/" className="flex items-center gap-2 rounded-md">
            <span aria-hidden="true" className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600" />
            <span className="text-lg font-bold">DocShare</span>
          </Link>

          <nav aria-label="Primary" className="site-nav">
            <button
              type="button"
              className="menu-button min-h-10 items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
              {...({ popovertarget: 'site-menu' } as object)}
              aria-controls="site-menu"
            >
              <Menu aria-hidden="true" className="h-4 w-4" />
              <span>Menu</span>
            </button>

            <ul
              id="site-menu"
              ref={menuRef}
              {...({ popover: 'auto' } as object)}
              className="site-menu"
            >
              {navItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    end
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground aria-[current=page]:bg-muted aria-[current=page]:text-foreground aria-[current=page]:underline aria-[current=page]:underline-offset-4"
                  >
                    <item.icon aria-hidden="true" className="h-4 w-4" />
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <main id="content" tabIndex={-1} className="flex-1 overflow-auto focus:outline-none">
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">{children}</div>
      </main>
    </div>
  );
}
