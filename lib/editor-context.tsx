"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { EditorState, ImageFile, ToolId } from "@/types";
import { ACCEPTED_FORMATS, MAX_FILE_SIZE } from "@/lib/tools";

interface EditorContextValue extends EditorState {
  setActiveTool: (tool: ToolId | null) => void;
  loadImage: (file: File) => Promise<void>;
  clearImage: () => void;
  uploadError: string | null;
}

const EditorContext = createContext<EditorContextValue | null>(null);

export function EditorProvider({ children }: { children: React.ReactNode }) {
  const [image, setImage] = useState<ImageFile | null>(null);
  const [activeTool, setActiveTool] = useState<ToolId | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const loadImage = useCallback(async (file: File) => {
    setUploadError(null);

    if (!ACCEPTED_FORMATS.includes(file.type)) {
      setUploadError("Unsupported format. Please upload a JPEG, PNG, WebP, GIF, or BMP image.");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setUploadError("File too large. Maximum size is 20MB.");
      return;
    }

    setIsProcessing(true);

    const url = URL.createObjectURL(file);

    const img = new Image();
    img.onload = () => {
      setImage({
        file,
        url,
        name: file.name,
        size: file.size,
        width: img.naturalWidth,
        height: img.naturalHeight,
        type: file.type,
      });
      setIsProcessing(false);
      setActiveTool(null);
    };
    img.onerror = () => {
      setUploadError("Failed to load image. Please try another file.");
      setIsProcessing(false);
      URL.revokeObjectURL(url);
    };
    img.src = url;
  }, []);

  const clearImage = useCallback(() => {
    if (image?.url) URL.revokeObjectURL(image.url);
    setImage(null);
    setActiveTool(null);
    setUploadError(null);
  }, [image]);

  return (
    <EditorContext.Provider
      value={{
        image,
        activeTool,
        isProcessing,
        uploadError,
        setActiveTool,
        loadImage,
        clearImage,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
}

export function useEditor() {
  const ctx = useContext(EditorContext);
  if (!ctx) throw new Error("useEditor must be used within EditorProvider");
  return ctx;
}
