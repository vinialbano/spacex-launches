import React from "react";
import { intervalToDuration, differenceInDays } from "date-fns";
import { Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import slugify from "slugify";
export function LaunchesList(props) {
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

export function LaunchDate(props) {
  return (
    <div>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-4">
        {props.dates.map((item) => (
          <div
            key={item.name}
            className="px-4 py-5 bg-white/40 shadow rounded-lg overflow-hidden sm:p-6"
          >
            <dt className="text-sm font-medium text-gray-500 truncate">
              {item.name}
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">
              {item.stat}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export class CurrentLaunch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.name,
      date: props.date,
      duration: intervalToDuration({
        start: new Date(),
        end: props.date,
      }),
    };
  }
  componentDidMount() {
    this.interval = setInterval(
      () =>
        this.setState({
          duration: intervalToDuration({
            start: new Date(),
            end: this.state.date,
          }),
        }),
      1000
    );
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  render() {
    return (
      <>
        <h1 className="mt-2 text-4xl font-extrabold text-black/75 text-center tracking-tight sm:text-5xl mb-8">
          Upcoming: {this.state.name}
        </h1>
        <LaunchDate
          dates={[
            {
              name: "Days",
              stat: differenceInDays(this.state.date, new Date()),
            },
            { name: "Hours", stat: this.state.duration.hours },
            { name: "Minutes", stat: this.state.duration.minutes },
            { name: "Seconds", stat: this.state.duration.seconds },
          ]}
        />
        <div className="flex mt-6 justify-center">
          <Link
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            to={"/"}
          >
            See All Launches
          </Link>
        </div>
      </>
    );
  }
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nextLaunches: [],
    };
  }

  async componentDidMount() {
    try {
      const launches = await axios
        .get("https://api.spacexdata.com/v4/launches/upcoming")
        .then((res) =>
          res.data
            .map((launch) => ({
              mission: launch.name,
              date: new Date(launch.date_utc),
              launchpad: launch.launchpad,
              slug: slugify(launch.name),
            }))
            .filter((launch) => launch.date > new Date())
            .sort((a, b) => (a.date > b.date ? 1 : -1))
        );
      const launchpads = await Promise.all(
        launches.map((launch) =>
          axios
            .get(`https://api.spacexdata.com/v4/launchpads/${launch.launchpad}`)
            .then((res) => res.data.full_name)
        )
      );
      for (let i = 0; i < launches.length; i++) {
        launches[i].launchpad = launchpads[i];
      }
      this.setState({
        nextLaunches: launches,
      });
    } catch (err) {
      alert("Error fetching data");
      console.log(err);
    }
  }

  render() {
    return (
      <main
        className="min-h-screen bg-cover bg-top sm:bg-top flex flex-col items-center justify-center"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3050&q=80&exp=8&con=-50")',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-36">
          <Routes>
            <Route
              path="/"
              element={
                <LaunchesList launches={this.state.nextLaunches}></LaunchesList>
              }
            />
            {this.state.nextLaunches.map((launch) => (
              <Route
                path={`/${launch.slug}`}
                element={
                  <CurrentLaunch
                    key={launch.mission}
                    name={launch.mission}
                    date={launch.date}
                  ></CurrentLaunch>
                }
              />
            ))}
          </Routes>
        </div>
      </main>
    );
  }
}
