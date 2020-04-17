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
import { Name } from './Name';
import { RenderTruthy, RenderConditional, RenderFirst } from './RenderTruthy';
import { not, isTruthy } from '@parm/util';
import { useOverflowState } from '@parm/react/use-overflow-state';
import moment from 'moment';

const deaths = 42014;
const formatRow = (i: number) => `#${i + 1}`;
const formatDate = (date: string) => 
  moment(date).format('MMM Do, YYYY');

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
          const row = (i < data.length) ?
            Name(data[i])
            : {
              ...Name({}),
              name: 'Unnamed',
              image: Math.random() <= 0.5 ?
                femalePlaceholder
                : malePlaceholder,
              row: i,
            };
          if (i < data.length)
            console.log(row);
          return (
            <Card key={i} className={classes.card}>
              <CardContent >
                <LazyLoad
                  className={classes.avatar}
                  once
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
                        <RenderTruthy o={row.number}>
                          <Typography
                            variant="caption"
                            color="textSecondary"
                          >
                            {formatRow(row.number)}
                          </Typography> 
                        </RenderTruthy>
                      </Box>
                      <Typography variant="body2">
                        {row.name}
                      </Typography>
                      <RenderFirst>
                        {(row.dateBorn && row.dateDeceased) && (
                          <Typography variant="caption">
                            {formatDate(row.dateBorn)} to {formatDate(row.dateDeceased)}
                          </Typography> 
                        )}
                        {row.dateBorn && (
                        <Typography variant="caption">
                          Born {formatDate(row.dateBorn)}
                        </Typography>
                        )}
                        {row.dateDeceased && (
                        <Typography variant="caption">
                          Deceased {formatDate(row.dateDeceased)}
                         </Typography>
                        )}
                      </RenderFirst>
                      <RenderConditional
                        o={[
                          row.town,
                          row.province,
                          row.country,
                        ].filter(isTruthy)}
                        test={o => o.length > 0}
                      > 
                      {o => (
                        <Typography variant="caption">
                          {o.join(',')}
                        </Typography>
                      )} 
                      </RenderConditional>
                      <br/>
                      <RenderTruthy o={row.epitaph}>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          className={classes.quote}
                        >
                          {`"${row.epitaph}"`}
                        </Typography>
                      </RenderTruthy>
                      <RenderTruthy o={row.obituary}>
                      <Typography 
                        variant="body2"
                        className={classes.text}
                      >
                        {row.obituary}
                      </Typography>
                      </RenderTruthy>
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