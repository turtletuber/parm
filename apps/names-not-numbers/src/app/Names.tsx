import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import malePlaceholder from '../assets/placeholder_male.jpg';
import femalePlaceholder from '../assets/placeholder_female.jpg';
import { LoadingSpinner } from './LoadingSpinner';
import { useStyles } from './useStyles';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useData } from './firebase';
import { GithubButton } from './GithubButton';
import { FeedbackButton } from './FeedbackButton';
import { EndMessage } from './EndMessage';
import { Name } from './Name';
import { NameCard } from './NameCard';

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
        Victims of Covid-19 aren't just statistics. These are those who lost their lives to Covid-19.
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
              number: i,
            };
          return (
            <NameCard key={i} {...row}/>
          )
        })}
        </InfiniteScroll>
      </div>
    </div>
  );
}