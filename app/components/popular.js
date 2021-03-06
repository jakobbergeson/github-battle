import * as React from "react";
import PropTypes from "prop-types";
import { fetchPopularRepos } from "../utils/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faStar,
  faCodeBranch,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import Card from "./card";
import Loading from "./loading";
import Tooltip from "./tooltip";

function LangaugesNav({ selected, onUpdateLanguage }) {
  const languages = ["All", "JavaScript", "Ruby", "Java", "CSS", "Python"];

  return (
    <ul className="flex-center">
      {languages.map((language) => (
        <li key={language}>
          <button
            className="btn-clear nav-link"
            style={language === selected ? { color: "rgb(187, 46, 31)" } : null}
            onClick={() => onUpdateLanguage(language)}
          >
            {language}
          </button>
        </li>
      ))}
    </ul>
  );
}

LangaugesNav.propTypes = {
  selected: PropTypes.string.isRequired,
  onUpdateLanguage: PropTypes.func.isRequired,
};

function ReposGrid({ repos }) {
  return (
    <ul className="grid space-around">
      {repos.map((repo, index) => {
        const { name, owner, html_url, stargazers_count, forks, open_issues } =
          repo;
        const { login, avatar_url } = owner;
        return (
          <li key={html_url}>
            <Card
              header={`#${index + 1}`}
              avatar={avatar_url}
              name={login}
              href={html_url}
            >
              <ul className="card-list">
                <li>
                  <Tooltip text="Github username">
                    <FontAwesomeIcon
                      icon={faUser}
                      size="1x"
                      color="rgb(255, 191, 116)"
                    />
                    <a href={`https://github.com/${login}`}>{login}</a>
                  </Tooltip>
                </li>
                <li>
                  <FontAwesomeIcon
                    icon={faStar}
                    color="rgb(255, 215, 0) "
                    size="1x"
                  />
                  {stargazers_count.toLocaleString()} stars
                </li>
                <li>
                  <FontAwesomeIcon
                    icon={faCodeBranch}
                    color="rgb(129, 195, 245) "
                    size="1x"
                  />
                  {forks.toLocaleString()} forks
                </li>
                <li>
                  <FontAwesomeIcon
                    icon={faExclamationTriangle}
                    color="rgb(241, 138, 147) "
                    size="1x"
                  />
                  {open_issues.toLocaleString()} open
                </li>
              </ul>
            </Card>
          </li>
        );
      })}
    </ul>
  );
}

ReposGrid.proptypes = {
  repos: PropTypes.array.isRequired,
};

export default class Popular extends React.Component {
  state = {
    selectedLanguage: "All",
    repos: {},
    error: null,
  };
  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage);
  }

  updateLanguage = (selectedLanguage) => {
    this.setState({
      selectedLanguage,
      error: null,
    });

    if (!this.state.repos[selectedLanguage]) {
      fetchPopularRepos(selectedLanguage)
        .then((data) => {
          this.setState(({ repos }) => ({
            repos: {
              ...repos,
              [selectedLanguage]: data,
            },
          }));
        })
        .catch((error) => {
          console.warn("Error fetching repos: ", error);

          this.setState({
            error: `There was an error fetching the repositories.`,
          });
        });
    }
  };
  isLoading = () => {
    const { selectedLanguage, repos, error } = this.state;

    return !repos[selectedLanguage] && error === null;
  };
  render() {
    const { selectedLanguage, repos, error } = this.state;

    return (
      <React.Fragment>
        <LangaugesNav
          selected={selectedLanguage}
          onUpdateLanguage={this.updateLanguage}
        />

        {this.isLoading() && <Loading text="Grabbing Repos" />}

        {error && <p className="center-text error">{error}</p>}

        {repos[selectedLanguage] && (
          <ReposGrid repos={repos[selectedLanguage]} />
        )}
      </React.Fragment>
    );
  }
}
