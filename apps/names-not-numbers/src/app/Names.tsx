import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { 
  Card, CardHeader, CardContent, Grid
} from '@material-ui/core';
import malePlaceholder from '../assets/placeholder_male.jpg';
import femalePlaceholder from '../assets/placeholder_female.jpg';
import LazyLoad from 'react-lazyload';
import { LoadingSpinner } from './LoadingSpinner';
import { useStyles } from './useStyles';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function Names(props) {
  const classes = useStyles();
  const [size, setSize] = useState(300);
  const fetchData = () => 
    setSize(size + 50);

  return (
    <div className={classes.paper}>
      <Typography component="h1" variant="h5">
        Names, not Numbers
      </Typography>
      <Typography component="div" variant="caption">
        Victims of Covid-19 aren't just statistics. These names represent the number of lives lost from Covid-19 worldwide.
      </Typography>
      <div className={classes.cards}>
        <InfiniteScroll
          dataLength={size}
          next={fetchData}
          hasMore={true}
          loader={<LoadingSpinner/>}
        >

        {[...Array(size).keys()].map((person, i) => {
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
                        src={
                          Math.random() <= 0.5 ?
                            femalePlaceholder
                            : malePlaceholder
                        }
                      />
                    </Grid>
                    <Grid item xs={9}>
                      <Typography variant="caption">
                        Unnamed
                    </Typography>
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