import { Link } from "react-router-dom";
export default function LaunchesList(props) {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <h1 className="mt-2 text-4xl font-extrabold text-black/75 text-center tracking-tight sm:text-5xl mb-8">
        Next Launches
      </h1>
      <div className="flex flex-col px-4 py-5 bg-white/60 shadow rounded-lg overflow-hidden sm:p-6">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 md:pl-0"
                  >
                    Mission
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
                  >
                    Date (UTC)
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
                  >
                    Launchpad
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {props.launches.map((launch) => (
                  <tr key={launch.mission}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 hover:text-pink-700 underline sm:pl-6 md:pl-0">
                      <Link to={launch.slug}>{launch.mission}</Link>
                    </td>
                    <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
                      {launch.date.toUTCString()}
                    </td>
                    <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
                      {launch.launchpad}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
