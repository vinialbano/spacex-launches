import React from "react";

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

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      launchName: "SXM-8",
      launchDates: [
        { name: "Days", stat: "2" },
        { name: "Hours", stat: "7" },
        { name: "Minutes", stat: "59" },
        { name: "Seconds", stat: "31" },
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
          <h1 className="mt-2 text-4xl font-extrabold text-black/75 tracking-tight sm:text-5xl mb-8">
            Upcoming: {this.state.launchName}
          </h1>
          <LaunchDate dates={this.state.launchDates} />
        </div>
      </main>
    );
  }
}
