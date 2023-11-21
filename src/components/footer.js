import Link from "next/link";
import Logo from "./logo";

export default function Footer(props) {
  return (
    <div className="w-full bg-slate-50">
      <div className="w-full md:w-11/12 lg:w-4/6 px-6 py-7 mx-0 md:mx-auto sm:rounded-lg items-center">
        <div className="flex flex-col md:flex-row justify-between gap-2 lg:gap-10">
          <div className="my-auto">
            <Logo fontColor={'text-white'}/>
          </div>
          <div className="flex flex-col mt-2 gap-1">
            <div className="text-slate-500 font-medium">Explore</div>
            <Link href="" className="text-slate-400 hover:text-slate-600 transition duration-150 ease-in-out">About Us</Link>
            <Link href="" className="text-slate-400 hover:text-slate-600 transition duration-150 ease-in-out">Disclaimer</Link>
            <Link href="" className="text-slate-400 hover:text-slate-600 transition duration-150 ease-in-out">Our Team</Link>
          </div>
          <div className="flex flex-col mt-2 gap-1">
            <div className="text-slate-500 font-medium">Contact Us</div>
            <Link href="" className="text-slate-400 hover:text-slate-600 transition duration-150 ease-in-out">contact@mlplayground.id</Link>
            <Link href="" className="text-slate-400 hover:text-slate-600 transition duration-150 ease-in-out">Instagram</Link>
            <Link href="" className="text-slate-400 hover:text-slate-600 transition duration-150 ease-in-out">Twitter</Link>
          </div>
        </div>
        <div className="flex flex-col">
          <hr className="h-px my-8 bg-slate-300 border-0"/>
          <div className="w-full flex flex-col md:flex-row justify-between gap-4 md:gap-10">
            <p className="w-full md:w-1/3 text-sm md:text-base text-center md:text-left text-slate-500">Machine Learning Playground is a platform for inference APIs of machine learning model</p>
            <p className="my-auto text-sm md:text-base text-center md:text-left text-slate-500">Copyright © 2023 Machine Learning Playground</p>
          </div>
        </div>
      </div>
    </div>
  );
}
