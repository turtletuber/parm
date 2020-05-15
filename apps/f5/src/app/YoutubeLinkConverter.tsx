import React, { useState } from 'react';
import { useStyles } from './useStyles';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { Typography, Link } from '@material-ui/core';

const validate = (string) => {
  return true;
};
export const YoutubeLinkConverter = () => {
  const classes = useStyles(); 
  const url = useForm();
  const time = useForm();
  const [result, setResult] = useState('');
  return (
    <span>
      <Typography>
        Add a timestamp to a Youtube video.
      </Typography>
      <Grid container>
        <Grid item xs={12}>
          <TextField
            style={{ width: '100%' }}
            id="url-input"
            label={'Enter a Youtube Url'}
            placeholder="e.g. https://youtu.be/-nm-Yj-ReDU"
            value={url.text}
            onChange={url.handleChange}
            onBlur={url.onBlur}
            error={url.hasBlurred && validate(url.text) !== true}
            helperText={url.hasBlurred && validate(url.text)}
          /> 
        </Grid>
        <Grid item xs={11}>
          <TextField
            style={{ width: '100%' }}
            id="time-input"
            label={'Enter a time'}
            placeholder="e.g. 3m44s"
            value={time.text}
            onChange={time.handleChange}
            onBlur={time.onBlur}
            error={time.hasBlurred && validate(time.text) !== true}
            helperText={time.hasBlurred && validate(time.text)}
          /> 
        </Grid>
        <Grid item xs={1}>
          <IconButton
            onClick={() => {
              if (validate(url.text) !== true) {
                return;
              }
              if (validate(time.text) !== true) {
                return;
              }
              setResult(
                `${url.text}?t=${time.text}`
              );
            }}
          >
            <ArrowForwardIcon />
          </IconButton> 
        </Grid>
          {(result !== '' &&
            <Grid item xs={12}>
              <Link href={result}>
                {result}
              </Link>
            </Grid>
          )}
      </Grid>
    </span>
  );
}

const useForm = () => {
  const [hasBlurred, setBlurred] = useState(false);
  const [text, setText] = useState('');
  const handleChange = (event) => {
    setText(event.target.value);
  };
  const onBlur = () => setBlurred(true);
  return {
    text, setText,
    hasBlurred, setBlurred,
    onBlur, handleChange
  }
}