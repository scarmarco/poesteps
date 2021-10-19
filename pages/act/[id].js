import Head from "next/head";
import { google } from "googleapis";

import React from "react";

const Act = ({ data, id }) => {
  const [header, ...steps] = data;
  return (
    <div className="flex flex-col min-h-screen bg-gray-800">
      <Head>
        <title>Leveling | Act {id}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="px-6 py-2 text-gray-100 text-lg bg-gray-900 shadow-sm">
        Leveling guide for {header}
      </header>

      <div className="px-8 py-4 text-gray-300">
        {steps.map((text) => (
          <p className="py-1">{text}</p>
        ))}
      </div>
    </div>
  );
};

export default Act;

export async function getStaticPaths() {
  const paths = Array.from({ length: 10 }, (_, i) => ({
    params: { id: `${i + 1}` },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  try {
    const target = ["https://www.googleapis.com/auth/spreadsheets.readonly"];
    const jwt = new google.auth.JWT(
      process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      null,
      (process.env.GOOGLE_SHEETS_PRIVATE_KEY || "").replace(/\\n/g, "\n"),
      target
    );

    const sheets = google.sheets({ version: "v4", auth: jwt });

    const range = `Act ${params.id}`;

    const {
      data: { values },
    } = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range,
    });

    const data = values.flat();

    return {
      props: { data, id: params.id },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {},
    };
  }
}
