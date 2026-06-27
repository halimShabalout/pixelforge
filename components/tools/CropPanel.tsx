"use client";

import { useEffect, useState } from "react";
import { useEditor } from "@/lib/editor-context";

const PRESETS = [
  { label: "Free", ratio: null },
  { label: "1:1", ratio: 1 },
  { label: "4:3", ratio: 4 / 3 },
  { label: "16:9", ratio: 16 / 9 },
  { label: "3:2", ratio: 3 / 2 },
];

export let getCropValues: () => { x: number; y: number; width: number; height: number } = () => ({
  x: 0, y: 0, width: 100, height: 100,
});

export default function CropPanel() {
  const { image } = useEditor();
  const [preset, setPreset] = useState<string>("Free");
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [width, setWidth] = useState(image?.width ?? 100);
  const [height, setHeight] = useState(image?.height ?? 100);

  // Sync when image loads
  useEffect(() => {
    if (image) {
      setX(0);
      setY(0);
      setWidth(image.width);
      setHeight(image.height);
      setPreset("Free");
    }
  }, [image]);

  // Register getter
  useEffect(() => {
    getCropValues = () => ({ x, y, width, height });
  }, [x, y, width, height]);

  // Apply preset ratio
  const handlePreset = (p: typeof PRESETS[number]) => {
    setPreset(p.label);
    if (!p.ratio || !image) return;
    const newWidth = image.width;
    const newHeight = Math.round(newWidth / p.ratio);
    setX(0);
    setY(Math.round((image.height - newHeight) / 2));
    setWidth(newWidth);
    setHeight(newHeight);
  };

  return (
    <div className="space-y-5">
      <div>
        <p className="text-xs text-stone-500 mb-2">Aspect Ratio</p>
        <div className="grid grid-cols-3 gap-1">
          {PRESETS.map((p) => (
            <button
              key={p.label}
              onClick={() => handlePreset(p)}
              className={`py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                preset === p.label
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "border-stone-200 text-stone-500 hover:border-stone-300"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {[
          { label: "X", value: x, set: setX },
          { label: "Y", value: y, set: setY },
          { label: "Width", value: width, set: setWidth },
          { label: "Height", value: height, set: setHeight },
        ].map(({ label, value, set }) => (
          <div key={label}>
            <label className="text-xs text-stone-500 block mb-1">{label}</label>
            <input
              type="number"
              value={value}
              onChange={(e) => set(Number(e.target.value))}
              className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>
        ))}
      </div>

      {image && (
        <p className="text-[10px] text-stone-400">
          Original: {image.width} × {image.height} px
        </p>
      )}
    </div>
  );
}