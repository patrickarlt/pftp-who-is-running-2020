import React from "react";
import styles from "./CanidateDetails.module.css";
import { ICandidate, IStateData } from "../../utils/requests";
import { classNames, If } from "react-extras";
import CloseButton from "../CloseButton/CloseButton";
import ReactGA from "react-ga";
export interface ICanidateDetailsProps {
  candidate: ICandidate;
  state: IStateData;
}

export const CanidateDetails: React.FunctionComponent<ICanidateDetailsProps> = function CanidateDetails({
  candidate,
  state,
}) {
  const tags = [];
  if (candidate.woman) {
    tags.push("Woman");
  }
  if (candidate.bipoc) {
    tags.push("BIPOC");
  }

  const ordinal = function (d: number) {
    if (d > 3 && d < 21) return "th";
    switch (d % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };
  return (
    <div className={styles.wrapper}>
      <CloseButton to="../../" />
      <div className={styles.titleSection}>
        <div
          className={classNames(
            styles.imageWrapper,
            styles[candidate.party.toLowerCase()]
          )}
        >
          <div
            style={{
              backgroundImage: `url("${candidate.image ||
                "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?f=y&d=mp&s=250"
                }")`,
            }}
            className={classNames(styles.image)}
          />
        </div>
        <h1 className={styles.title}>{candidate.name}</h1>
      </div>
      <div className={styles.detailsSection}>
        <h2 className={styles.subHeader}>
          {state.name}
          {candidate.district ? (
            <>
              {" "}
              - {candidate.district}
              <sup>{ordinal(parseInt(candidate.district))}</sup> District
            </>
          ) : (
              " - Senate"
            )}
        </h2>
        <p className={styles.infoLine}>
          <span
            className={classNames(
              styles.dot,
              styles[candidate.party.toLowerCase()]
            )}
          ></span>
          {candidate.party}
        </p>
        <p className={styles.infoLine}>
          {candidate.incumbent ? "Incumbent" : "Challenger"}
        </p>
        <If condition={tags.length > 0}>
          <p className={styles.infoLine}>{tags.join(", ")}</p>
        </If>

        {candidate?.campaignUrl && (
          <p className={styles.infoLine}>
            <ReactGA.OutboundLink
              eventLabel="Candidate Website"
              to={candidate.campaignUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              Campaign Website
            </ReactGA.OutboundLink>
          </p>
        )}

        {candidate?.facebookUrl && (
          <p className={styles.infoLine}>
            <ReactGA.OutboundLink
              eventLabel="Candidate Facebook"
              to={candidate.facebookUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              Facebook Page
            </ReactGA.OutboundLink>
          </p>
        )}

        {candidate?.twitterHandle && (
          <p className={styles.infoLine}>
            <ReactGA.OutboundLink
              eventLabel="Candidate Twitter"
              to={`https://twitter.com/${candidate.twitterHandle.replace(
                "@",
                ""
              )}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              Tweet {candidate?.twitterHandle}
            </ReactGA.OutboundLink>
          </p>
        )}

        {candidate?.instagramHandle && (
          <p className={styles.infoLine}>
            <ReactGA.OutboundLink
              eventLabel="Candidate Instagram"
              to={`https://instagram.com/${candidate.instagramHandle.replace(
                "@",
                ""
              )}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              Instagram {candidate?.instagramHandle}
            </ReactGA.OutboundLink>

          </p>
        )}
      </div>
    </div>
  );
};

export default CanidateDetails;
