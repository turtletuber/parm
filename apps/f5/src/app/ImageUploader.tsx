import React, { useState } from 'react';
import ImageUploader from 'react-images-upload';
import Grid from '@material-ui/core/Grid';
  
type onChange = (files: File[], pictures: string[]) => void
const initialState: File[] = [];
 
export const ImgUploader = () => { 
  const [state, setState] = useState(initialState);
  const onDrop: onChange = (pictures) => {
    setState([
      ...pictures
    ]);
  }

  return (
    <>
    <ImageUploader
      withIcon={true}
      buttonText='Choose images'
      onChange={onDrop}
      imgExtension={['.jpg', '.gif', '.png', '.gif']}
      maxFileSize={5242880}
    />
    <Grid container>
      {state.map(f => {
        return (
          <Grid item xs={4} >
            <img
              src={URL.createObjectURL(f)}
              style={{ width: '100%' }}
            />
          </Grid>
        );
      })}
    </Grid>
    </>
  );
}