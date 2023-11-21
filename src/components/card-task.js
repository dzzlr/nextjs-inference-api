import Link from "next/link";

export default function CardTask({ href, children }) {
  return (
    <>
      <Link
        href={href}
        className="p-5 border rounded-lg bg-white hover:shadow-sm hover:bg-slate-50 hover:border-slate-200 transition duration-150 ease-in-out group"
      >
        {children}
        <div className="mt-3 flex flex-row gap-1">
          <p className="font-medium text-sm text-blue-700">Try it now!</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 text-blue-700 self-center group-hover:translate-x-1 transition duration-150 ease-out"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
            />
          </svg>
        </div>
      </Link>
    </>
  );
}
