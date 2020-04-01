import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { 
  Card, CardContent, Grid, Box
} from '@material-ui/core';
import malePlaceholder from '../assets/placeholder_male.jpg';
import femalePlaceholder from '../assets/placeholder_female.jpg';
import LazyLoad from 'react-lazyload';
import { LoadingSpinner } from './LoadingSpinner';
import { useStyles } from './useStyles';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useData } from './firebase';
import { GithubButton } from './GithubButton';
import { FeedbackButton } from './FeedbackButton';
import { EndMessage } from './EndMessage';

const deaths = 42014;

export default function Names(props) {
  const classes = useStyles();
  const [size, setSize] = useState(300);
  const { state: data } = useData();
  const fetchData = () => 
    setSize(size + 50);

  return (
    <div className={classes.paper}>
      <span className={classes.rightShoulder}>
        <GithubButton />
        <FeedbackButton />
      </span>
      <Typography component="h1" variant="h5">
        Names, not Numbers
      </Typography>
      <Typography component="div" variant="caption" className={classes.text}>
        Victims of Covid-19 aren't just statistics. These names represent the number of lives lost from Covid-19 worldwide.
      </Typography>
      <Typography component="div" variant="caption" className={classes.text}>
        If you have lost a loved one, you can <a target='_blank' href='https://forms.gle/9N6S9DEfGbhiyuX78'>add their name by filling out this form. ⧉</a>
      </Typography>
      <div className={classes.cards}>
        <InfiniteScroll
          dataLength={size}
          next={fetchData}
          hasMore={size < deaths}
          loader={<LoadingSpinner/>}
          endMessage={<EndMessage/>}
        >

        {[...Array(size).keys()].map((person, i) => {
          const row = (i < data.length) ? {
            name: data[i].name,
            image: data[i].image || data[i].gender === 'Female' ? 
              femalePlaceholder
              : malePlaceholder,
          } : {
            name: 'Unnamed',
            image: Math.random() <= 0.5 ?
              femalePlaceholder
              : malePlaceholder,
            number: `#${i + 1}`,
          };
          return (
            <Card key={i} className={classes.card}>
              <CardContent >
                <LazyLoad
                  className={classes.avatar}
                  once
                  // unmountIfInvisible
                  placeholder={<LoadingSpinner />}
                >
                  <Grid container spacing={1}>
                    <Grid item xs={2}>
                      <img
                        className={classes.img}
                        src={row.image}
                      />
                    </Grid>
                    <Grid item xs={10}>
                      <Typography variant="caption">
                        {row.name}
                      </Typography>
                      <Box 
                        fontStyle="italic"
                        alignContent="right"
                        style={{ float: 'right' }}
                      >
                        <Typography
                          variant="caption"
                          color="textSecondary"
                        >
                          {row.number || ''}
                        </Typography> 
                      </Box>
                    </Grid>
                  </Grid>
                </LazyLoad>
              </CardContent>
            </Card>
          );
        })}
        </InfiniteScroll>
      </div>
    </div>
  );
}