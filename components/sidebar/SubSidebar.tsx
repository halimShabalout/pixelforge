"use client";

import { useEditor } from "@/lib/editor-context";
import { TOOLS } from "@/lib/tools";
import ResizePanel, { getResizeValues } from "@/components/tools/ResizePanel";
import CompressPanel, { getCompressValues } from "@/components/tools/CompressPanel";
import CropPanel, {getCropValues} from "@/components/tools/CropPanel";
import RotatePanel from "@/components/tools/RotatePanel";
import FlipPanel from "@/components/tools/FlipPanel";
import ConvertPanel from "@/components/tools/ConvertPanel";
import BrightnessPanel from "@/components/tools/BrightnessPanel";
import GrayscalePanel from "@/components/tools/GrayscalePanel";

const PANELS: Record<string, React.ReactNode> = {
  resize: <ResizePanel />,
  compress: <CompressPanel />,
  crop: <CropPanel />,
  rotate: <RotatePanel />,
  flip: <FlipPanel />,
  convert: <ConvertPanel />,
  brightness: <BrightnessPanel />,
  grayscale: <GrayscalePanel />,
};

export default function SubSidebar() {
  const { activeTool, isProcessing, applyResize, applyCompress, applyCrop } = useEditor();

  if (!activeTool) return null;

  const tool = TOOLS.find((t) => t.id === activeTool);
  const panel = PANELS[activeTool];

  const handleApply = async () => {
    switch (activeTool) {
      case "resize": {
        const { width, height } = getResizeValues();
        await applyResize(width, height);
        break;
      }
      case "compress": {
        const { quality } = getCompressValues();
        await applyCompress(quality);
        break;
      }
      case "crop": {
        const { x, y, width, height } = getCropValues();
        await applyCrop(x, y, width, height);
        break;
      }
      // future tools here
    }
  };

  return (
    <aside className="w-[220px] shrink-0 border-r border-stone-200 bg-white flex flex-col">
      {/* Header */}
      <div className="px-4 py-3 border-b border-stone-100">
        <p className="text-xs font-semibold uppercase tracking-widest text-stone-400">
          {tool?.label}
        </p>
        <p className="text-[11px] text-stone-400 mt-0.5">{tool?.description}</p>
      </div>

      {/* Options */}
      <div className="flex-1 overflow-y-auto p-4">{panel}</div>

      {/* Apply button */}
      <div className="p-4 border-t border-stone-100">
        <button
          onClick={handleApply}
          disabled={isProcessing}
          className="w-full bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-semibold py-2.5 rounded-xl transition-colors shadow-sm shadow-indigo-200 flex items-center justify-center gap-2"
        >
          {isProcessing ? (
            <>
              <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              Processing…
            </>
          ) : (
            `Apply ${tool?.label}`
          )}
        </button>
      </div>
    </aside>
  );
}
