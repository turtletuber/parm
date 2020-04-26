import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Check from '@material-ui/icons/Check'; 
import TextField from '@material-ui/core/TextField';
import { useStyles } from './useStyles';
import { 
  Card, CardContent, Grid, Typography, Icon
} from '@material-ui/core';
import { LoadingSpinner } from './LoadingSpinner';
import LazyLoad from 'react-lazyload';
import AddIcon from '@material-ui/icons/Add'; 
import Markdown from 'markdown-to-jsx'; 
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'; 
import { useHistory } from 'react-router-dom';
import { useQueryParams, StringParam } from 'use-query-params';

export const AdventureOptionCard = (row: any) => {
  const history = useHistory();
  const [{ from, to }] = useQueryParams({
    from: StringParam,
    to: StringParam,
  });
  const classes = useStyles();
  const loading = row == null ? <LoadingSpinner/> : false;
  const canSelect = !row.root && !row.prev;
  const [text, setText] = useState('');
  const handleChange = (event) => {
    setText(event.target.value);
  };
  return (
    <Card className={classes.card} >
      <CardContent>
        <LazyLoad
          className={classes.avatar}
          once
          placeholder={<LoadingSpinner />}
        >
          {row.current && (
            <Typography
              variant="body2"
              color="textSecondary"
              className={classes.quote}
              component="div"
            >
              What now?
            </Typography>
          ) ||
          row.new && (
            <Grid container spacing={1}>
              <Grid item xs={1}/>
              <Grid item xs={row.canReply ? 11 : 10}>
                <TextField
                  style={{width: '100%'}}
                  id="new-option-input"
                  label={row.type === 'prompt' ? 'Divinate' : 'Improvise'}
                  placeholder="Type your dialogue or actions here..."
                  multiline
                  value={text}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={1}>
                <IconButton
                  onClick={() => {
                    row.createOption({
                      text,
                      parent: row.parent,
                      type: row.type,
                    });
                    setText('');
                  }}
                >
                  <AddIcon/>
                </IconButton>
              </Grid>
            </Grid>
          ) ||
          loading || (
            <Grid container spacing={1}>
              <Grid item xs={1}>
                {canSelect && (
                  <IconButton
                    onClick={() => row.setCurrent(row.id)}
                    aria-label='choose'
                  >
                    <Check />
                  </IconButton>
                )}
              </Grid>
              <Grid item xs={10}>
                <Typography variant="body2" className={classes.text}>
                  <Markdown>
                    {row.text || ''}
                  </Markdown>
                </Typography>
              </Grid>
              <Grid item xs={1}>
                {row.showBackButton && (
                  <IconButton
                    onClick={() => history.goBack()}
                    disabled={from === to}
                  >
                    <ArrowUpwardIcon/>
                  </IconButton>
                )}
              </Grid>
            </Grid>
          )}
        </LazyLoad>
      </CardContent>
    </Card>
  );
}