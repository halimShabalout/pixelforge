"use client";

import { useState } from "react";
import Navbar from "@/components/shared/Navbar";
import MainSidebar from "@/components/image/sidebar/MainSidebar";
import SubSidebar from "@/components/image/sidebar/SubSidebar";
import PreviewArea from "@/components/image/preview/PreviewArea";
import DownloadButton from "@/components/image/preview/DownloadButton";
import { EditorProvider } from "@/lib/image/editor-context";

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
          <MainSidebar
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />
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
