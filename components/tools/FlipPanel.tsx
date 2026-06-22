"use client";

import { useState } from "react";

export default function FlipPanel() {
  const [h, setH] = useState(false);
  const [v, setV] = useState(false);

  const Toggle = ({
    label,
    value,
    onChange,
    icon,
  }: {
    label: string;
    value: boolean;
    onChange: () => void;
    icon: string;
  }) => (
    <button
      onClick={onChange}
      className={`flex-1 flex flex-col items-center gap-2 py-4 rounded-xl border-2 transition-all ${
        value
          ? "border-indigo-400 bg-indigo-50 text-indigo-700"
          : "border-stone-200 text-stone-400 hover:border-stone-300"
      }`}
    >
      <span className="text-2xl">{icon}</span>
      <span className="text-xs font-medium">{label}</span>
    </button>
  );

  return (
    <div className="space-y-4">
      <p className="text-xs text-stone-500">Select flip direction</p>
      <div className="flex gap-3">
        <Toggle label="Horizontal" value={h} onChange={() => setH(!h)} icon="↔️" />
        <Toggle label="Vertical" value={v} onChange={() => setV(!v)} icon="↕️" />
      </div>
      {!h && !v && (
        <p className="text-[11px] text-stone-400">Select at least one direction to flip.</p>
      )}
    </div>
  );
}
