import Head from "next/head";
import Link from "next/link";

import { acts } from "../constants";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Poe leveling guide</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Hi</h1>
      {acts.map((act) => (
        <Link
          key={act}
          href={{
            pathname: "/act",
            query: { n: act },
          }}
        >
          <a>Act {act}</a>
        </Link>
      ))}
    </div>
  );
}
