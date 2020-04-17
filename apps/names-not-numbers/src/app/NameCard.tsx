import React, { useState } from 'react';
import { useStyles } from './useStyles';
import { Name } from './Name';
import { 
  Card, CardContent, Grid, Box, Link, Typography
} from '@material-ui/core';
import { LoadingSpinner } from './LoadingSpinner';
import { RenderTruthy, RenderFirst, RenderConditional } from './RenderTruthy';
import { isTruthy } from '@parm/util';
import LazyLoad from 'react-lazyload';
import moment from 'moment';
import { useOverflowState } from '@parm/react/use-overflow-state';

const formatRow = (i: number) => `#${i + 1}`;
const formatDate = (date: string) => 
  moment(date).format('MMM Do, YYYY'); 

export const NameContents = (row: any) => {
  const {
    childRef,
    parentRef,
  } = row;
  const classes = useStyles();
  return (
    <span>
      <Grid container spacing={1} ref={childRef}>
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
              <Typography variant="caption" component="div">
                {o.join(',')}
              </Typography>
            )}
          </RenderConditional>
          <RenderTruthy o={row.epitaph}>
            <Typography
              variant="body2"
              color="textSecondary"
              className={classes.quote}
              component="div"
            >
              {`"${row.epitaph}"`}
            </Typography>
          </RenderTruthy>
          <RenderTruthy o={row.obituary}>
            <Typography
              variant="body2"
              className={classes.text}
              component="div"
            >
              {row.obituary}
            </Typography>
          </RenderTruthy>
        </Grid>
      </Grid>
    </span>
  );
}

export const NameCard = (row: Name) => {
  const classes = useStyles();
  const [isSeeingMore, setIsSeeingMore] = useState(false);
  const { 
    childRef, parentRef, isOverflowing,
  } = useOverflowState([isSeeingMore]);
  return (
    <Card
      className={classes.card}
      style={{
        height: isSeeingMore ? 'unset' : '200px',
      }}
    >
      <CardContent>
        <LazyLoad
          className={classes.avatar}
          once
          placeholder={<LoadingSpinner />}
        >
          <NameContents
          {...{
              childRef,
              parentRef,
              ...row,
          }}/>
        </LazyLoad>
      </CardContent>
      <RenderTruthy o={!row.number && isOverflowing.bottom && !isSeeingMore}>
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
            <Link color="textSecondary" onClick={() => setIsSeeingMore(true)}>See more</Link>
          </Typography>
        </Box> 
      </RenderTruthy>
      <RenderTruthy o={isSeeingMore}>
        <Box
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
            <Link color="textSecondary" onClick={() => setIsSeeingMore(false)}>See less</Link>
          </Typography>
        </Box> 
      </RenderTruthy>
    </Card>
  );
}