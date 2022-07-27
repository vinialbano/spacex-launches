import React from "react";
import { Link } from "react-router-dom";
import { intervalToDuration, differenceInDays } from "date-fns";
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

export default class CurrentLaunch extends React.Component {
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
