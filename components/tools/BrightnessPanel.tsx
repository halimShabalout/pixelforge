"use client";

import { useState } from "react";

interface Slider {
  label: string;
  value: number;
  setValue: (v: number) => void;
  min: number;
  max: number;
  defaultVal: number;
}

function SliderRow({ label, value, setValue, min, max, defaultVal }: Slider) {
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <label className="text-xs text-stone-500">{label}</label>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-indigo-600">{value > 0 ? `+${value}` : value}</span>
          {value !== defaultVal && (
            <button
              onClick={() => setValue(defaultVal)}
              className="text-[10px] text-stone-400 hover:text-stone-600"
            >
              reset
            </button>
          )}
        </div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        className="w-full accent-indigo-600"
      />
    </div>
  );
}

export default function BrightnessPanel() {
  const [brightness, setBrightness] = useState(0);
  const [contrast, setContrast] = useState(0);
  const [saturation, setSaturation] = useState(0);

  const sliders: Slider[] = [
    { label: "Brightness", value: brightness, setValue: setBrightness, min: -100, max: 100, defaultVal: 0 },
    { label: "Contrast", value: contrast, setValue: setContrast, min: -100, max: 100, defaultVal: 0 },
    { label: "Saturation", value: saturation, setValue: setSaturation, min: -100, max: 100, defaultVal: 0 },
  ];

  const hasChanges = brightness !== 0 || contrast !== 0 || saturation !== 0;

  return (
    <div className="space-y-5">
      {sliders.map((s) => (
        <SliderRow key={s.label} {...s} />
      ))}
      {hasChanges && (
        <button
          onClick={() => {
            setBrightness(0);
            setContrast(0);
            setSaturation(0);
          }}
          className="text-xs text-stone-400 hover:text-stone-600 underline underline-offset-2"
        >
          Reset all adjustments
        </button>
      )}
    </div>
  );
}
