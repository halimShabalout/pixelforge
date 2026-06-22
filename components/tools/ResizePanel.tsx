"use client";

import { useState } from "react";
import { useEditor } from "@/lib/editor-context";

export default function ResizePanel() {
  const { image } = useEditor();
  const [width, setWidth] = useState(image?.width ?? 800);
  const [height, setHeight] = useState(image?.height ?? 600);
  const [unit, setUnit] = useState<"px" | "%">("px");
  const [linked, setLinked] = useState(true);

  const ratio = image ? image.width / image.height : 1;

  const handleWidthChange = (val: number) => {
    setWidth(val);
    if (linked) setHeight(Math.round(val / ratio));
  };
  const handleHeightChange = (val: number) => {
    setHeight(val);
    if (linked) setWidth(Math.round(val * ratio));
  };

  return (
    <div className="space-y-5">
      <div>
        <p className="text-xs text-stone-500 mb-1">Unit</p>
        <div className="flex rounded-lg border border-stone-200 overflow-hidden">
          {(["px", "%"] as const).map((u) => (
            <button
              key={u}
              onClick={() => setUnit(u)}
              className={`flex-1 py-1.5 text-xs font-medium transition-colors ${
                unit === u ? "bg-indigo-600 text-white" : "text-stone-500 hover:bg-stone-50"
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
            value={width}
            onChange={(e) => handleWidthChange(Number(e.target.value))}
            className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400"
          />
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setLinked(!linked)}
            className={`text-xs px-3 py-1 rounded-md border transition-colors ${
              linked
                ? "border-indigo-200 text-indigo-600 bg-indigo-50"
                : "border-stone-200 text-stone-400 hover:text-stone-600"
            }`}
          >
            {linked ? "🔗 Linked" : "🔓 Unlinked"}
          </button>
        </div>

        <div>
          <label className="text-xs text-stone-500 block mb-1">Height</label>
          <input
            type="number"
            value={height}
            onChange={(e) => handleHeightChange(Number(e.target.value))}
            className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400"
          />
        </div>
      </div>

      {image && (
        <p className="text-[10px] text-stone-400">
          Original: {image.width} × {image.height} px
        </p>
      )}
    </div>
  );
}
