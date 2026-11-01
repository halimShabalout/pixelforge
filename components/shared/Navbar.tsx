"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// Receives toggle from parent — only used on editor page
interface NavbarProps {
  onToggleSidebar?: () => void;
  sidebarOpen?: boolean;
}

export default function Navbar({ onToggleSidebar, sidebarOpen }: NavbarProps) {
  const pathname = usePathname();
  const isEditor = pathname === "/editor";

  return (
    <header className="h-14 border-b border-stone-200 bg-white flex items-center px-4 shrink-0 z-10 gap-3">
      <Link href="/" className="flex items-center gap-2">
        <span className="flex items-center justify-center w-7 h-7 rounded-md bg-indigo-600">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <rect x="1" y="1" width="5" height="5" rx="1" fill="white" />
            <rect x="8" y="1" width="5" height="5" rx="1" fill="white" opacity="0.6" />
            <rect x="1" y="8" width="5" height="5" rx="1" fill="white" opacity="0.6" />
            <rect x="8" y="8" width="5" height="5" rx="1" fill="white" opacity="0.3" />
          </svg>
        </span>
        <span className="font-semibold text-stone-900 tracking-tight text-[15px]">
          Pixel<span className="text-indigo-600">Forge</span>
        </span>
      </Link>

      {/* Hamburger — only on editor, only mobile */}
      {isEditor && onToggleSidebar && (
        <button
          onClick={onToggleSidebar}
          aria-label="Toggle menu"
          className="ml-auto md:hidden flex flex-col justify-center items-center w-8 h-8 rounded-lg hover:bg-stone-100 transition-colors gap-1.5"
        >
          <span
            className={`block h-[1.5px] w-4 bg-stone-600 transition-all duration-200 origin-center ${sidebarOpen ? "rotate-45 translate-y-[5px]" : ""
              }`}
          />
          <span
            className={`block h-[1.5px] w-4 bg-stone-600 transition-all duration-200 ${sidebarOpen ? "opacity-0 scale-x-0" : ""
              }`}
          />
          <span
            className={`block h-[1.5px] w-4 bg-stone-600 transition-all duration-200 origin-center ${sidebarOpen ? "-rotate-45 -translate-y-[5px]" : ""
              }`}
          />
        </button>
      )}


    </header>
  );
}
