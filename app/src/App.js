import React from "react";
import { intervalToDuration } from "date-fns";
import { Routes, Route, Link } from "react-router-dom";

export function LaunchesList(props) {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <h1 className="mt-2 text-4xl font-extrabold text-black/75 tracking-tight sm:text-5xl mb-8">
        Next Launches
      </h1>
      <div className="flex flex-col px-4 py-5 bg-white/40 shadow rounded-lg overflow-hidden sm:p-6">
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
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 md:pl-0">
                      {launch.mission}
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
        <h1 className="mt-2 text-4xl font-extrabold text-black/75 tracking-tight sm:text-5xl mb-8">
          Upcoming: {this.state.name}
        </h1>
        <LaunchDate
          dates={[
            { name: "Days", stat: this.state.duration.days },
            { name: "Hours", stat: this.state.duration.hours },
            { name: "Minutes", stat: this.state.duration.minutes },
            { name: "Seconds", stat: this.state.duration.seconds },
          ]}
        />
      </>
    );
  }
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nextLaunches: [
        {
          mission: "SAOCOM 1B & Smallsat Rideshare 1",
          date: new Date("2023-07-01T00:00:00.000Z"),
          launchpad: "CCAFS SLC-40",
        },
      ],
    };
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
        <div className="max-w-7xl mx-auto px-4 py-16 text-center sm:px-6 sm:py-24 lg:px-8 lg:py-48">
          <Routes>
            <Route
              path="/"
              element={
                <LaunchesList launches={this.state.nextLaunches}></LaunchesList>
              }
            />
            {/* {this.state.nextLaunches.map((launch) => ( */}
            <Route
              path={`/current`}
              element={
                <CurrentLaunch
                  name={this.state.nextLaunches[0].mission}
                  date={this.state.nextLaunches[0].date}
                ></CurrentLaunch>
              }
            />
            {/* ))} */}
          </Routes>
        </div>
      </main>
    );
  }
}
