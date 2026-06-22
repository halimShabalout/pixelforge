"use client";

import { useState } from "react";
import Navbar from "@/components/navbar/Navbar";
import MainSidebar from "@/components/sidebar/MainSidebar";
import SubSidebar from "@/components/sidebar/SubSidebar";
import PreviewArea from "@/components/preview/PreviewArea";
import DownloadButton from "@/components/preview/DownloadButton";
import { EditorProvider } from "@/lib/editor-context";

export default function EditorShell() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <EditorProvider>
      <div className="flex flex-col h-screen overflow-hidden">
        <Navbar
          onToggleSidebar={() => setSidebarOpen((v) => !v)}
          sidebarOpen={sidebarOpen}
        />
        <div className="flex flex-1 overflow-hidden">
          <MainSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          <SubSidebar />
          <div className="flex-1 flex flex-col overflow-hidden">
            <PreviewArea />
            <DownloadButton />
          </div>
        </div>
      </div>
    </EditorProvider>
  );
}
