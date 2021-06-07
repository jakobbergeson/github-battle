import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Popular from "./components/popular";
import Battle from "./components/battle";

export default class App extends React.Component {
  render() {
    return (
      <div className="container">
        {/* <Popular /> */}
        <Battle />
      </div>
    );
  }
}
ReactDOM.render(<App />, document.getElementById("app"));
