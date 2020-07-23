import React, { useState, useCallback } from 'react';
import Grid from '@material-ui/core/Grid';
import { useImages } from './firebase';
 
export const ImgViewer = () => { 
  const { urls } = useImages();

  return (
    <Grid container>
      {urls.map(url => {
        return (
          <Grid item xs={4} >
            <a href={url}>
              <img
                src={url}
                style={{ width: '100%' }}
              /> 
            </a>
          </Grid>
        );
      })}
    </Grid>
  );
}