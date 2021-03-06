import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Nav from "./components/nav";
import NotFound from "./components/notFound";
import { ThemeProvider } from "./contexts/theme";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Loading from "./components/loading";

const Popular = React.lazy(() => import("./components/popular"));
const Battle = React.lazy(() => import("./components/battle"));
const Results = React.lazy(() => import("./components/results"));

export default class App extends React.Component {
  state = {
    theme: "light",
    toggleTheme: () => {
      this.setState(({ theme }) => ({
        theme: theme === "light" ? "dark" : "light",
      }));
    },
  };
  render() {
    return (
      <Router>
        <ThemeProvider value={this.state}>
          <div className={this.state.theme}>
            <div className="container">
              <Nav />
              <React.Suspense fallback={<Loading />}>
                <Switch>
                  <Route exact path="/" component={Popular} />
                  <Route exact path="/battle" component={Battle} />
                  <Route path="/battle/results" component={Results} />
                  <Route component={NotFound} />
                </Switch>
              </React.Suspense>
            </div>
          </div>
        </ThemeProvider>
      </Router>
    );
  }
}
ReactDOM.render(<App />, document.getElementById("app"));
