import React from 'react';
import { useStyles } from './useStyles';
export const FeedbackButton = () => {
  const classes = useStyles();
  return (
    <span 
      className={classes.rightShoulderButton}
      onClick={()=> window.open("https://docs.google.com/forms/d/e/1FAIpQLScNyQH8qODIN7895f7duAT3_NsQ54NfRiFzMr5yquhh5Aa_6A/viewform?usp=pp_url&entry.800675036=Names,+not+Numbers", "_blank")}
    >
      <a
        className="github-button"
        href=""
        aria-label="Contact & Feebdack"
        data-icon="octicon-issue-opened"
      >
        Contact & Feedback
      </a>
    </span>
  );
};