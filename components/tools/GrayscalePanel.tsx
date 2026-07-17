"use client";

import { useEffect, useState } from "react";

const MODES = [
  {
    id: "luminosity",
    label: "Luminosity",
    desc: "Natural grayscale based on human perception",
  },
  { id: "average", label: "Average", desc: "Equal weight to all channels" },
  {
    id: "desaturate",
    label: "Desaturate",
    desc: "Based on min/max channel values",
  },
];
export let getGrayscaleValues: () => { mode: string } = () => ({
  mode: "luminosity",
});

export default function GrayscalePanel() {
  const [mode, setMode] = useState("luminosity");

  useEffect(() => {
    getGrayscaleValues = () => ({ mode });
  }, [mode]);

  return (
    <div className="space-y-4">
      <div className="rounded-lg bg-stone-50 border border-stone-200 p-3">
        <p className="text-xs font-medium text-stone-700">
          Convert to black & white
        </p>
        <p className="text-[10px] text-stone-400 mt-0.5">
          Choose the algorithm used to calculate grayscale values.
        </p>
      </div>

      <div>
        <p className="text-xs text-stone-500 mb-2">Mode</p>
        <div className="space-y-2">
          {MODES.map((m) => (
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              className={`w-full flex items-start gap-3 px-3 py-2.5 rounded-lg border-2 text-left transition-all ${
                mode === m.id
                  ? "border-indigo-400 bg-indigo-50"
                  : "border-stone-200 hover:border-stone-300"
              }`}
            >
              <span
                className={`mt-0.5 w-3.5 h-3.5 rounded-full border-2 shrink-0 ${
                  mode === m.id
                    ? "border-indigo-600 bg-indigo-600"
                    : "border-stone-300"
                }`}
              />
              <div>
                <p
                  className={`text-xs font-medium ${mode === m.id ? "text-indigo-700" : "text-stone-700"}`}
                >
                  {m.label}
                </p>
                <p className="text-[10px] text-stone-400">{m.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
