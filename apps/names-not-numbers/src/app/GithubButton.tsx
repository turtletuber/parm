import React from 'react';
import { useStyles } from './useStyles';
export const GithubButton = () => {
  const classes = useStyles();
  return (
    <span className={classes.githubButton}>
      <a
        className="github-button"
        href="https://github.com/prmichaelsen/parm/tree/master/apps/names-not-numbers"
        aria-label="Contribute on GitHub"
      >
        Contribute
      </a>
    </span>
  );
};