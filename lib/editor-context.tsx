"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { EditorState, ImageFile, ToolId } from "@/types";
import { ACCEPTED_FORMATS, MAX_FILE_SIZE } from "@/lib/tools";

interface EditorContextValue extends EditorState {
  setActiveTool: (tool: ToolId | null) => void;
  loadImage: (file: File) => Promise<void>;
  clearImage: () => void;
  uploadError: string | null;
  applyResize: (width: number, height: number) => Promise<void>;
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

  // ── Resize ────────────────────────────────────────────────
  const applyResize = useCallback(
    async (newWidth: number, newHeight: number) => {
      if (!image) return;

      setIsProcessing(true);

      try {
        // Draw the current image onto a canvas at the new dimensions
        const canvas = document.createElement("canvas");
        canvas.width = newWidth;
        canvas.height = newHeight;

        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("Canvas context unavailable");

        // Load the current image into an HTMLImageElement
        const img = new Image();
        await new Promise<void>((resolve, reject) => {
          img.onload = () => resolve();
          img.onerror = reject;
          img.src = image.url;
        });

        // Use high-quality downscaling
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(img, 0, 0, newWidth, newHeight);

        // Convert canvas → Blob → ObjectURL
        const mimeType = image.type === "image/png" ? "image/png" : "image/jpeg";
        const quality = mimeType === "image/jpeg" ? 0.95 : undefined;

        const blob = await new Promise<Blob>((resolve, reject) => {
          canvas.toBlob(
            (b) => (b ? resolve(b) : reject(new Error("toBlob failed"))),
            mimeType,
            quality
          );
        });

        // Build the extension from mime
        const ext = mimeType === "image/png" ? "png" : "jpg";
        const baseName = image.name.replace(/\.[^/.]+$/, "");

        // Revoke the old URL before replacing
        URL.revokeObjectURL(image.url);
        const newUrl = URL.createObjectURL(blob);

        setImage({
          file: new File([blob], `${baseName}-${newWidth}x${newHeight}.${ext}`, { type: mimeType }),
          url: newUrl,
          name: `${baseName}-${newWidth}x${newHeight}.${ext}`,
          size: blob.size,
          width: newWidth,
          height: newHeight,
          type: mimeType,
        });
      } catch (err) {
        console.error("Resize failed:", err);
      } finally {
        setIsProcessing(false);
      }
    },
    [image]
  );

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
        applyResize,
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
