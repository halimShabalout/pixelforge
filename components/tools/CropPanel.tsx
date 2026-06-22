"use client";

import { useState } from "react";

const PRESETS = [
  { label: "Free", ratio: null },
  { label: "1:1", ratio: 1 },
  { label: "4:3", ratio: 4 / 3 },
  { label: "16:9", ratio: 16 / 9 },
  { label: "3:2", ratio: 3 / 2 },
];

export default function CropPanel() {
  const [preset, setPreset] = useState<string>("Free");
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [width, setWidth] = useState(100);
  const [height, setHeight] = useState(100);

  return (
    <div className="space-y-5">
      <div>
        <p className="text-xs text-stone-500 mb-2">Aspect Ratio</p>
        <div className="grid grid-cols-3 gap-1">
          {PRESETS.map((p) => (
            <button
              key={p.label}
              onClick={() => setPreset(p.label)}
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

      <p className="text-[10px] text-stone-400">
        Interactive crop will be enabled in the preview area.
      </p>
    </div>
  );
}
