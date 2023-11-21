import Link from "next/link";
import { useState } from "react";
import Logo from "./logo";
import NavigationBarLink from "./navigation-bar-link";

export default function NavigationBar({ className = "", children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="fixed w-full flex justify-center bg-white border-2 border-b-slate-100 z-50">
        <div className="flex flex-col lg:flex-row w-full md:w-11/12 lg:w-4/6 px-4 py-2 md:py-3 justify-between bg-white">
          <div className="flex justify-between">
            <Link href="">
              <Logo fontColor={"text-black"} />
            </Link>
            <button className="block lg:hidden" onClick={() => setIsOpen(!isOpen)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-black"
              >
                <path
                  className={`${!isOpen ? 'hidden' : 'block'}`}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
                <path
                  className={`${isOpen ? 'hidden' : 'block'}`}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div
            className={`${
              isOpen ? "hidden" : "block"
            } lg:flex flex-col lg:flex-row gap-3 my-auto py-4 lg:py-0`}
          >
            <NavigationBarLink href="">Tasks</NavigationBarLink>
            <NavigationBarLink href="">About</NavigationBarLink>
          </div>
        </div>
      </nav>
    </>
  );
}
