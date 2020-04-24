import React from 'react';
import { useStyles } from './useStyles';
import Button from '@material-ui/core/Button';
export const FeedbackButton = () => {
  const classes = useStyles();
  return (
    <Button
      variant="contained"
      aria-label="Contact & Feedback"
      href="https://docs.google.com/forms/d/e/1FAIpQLScNyQH8qODIN7895f7duAT3_NsQ54NfRiFzMr5yquhh5Aa_6A/viewform?usp=pp_url&entry.800675036=fuck+fuck+fuck+fuck+fuck"
      target="_blank"
      className={classes.rightShoulderButton}
    >
      Contact & Feedback
    </Button>
  );
};