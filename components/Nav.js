import Link from "next/link";

import { acts } from "../constants";

const Nav = () => {
  return (
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
  );
};

export default Nav;
