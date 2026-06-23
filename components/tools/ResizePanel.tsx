"use client";

import { useEffect, useState } from "react";
import { useEditor } from "@/lib/editor-context";

// Expose current resize values so SubSidebar can call applyResize
// We use a module-level ref so SubSidebar can read without prop drilling
export let getResizeValues: () => { width: number; height: number } = () => ({
  width: 0,
  height: 0,
});

export default function ResizePanel() {
  const { image } = useEditor();
  const [width, setWidth] = useState(image?.width ?? 800);
  const [height, setHeight] = useState(image?.height ?? 600);
  const [unit, setUnit] = useState<"px" | "%">("px");
  const [linked, setLinked] = useState(true);

  // Sync when a new image is loaded
  useEffect(() => {
    if (image) {
      setWidth(image.width);
      setHeight(image.height);
      setUnit("px");
    }
  }, [image]);

  // Register getter so SubSidebar can read the values
  useEffect(() => {
    getResizeValues = () => {
      if (!image) return { width, height };
      if (unit === "%") {
        return {
          width: Math.max(1, Math.round((width / 100) * image.width)),
          height: Math.max(1, Math.round((height / 100) * image.height)),
        };
      }
      return { width: Math.max(1, width), height: Math.max(1, height) };
    };
  }, [width, height, unit, image]);

  const ratio = image ? image.width / image.height : 1;

  const handleWidthChange = (val: number) => {
    setWidth(val);
    if (linked) {
      if (unit === "px") setHeight(Math.max(1, Math.round(val / ratio)));
      else setHeight(val); // keep same % for both when linked
    }
  };

  const handleHeightChange = (val: number) => {
    setHeight(val);
    if (linked) {
      if (unit === "px") setWidth(Math.max(1, Math.round(val * ratio)));
      else setWidth(val);
    }
  };

  // Preview dimensions in px (always shown)
  const previewW =
    unit === "%"
      ? Math.max(1, Math.round(((width ?? 0) / 100) * (image?.width ?? 0)))
      : Math.max(1, width);
  const previewH =
    unit === "%"
      ? Math.max(1, Math.round(((height ?? 0) / 100) * (image?.height ?? 0)))
      : Math.max(1, height);

  const sizeChanged =
    image && (previewW !== image.width || previewH !== image.height);

  return (
    <div className="space-y-5">
      <div>
        <p className="text-xs text-stone-500 mb-1">Unit</p>
        <div className="flex rounded-lg border border-stone-200 overflow-hidden">
          {(["px", "%"] as const).map((u) => (
            <button
              key={u}
              onClick={() => {
                // Convert current values when switching unit
                if (u === "%" && unit === "px" && image) {
                  setWidth(Math.round((width / image.width) * 100));
                  setHeight(Math.round((height / image.height) * 100));
                } else if (u === "px" && unit === "%" && image) {
                  setWidth(Math.max(1, Math.round((width / 100) * image.width)));
                  setHeight(Math.max(1, Math.round((height / 100) * image.height)));
                }
                setUnit(u);
              }}
              className={`flex-1 py-1.5 text-xs font-medium transition-colors ${unit === u
                ? "bg-indigo-600 text-white"
                : "text-stone-500 hover:bg-stone-50"
                }`}
            >
              {u}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <label className="text-xs text-stone-500 block mb-1">Width</label>
          <input
            type="number"
            min={1}
            max={unit === "%" ? 1000 : 20000}
            value={width}
            onChange={(e) => handleWidthChange(Number(e.target.value))}
            className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400"
          />
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setLinked(!linked)}
            className={`text-xs px-3 py-1 rounded-md border transition-colors ${linked
              ? "border-indigo-200 text-indigo-600 bg-indigo-50"
              : "border-stone-200 text-stone-400 hover:text-stone-600"
              }`}
          >
            {linked ? "🔗 Linked" : "🔓 Unlinked"}
          </button>
        </div>
        <div>
          <label className="text-xs text-stone-500 block mb-1">
            Height {unit === "%" && image && <span className="text-stone-300">({previewH}px)</span>}
          </label>
          <input
            type="number"
            min={1}
            max={unit === "%" ? 1000 : 20000}
            value={height}
            onChange={(e) => handleHeightChange(Number(e.target.value))}
            className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        {image && (
          <p className="text-[10px] text-stone-400">
            Original: {image.width} × {image.height} px
          </p>
        )}
        {sizeChanged && (
          <p className="text-[10px] text-indigo-500 font-medium">
            → {previewW} × {previewH} px
          </p>
        )}
      </div>
    </div>
  );
}
