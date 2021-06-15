import * as React from "react";
import Proptypes from "prop-types";
import { ThemeConsumer } from "../contexts/theme";

export default function Card({
  header,
  subheader,
  avatar,
  name,
  href,
  children,
}) {
  return (
    <ThemeConsumer>
      {({ theme }) => (
        <div className={`card bg-${theme}`}>
          <h4 className="header-lg center-text">{header}</h4>
          <img className="avatar" src={avatar} alt={`Avatar for ${name}`} />
          {subheader && <h4 className="center-text">{subheader}</h4>}
          <h2 className="center-text">
            <a className="link" href={href} target="_blank">
              {name}
            </a>
          </h2>
          {children}
        </div>
      )}
    </ThemeConsumer>
  );
}

Card.proptypes = {
  header: Proptypes.string.isRequired,
  subheader: Proptypes.string,
  avatar: Proptypes.string.isRequired,
  name: Proptypes.string.isRequired,
  href: Proptypes.string.isRequired,
};
