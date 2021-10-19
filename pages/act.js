import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { google } from "googleapis";

import { acts } from "../constants";

const Act = ({ data }) => {
  const router = useRouter();
  const {
    query: { n = 1 },
  } = router;

  const act = n - 1;
  const actData = data[act].values.flat();
  const [header, ...steps] = actData;

  return (
    <div className="flex flex-col min-h-screen bg-gray-800">
      <Head>
        <title>Leveling | Act {act}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className="flex px-6 py-2 text-lg bg-gray-900 shadow-sm text-gray-300 mb-6">
        <h1 className="flex-1 font-semibold">Path of Exile Leveling Guide</h1>
        <div className="flex justify-between flex-1 ml-4">
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
      </nav>

      <div className="px-6 text-gray-100 font-semibold">
        Leveling guide for {header}
      </div>

      <div className="px-8 py-4 text-gray-300">
        {steps.map((text, i) => (
          <p key={i} className="py-1">
            {text}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Act;

export async function getStaticProps() {
  const ranges = Array.from({ length: 10 }, (_, i) => `Act ${i + 1}`);

  try {
    const target = ["https://www.googleapis.com/auth/spreadsheets.readonly"];
    const jwt = new google.auth.JWT(
      process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      null,
      (process.env.GOOGLE_SHEETS_PRIVATE_KEY || "").replace(/\\n/g, "\n"),
      target
    );

    const sheets = google.sheets({ version: "v4", auth: jwt });

    const {
      data: { valueRanges },
    } = await sheets.spreadsheets.values.batchGet({
      spreadsheetId: process.env.SPREADSHEET_ID,
      ranges,
    });

    return {
      props: { data: valueRanges },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {},
    };
  }
}
