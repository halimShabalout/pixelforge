import Link from "next/link";
import Navbar from "@/components/shared/Navbar";

export default function FilesPage() {
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
              <path d="M4 8h14M14 4l4 4-4 4" />
              <path d="M20 16H6M10 12l-4 4 4 4" />
            </svg>
          </span>

          <h1 className="mt-6 text-3xl font-bold tracking-tight text-stone-900">
            File Tools
          </h1>
          <p className="mt-3 text-base leading-relaxed text-stone-500">
            This section is under development. We are building tools to convert
            and manage files across many formats right in your browser.
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
