import { Tool } from "@/types";

export const TOOLS: Tool[] = [
  {
    id: "resize",
    label: "Resize",
    icon: "⤡",
    description: "Change image dimensions",
  },
  {
    id: "compress",
    label: "Compress",
    icon: "◈",
    description: "Reduce file size",
  },
  {
    id: "crop",
    label: "Crop",
    icon: "⊡",
    description: "Trim image area",
  },
  {
    id: "rotate",
    label: "Rotate",
    icon: "↻",
    description: "Rotate image",
  },
  {
    id: "flip",
    label: "Flip",
    icon: "⇔",
    description: "Mirror horizontally or vertically",
  },
  {
    id: "convert",
    label: "Convert",
    icon: "⇄",
    description: "Change file format",
  },
  {
    id: "brightness",
    label: "Adjust",
    icon: "◑",
    description: "Brightness, contrast & saturation",
  },
  {
    id: "grayscale",
    label: "Grayscale",
    icon: "◐",
    description: "Convert to black & white",
  },
];

export const ACCEPTED_FORMATS = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/bmp"];
export const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB
