export type ToolId =
  | "resize"
  | "compress"
  | "crop"
  | "rotate"
  | "flip"
  | "convert"
  | "brightness"
  | "grayscale";

export interface Tool {
  id: ToolId;
  label: string;
  icon: string;
  description: string;
}

export interface ImageFile {
  file: File;
  url: string;
  name: string;
  size: number;
  width: number;
  height: number;
  type: string;
}

export interface ResizeOptions {
  width: number;
  height: number;
  maintainAspectRatio: boolean;
  unit: "px" | "%";
}

export interface CompressOptions {
  quality: number;
}

export interface CropOptions {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface RotateOptions {
  angle: number;
}

export interface FlipOptions {
  horizontal: boolean;
  vertical: boolean;
}

export interface ConvertOptions {
  format: "jpeg" | "png" | "webp" | "gif";
}

export interface BrightnessOptions {
  brightness: number;
  contrast: number;
  saturation: number;
}

export type ToolOptions =
  | ResizeOptions
  | CompressOptions
  | CropOptions
  | RotateOptions
  | FlipOptions
  | ConvertOptions
  | BrightnessOptions;

export interface EditorState {
  image: ImageFile | null;
  activeTool: ToolId | null;
  isProcessing: boolean;
}
