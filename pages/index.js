import Head from "next/head";

import Nav from "../components/Nav";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-800 text-gray-300">
      <Head>
        <title>Poe leveling guide</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />

      <div className="p-4">
        <h1>Welcome</h1>
      </div>
    </div>
  );
}
