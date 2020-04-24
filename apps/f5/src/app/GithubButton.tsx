import React from 'react';
import Button from '@material-ui/core/Button';
import GitHubIcon from '@material-ui/icons/GitHub'; 

export const GithubButton = () => {
  return (
    <Button
      variant="contained"
      aria-label="Contribute on GitHub"
      href="https://github.com/prmichaelsen/parm/tree/master/apps/f5"
      target="_blank"
      // startIcon={<GithubButton/>}
    >
      Contribute
    </Button>
  );
};