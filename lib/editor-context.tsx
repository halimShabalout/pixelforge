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
  applyCompress: (quality: number) => Promise<void>;
  applyCrop: (x: number, y: number, width: number, height: number) => Promise<void>;
  applyRotate: (angle: number) => Promise<void>;
  applyFlip: (horizontal: boolean, vertical: boolean) => Promise<void>;
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

  // ── Compress ────────────────────────────────────────────────
  const applyCompress = useCallback(
    async (quality: number) => {
      if (!image) return;

      setIsProcessing(true);

      try {
        const canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;

        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("Canvas context unavailable");

        const img = new Image();
        await new Promise<void>((resolve, reject) => {
          img.onload = () => resolve();
          img.onerror = reject;
          img.src = image.url;
        });

        ctx.drawImage(img, 0, 0);

        // JPEG only — PNG doesn't support lossy compression
        const mimeType = "image/jpeg";
        const blob = await new Promise<Blob>((resolve, reject) => {
          canvas.toBlob(
            (b) => (b ? resolve(b) : reject(new Error("toBlob failed"))),
            mimeType,
            quality / 100  // toBlob expects 0.0 → 1.0
          );
        });

        const baseName = image.name.replace(/\.[^/.]+$/, "");
        URL.revokeObjectURL(image.url);
        const newUrl = URL.createObjectURL(blob);

        setImage({
          file: new File([blob], `${baseName}-compressed.jpg`, { type: mimeType }),
          url: newUrl,
          name: `${baseName}-compressed.jpg`,
          size: blob.size,
          width: image.width,
          height: image.height,
          type: mimeType,
        });
      } catch (err) {
        console.error("Compress failed:", err);
      } finally {
        setIsProcessing(false);
      }
    },
    [image]
  );

  // ── Crop ──────────────────────────────────────────────────────
  const applyCrop = useCallback(
    async (x: number, y: number, width: number, height: number) => {
      if (!image) return;

      setIsProcessing(true);

      try {
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("Canvas context unavailable");

        const img = new Image();
        await new Promise<void>((resolve, reject) => {
          img.onload = () => resolve();
          img.onerror = reject;
          img.src = image.url;
        });

        ctx.drawImage(img, -x, -y, image.width, image.height);

        const mimeType = image.type;
        const ext = mimeType === "image/jpeg" ? "jpg" : mimeType.split("/")[1];
        const blob = await new Promise<Blob>((resolve, reject) => {
          canvas.toBlob(
            (b) => (b ? resolve(b) : reject(new Error("toBlob failed"))),
            mimeType
          );
        });

        const baseName = image.name.replace(/\.[^/.]+$/, "");
        URL.revokeObjectURL(image.url);
        const newUrl = URL.createObjectURL(blob);

        setImage({
          file: new File([blob], `${baseName}-cropped.${ext}`, { type: mimeType }),
          url: newUrl,
          name: `${baseName}-cropped.${ext}`,
          size: blob.size,
          width,
          height,
          type: mimeType,
        });
      } catch (err) {
        console.error("Crop failed:", err);
      } finally {
        setIsProcessing(false);
      }
    },
    [image]
  );

  // ── Rotate ──────────────────────────────────────────────────────
  const applyRotate = useCallback(
    async (angle: number) => {
      if (!image) return;

      setIsProcessing(true);

      try {
        const rad = (angle * Math.PI) / 180;
        const sin = Math.abs(Math.sin(rad));
        const cos = Math.abs(Math.cos(rad));

        const newWidth = Math.round(image.width * cos + image.height * sin);
        const newHeight = Math.round(image.width * sin + image.height * cos);

        const canvas = document.createElement("canvas");
        canvas.width = newWidth;
        canvas.height = newHeight;

        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("Canvas context unavailable");

        const img = new Image();
        await new Promise<void>((resolve, reject) => {
          img.onload = () => resolve();
          img.onerror = reject;
          img.src = image.url;
        });

        ctx.translate(newWidth / 2, newHeight / 2);
        ctx.rotate(rad);
        ctx.drawImage(img, -image.width / 2, -image.height / 2);

        const mimeType = image.type;
        const ext = mimeType === "image/jpeg" ? "jpg" : mimeType.split("/")[1];
        const blob = await new Promise<Blob>((resolve, reject) => {
          canvas.toBlob(
            (b) => (b ? resolve(b) : reject(new Error("toBlob failed"))),
            mimeType
          );
        });

        const baseName = image.name.replace(/\.[^/.]+$/, "");
        URL.revokeObjectURL(image.url);
        const newUrl = URL.createObjectURL(blob);

        setImage({
          file: new File([blob], `${baseName}-rotated.${ext}`, { type: mimeType }),
          url: newUrl,
          name: `${baseName}-rotated.${ext}`,
          size: blob.size,
          width: newWidth,
          height: newHeight,
          type: mimeType,
        });
      } catch (err) {
        console.error("Rotate failed:", err);
      } finally {
        setIsProcessing(false);
      }
    },
    [image]
  );

  // ── Flip ──────────────────────────────────────────────────────
  const applyFlip = useCallback(
    async (horizontal: boolean, vertical: boolean) => {
      if (!image) return;

      setIsProcessing(true);

      try {
        const canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;

        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("Canvas context unavailable");

        const img = new Image();
        await new Promise<void>((resolve, reject) => {
          img.onload = () => resolve();
          img.onerror = reject;
          img.src = image.url;
        });

        ctx.translate(
          horizontal ? image.width : 0,
          vertical ? image.height : 0
        );
        ctx.scale(
          horizontal ? -1 : 1,
          vertical ? -1 : 1
        );
        ctx.drawImage(img, 0, 0);

        const mimeType = image.type;
        const ext = mimeType === "image/jpeg" ? "jpg" : mimeType.split("/")[1];
        const blob = await new Promise<Blob>((resolve, reject) => {
          canvas.toBlob(
            (b) => (b ? resolve(b) : reject(new Error("toBlob failed"))),
            mimeType
          );
        });

        const baseName = image.name.replace(/\.[^/.]+$/, "");
        URL.revokeObjectURL(image.url);
        const newUrl = URL.createObjectURL(blob);

        setImage({
          file: new File([blob], `${baseName}-flipped.${ext}`, { type: mimeType }),
          url: newUrl,
          name: `${baseName}-flipped.${ext}`,
          size: blob.size,
          width: image.width,
          height: image.height,
          type: mimeType,
        });
      } catch (err) {
        console.error("Flip failed:", err);
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
        applyCompress,
        applyCrop,
        applyRotate,
        applyFlip,
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
