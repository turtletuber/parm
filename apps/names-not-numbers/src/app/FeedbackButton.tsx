import React from 'react';
import { useStyles } from './useStyles';
export const FeedbackButton = () => {
  const classes = useStyles();
  return (
    <span 
      className={classes.rightShoulderButton}
      onClick={()=> window.open("https://forms.gle/KJxi1b7AE3ey48vD8", "_blank")}
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