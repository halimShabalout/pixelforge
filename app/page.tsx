import Link from "next/link";
import Navbar from "@/components/shared/Navbar";

type Studio = {
  title: string;
  description: string;
  href: string;
  tools?: string[];
  icon: React.ReactNode;
};

const iconProps = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const studios: Studio[] = [
  {
    title: "Image Studio",
    description:
      "Edit, resize, compress, and convert images in your browser. No uploads to servers, no account required.",
    href: "/image",
    tools: [
      "Resize",
      "Compress",
      "Crop",
      "Rotate",
      "Flip",
      "Convert",
      "Adjust",
      "Grayscale",
    ],
    icon: (
      <svg {...iconProps}>
        <rect x="3" y="4" width="18" height="16" rx="3" />
        <circle cx="9" cy="10" r="1.8" />
        <path d="M21 16l-5-5-8 9" />
      </svg>
    ),
  },
  {
    title: "Video Studio",
    description:
      "Create and edit videos right in your browser, without installing anything.",
    href: "/video",
    icon: (
      <svg {...iconProps}>
        <rect x="3" y="5" width="18" height="14" rx="3" />
        <path d="M10.5 9.5v5l4-2.5-4-2.5z" />
      </svg>
    ),
  },
  {
    title: "PDF Studio",
    description:
      "Edit and manage PDF files: merge, split, reorder pages, and more.",
    href: "/pdf",
    icon: (
      <svg {...iconProps}>
        <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5z" />
        <path d="M14 3v5h5" />
        <path d="M9 13h6M9 17h4" />
      </svg>
    ),
  },
  {
    title: "File Tools",
    description:
      "Convert and manage files across many formats with a few clicks.",
    href: "/files",
    icon: (
      <svg {...iconProps}>
        <path d="M4 8h14M14 4l4 4-4 4" />
        <path d="M20 16H6M10 12l-4 4 4 4" />
      </svg>
    ),
  },
];

function StudioCard({ studio }: { studio: Studio }) {
  const { title, description, href, tools, icon } = studio;

  return (
    <Link
      href={href}
      className="group flex h-full flex-col rounded-2xl border border-indigo-200 bg-white p-6 shadow-sm shadow-indigo-100 motion-safe:transition motion-safe:hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-md hover:shadow-indigo-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-50"
    >
      <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-200">
        {icon}
      </span>

      <h2 className="mt-5 text-lg font-semibold text-stone-900">{title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-stone-500">
        {description}
      </p>

      {tools && (
        <ul className="mt-4 flex flex-wrap gap-2">
          {tools.map((tool) => (
            <li
              key={tool}
              className="rounded-full border border-stone-200 bg-stone-50 px-2.5 py-1 text-xs text-stone-500"
            >
              {tool}
            </li>
          ))}
        </ul>
      )}

      <span className="mt-6 inline-flex items-center gap-2 pt-1 text-sm font-semibold text-indigo-600 group-hover:text-indigo-700">
        Open {title}
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M3 7h8M8 4l3 3-3 3"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </Link>
  );
}

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 bg-stone-50 px-4 sm:px-6 py-10 sm:py-14">
        <div className="mx-auto w-full max-w-4xl">
          <header className="text-center max-w-xl mx-auto">
            <span className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-indigo-600 shadow-lg shadow-indigo-200">
              <svg
                width="28"
                height="28"
                viewBox="0 0 32 32"
                fill="none"
                aria-hidden="true"
              >
                <rect
                  x="3"
                  y="3"
                  width="11"
                  height="11"
                  rx="2.5"
                  fill="white"
                />
                <rect
                  x="18"
                  y="3"
                  width="11"
                  height="11"
                  rx="2.5"
                  fill="white"
                  opacity="0.6"
                />
                <rect
                  x="3"
                  y="18"
                  width="11"
                  height="11"
                  rx="2.5"
                  fill="white"
                  opacity="0.6"
                />
                <rect
                  x="18"
                  y="18"
                  width="11"
                  height="11"
                  rx="2.5"
                  fill="white"
                  opacity="0.3"
                />
              </svg>
            </span>

            <h1 className="mt-5 text-3xl sm:text-4xl font-bold tracking-tight text-stone-900">
              Pixel<span className="text-indigo-600">Forge</span>
            </h1>
            <p className="mt-3 text-base text-stone-500 leading-relaxed">
              One workspace for your images, videos, PDFs, and files. Everything
              runs locally in your browser.
            </p>
          </header>

          <ul className="mt-10 sm:mt-12 grid gap-4 sm:grid-cols-2">
            {studios.map((studio) => (
              <li key={studio.title}>
                <StudioCard studio={studio} />
              </li>
            ))}
          </ul>

          <p className="mt-10 text-center text-xs text-stone-500">
            All processing happens locally in your browser. Your files never
            leave your device.
          </p>
        </div>
      </main>
    </div>
  );
}
