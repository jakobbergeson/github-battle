import * as React from "react";
import { battle } from "../utils/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCompass,
  faBriefcase,
  faUser,
  faCode,
  faUserFriends,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import Card from "./card";
import Proptypes from "prop-types";
import Loading from "./loading";
import Tooltip from "./tooltip";
import queryString from "query-string";
import { Link } from "react-router-dom";

function ProfileList({ profile, repos }) {
  return (
    <ul className="card-list">
      <li>
        <Tooltip text="Github username">
          <FontAwesomeIcon icon={faUser} color="rgb(239, 115, 115)" size="1x" />
          {profile.name}
        </Tooltip>
      </li>
      {profile.location && (
        <li>
          <Tooltip text="User's location">
            <FontAwesomeIcon
              icon={faCompass}
              color="rgb(144, 115, 115)"
              size="1x"
            />
            {profile.location}
          </Tooltip>
        </li>
      )}
      {profile.company && (
        <li>
          <Tooltip text="User's company">
            <FontAwesomeIcon icon={faBriefcase} color="#795548" size="1x" />
            {profile.company}
          </Tooltip>
        </li>
      )}
      <li>
        <FontAwesomeIcon icon={faUsers} color="rgb(129, 195, 245)" size="1x" />
        {profile.followers.toLocaleString()} followers
      </li>
      <li>
        <FontAwesomeIcon
          icon={faUserFriends}
          color="rgb(64, 195, 183)"
          size="1x"
        />
        {profile.following.toLocaleString()} following
      </li>
      <li>
        <FontAwesomeIcon icon={faCode} color="#8da5b0" size="1x" />
        {repos.toLocaleString()} repos
      </li>
    </ul>
  );
}

ProfileList.proptypes = {
  profile: Proptypes.object.isRequired,
  repos: Proptypes.number.isRequired,
};

export default class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      winner: null,
      loser: null,
      error: null,
      loading: true,
    };
  }
  componentDidMount() {
    const { playerOne, playerTwo } = queryString.parse(
      this.props.location.search
    );

    battle([playerOne, playerTwo])
      .then((players) => {
        this.setState({
          winner: players[0],
          loser: players[1],
          error: null,
          loading: false,
        });
      })
      .catch(({ message }) => {
        this.setState({
          error: message,
          loading: false,
        });
      });
  }

  render() {
    const { winner, loser, loading, error } = this.state;

    if (loading === true) {
      return <Loading text="Battling" />;
    }

    if (error === true) {
      return <p className="center-text error">{error}</p>;
    }
    return (
      <React.Fragment>
        <div className="grid space-around container-sm">
          <Card
            header={winner.score === loser.score ? "Tie!" : "Winner"}
            subheader={`Score: ${winner.score.toLocaleString()}`}
            avatar={winner.profile.avatar_url}
            name={winner.profile.login}
            href={winner.profile.html_url}
          >
            <ProfileList profile={winner.profile} repos={winner.repos} />
          </Card>
          <Card
            header={winner.score === loser.score ? "Tie!" : "Loser"}
            subheader={loser.profile.login}
            avatar={loser.profile.avatar_url}
            name={loser.profile.login}
            href={loser.profile.html_url}
          >
            <ProfileList profile={loser.profile} repos={loser.repos} />
          </Card>
        </div>
        <Link className="btn dark-btn btn-space" to="/battle">
          Reset
        </Link>
      </React.Fragment>
    );
  }
}
