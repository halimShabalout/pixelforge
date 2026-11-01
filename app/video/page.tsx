import Link from "next/link";
import Navbar from "@/components/shared/Navbar";

export default function VideoPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 flex items-center justify-center bg-stone-50 px-6 py-12">
        <div className="text-center max-w-md">
          <span className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-200">
            <svg
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="3" y="5" width="18" height="14" rx="3" />
              <path d="M10.5 9.5v5l4-2.5-4-2.5z" />
            </svg>
          </span>

          <h1 className="mt-6 text-3xl font-bold tracking-tight text-stone-900">
            Video Studio
          </h1>
          <p className="mt-3 text-base leading-relaxed text-stone-500">
            This section is under development. We are building tools to create
            and edit videos right in your browser.
          </p>

          <Link
            href="/"
            className="mt-8 inline-flex items-center gap-2 rounded-xl border border-stone-200 bg-white px-5 py-2.5 text-sm font-semibold text-stone-700 shadow-sm hover:bg-stone-100 motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-50"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M11 7H3M6 4L3 7l3 3"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Back to home
          </Link>
        </div>
      </main>
    </div>
  );
}
