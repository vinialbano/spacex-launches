import React from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import slugify from "slugify";
import LaunchesList from "./LaunchesList";
import CurrentLaunch from "./CurrentLaunch";
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
        <div className="max-w-7xl w-full mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-36">
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
