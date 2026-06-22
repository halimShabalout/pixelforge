"use client";

import { useState } from "react";

const QUICK = [90, 180, 270];

export default function RotatePanel() {
  const [angle, setAngle] = useState(0);

  return (
    <div className="space-y-5">
      <div>
        <div className="flex justify-between items-center mb-1">
          <label className="text-xs text-stone-500">Angle</label>
          <span className="text-xs font-semibold text-indigo-600">{angle}°</span>
        </div>
        <input
          type="range"
          min={-180}
          max={180}
          value={angle}
          onChange={(e) => setAngle(Number(e.target.value))}
          className="w-full accent-indigo-600"
        />
        <div className="flex justify-between text-[10px] text-stone-400 mt-1">
          <span>-180°</span>
          <span>+180°</span>
        </div>
      </div>

      <div>
        <p className="text-xs text-stone-500 mb-2">Quick rotate</p>
        <div className="flex gap-2">
          {QUICK.map((q) => (
            <button
              key={q}
              onClick={() => setAngle(q)}
              className="flex-1 py-1.5 rounded-lg text-xs font-medium border border-stone-200 text-stone-500 hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
            >
              {q}°
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-xs text-stone-500 block mb-1">Custom angle</label>
        <input
          type="number"
          value={angle}
          min={-180}
          max={180}
          onChange={(e) => setAngle(Number(e.target.value))}
          className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-indigo-300"
        />
      </div>
    </div>
  );
}
