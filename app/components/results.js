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
    const { playerOne, playerTwo } = this.props;

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
      return <p>LOADING</p>;
    }

    if (error === true) {
      return <p className="center-text error">{error}</p>;
    }

    return (
      <div className="grid space-around container-sm">
        <Card
          header={winner.score === loser.score ? "Tie!" : "Winner"}
          subheader={`Score: ${winner.score.toLocaleString()}`}
          avatar={winner.profile.avatar_url}
          name={winner.profile.login}
          href={winner.profile.html_url}
        >
          <ul className="card-list">
            <li>
              <FontAwesomeIcon
                icon={faUser}
                color="rgb(239, 115, 115)"
                size="1x"
              />
              {winner.profile.name}
            </li>
            {winner.profile.location && (
              <li>
                <FontAwesomeIcon
                  icon={faCompass}
                  color="rgb(144, 115, 115)"
                  size="1x"
                />
                {winner.profile.location}
              </li>
            )}
            {winner.profile.company && (
              <li>
                <FontAwesomeIcon icon={faBriefcase} color="#795548" size="1x" />
                {winner.profile.company}
              </li>
            )}
            <li>
              <FontAwesomeIcon
                icon={faUsers}
                color="rgb(129, 195, 245)"
                size="1x"
              />
              {winner.profile.followers.toLocaleString()} followers
            </li>
            <li>
              <FontAwesomeIcon
                icon={faUserFriends}
                color="rgb(64, 195, 183)"
                size="1x"
              />
              {winner.profile.following.toLocaleString()} following
            </li>
          </ul>
        </Card>
        <Card
          header={winner.score === loser.score ? "Tie!" : "Loser"}
          subheader={loser.profile.login}
          avatar={loser.profile.avatar_url}
          name={loser.profile.login}
          href={loser.profile.html_url}
        >
          <ul className="card-list">
            <li>
              <FontAwesomeIcon
                icon={faUser}
                color="rgb(239, 115, 115)"
                size="1x"
              />
              {loser.profile.name}
            </li>
            {loser.profile.location && (
              <li>
                <FontAwesomeIcon
                  icon={faCompass}
                  color="rgb(144, 115, 115)"
                  size="1x"
                />
                {loser.profile.location}
              </li>
            )}
            {loser.profile.company && (
              <li>
                <FontAwesomeIcon icon={faBriefcase} color="#795548" size="1x" />
                {loser.profile.company}
              </li>
            )}
            <li>
              <FontAwesomeIcon
                icon={faUsers}
                color="rgb(129, 195, 245)"
                size="1x"
              />
              {loser.profile.followers.toLocaleString()} followers
            </li>
            <li>
              <FontAwesomeIcon
                icon={faUserFriends}
                color="rgb(64, 195, 183)"
                size="1x"
              />
              {loser.profile.following.toLocaleString()} following
            </li>
          </ul>
        </Card>
      </div>
    );
  }
}
