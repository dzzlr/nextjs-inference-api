import Head from "next/head";

export default function Layout(props) {
  return (
    <>
      <Head>
        <title>ML Playground | {props.title}</title>
        <link rel="icon" href=""></link>
      </Head>
      <div className="min-h-screen bg-white">
        <div className="flex flex-col sm:justify-center items-center pt-6 sm:pt-0 lg:pt-14 lg:pb-14">
          {props.children}
        </div>
      </div>
    </>
  );
}
