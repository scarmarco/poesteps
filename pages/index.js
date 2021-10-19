import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Hi</h1>
      <Link
        href={{
          pathname: "/act",
          query: { n: 1 },
        }}
      >
        <a>Go</a>
      </Link>
    </div>
  );
}
