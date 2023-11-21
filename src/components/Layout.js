import Head from "next/head";
import NavigationBar from "./navigation-bar";
import Footer from "./footer";

export default function Layout(props) {
  return (
    <>
      <Head>
        <title>ML Playground | {props.title}</title>
        <link rel="icon" href=""></link>
      </Head>
      <NavigationBar/>
      <div className="min-h-screen bg-white">
        <div className="flex flex-col justify-center items-center pt-10 md:pt-12 lg:pt-14 lg:pb-14">
          {props.children}
        </div>
      </div>
      <Footer/>
    </>
  );
}
