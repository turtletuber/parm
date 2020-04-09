import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { 
  Card, CardContent, Grid, Box, Link
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
        <br/>
        <br/>
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
                      <Typography variant="body2">
                        {row.name}
                      </Typography>
                      <Typography variant="caption">
                        {'July 15, 1950 - July 15, 2020'}
                      </Typography>
                      <br/>
                      <Typography variant="caption">
                        {'Town, Province, Country'}
                      </Typography>
                      <br/>
                      <Typography 
                        variant="body2"
                        color="textSecondary"
                        className={classes.quote}
                      >
                        {'"There but for the grace of God go I"'}
                      </Typography>
                      <Typography 
                        variant="body2"
                        className={classes.text}
                      >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                      </Typography>
                    </Grid>
                  </Grid>
                </LazyLoad>
              </CardContent>
              <Box
                className={classes.fadeOut}
                fontStyle="italic"
                alignContent="right"
              >
                <Typography
                  variant="caption"
                  color="textSecondary"
                  style={{ 
                    position: 'absolute',
                    bottom: '3%',
                    right: '3%',
                  }}
                >
                  <Link color="textSecondary">See more</Link>
                </Typography>
              </Box>
            </Card>
          );
        })}
        </InfiniteScroll>
      </div>
    </div>
  );
}