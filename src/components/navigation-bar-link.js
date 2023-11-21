import Link from "next/link";

export default function NavigationBarLink({ className = "", href, children }) {
  return (
    <Link
      href={href}
      className="text-sm md:text-base text-black hover:text-slate-600 font-medium transition duration-150 ease-in-out"
    >
      {children}
    </Link>
  );
}
