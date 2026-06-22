"use client";

import { TOOLS } from "@/lib/tools";
import { useEditor } from "@/lib/editor-context";
import UploadButton from "./UploadButton";

interface MainSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MainSidebar({ isOpen, onClose }: MainSidebarProps) {
  const { activeTool, setActiveTool, image } = useEditor();

  const content = (
    <aside className="w-[200px] shrink-0 border-r border-stone-200 bg-white flex flex-col h-full">
      <div className="pt-3">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-stone-400 px-4 pb-2">
          Image
        </p>
        <UploadButton />
      </div>

      <div className="flex-1 overflow-y-auto">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-stone-400 px-4 pb-2 pt-1">
          Tools
        </p>
        <nav className="px-2 pb-4 space-y-0.5">
          {TOOLS.map((tool) => {
            const isActive = activeTool === tool.id;
            const isDisabled = !image;

            return (
              <button
                key={tool.id}
                disabled={isDisabled}
                onClick={() => {
                  setActiveTool(isActive ? null : tool.id);
                  onClose();
                }}
                className={`w-full flex items-center gap-3 px-2.5 py-2 rounded-lg text-left transition-all text-sm
                  ${isDisabled
                    ? "opacity-40 cursor-not-allowed text-stone-400"
                    : isActive
                    ? "bg-indigo-50 text-indigo-700 font-medium"
                    : "text-stone-600 hover:bg-stone-50 hover:text-stone-800"
                  }`}
              >
                <span className={`text-base w-5 text-center shrink-0 ${isActive ? "text-indigo-500" : ""}`}>
                  {tool.icon}
                </span>
                <span className="truncate">{tool.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );

  return (
    <>
      {/* Desktop: always visible */}
      <div className="hidden md:flex h-full">
        {content}
      </div>

      {/* Mobile: slide-in drawer */}
      <>
        {/* Backdrop */}
        <div
          className={`md:hidden fixed inset-0 bg-black/30 z-20 backdrop-blur-[1px] transition-opacity duration-200 ${
            isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
          onClick={onClose}
        />
        {/* Drawer */}
        <div
          className={`md:hidden fixed left-0 top-14 bottom-0 z-30 flex shadow-xl transition-transform duration-200 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {content}
        </div>
      </>
    </>
  );
}
