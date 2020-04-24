import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { LoadingSpinner } from './LoadingSpinner';
import { useStyles } from './useStyles';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useData } from './firebase';
import { GithubButton } from './GithubButton';
import { FeedbackButton } from './FeedbackButton';
import { EndMessage } from './EndMessage';
import { AdventureOptionCard } from './AdventureOptionCard';

const deaths = 42014;
export default function Adventure(props) {
  const classes = useStyles();
  const [size, setSize] = useState(4);
  const { state: data, setCurrent, createOption } = useData();
  const fetchData = () => 
    setSize(size + 3);
  const current = data.nodes.find(n => n.id === data.current);
  const children = data.nodes.filter(n => current.children.includes(n.id));
  const isPrompt = current && current.type === 'prompt';
  const canAddOption = isPrompt || children.length === 0;
  const displayChildren = children.sort(() => Math.random() - 0.5).slice(0,3);

  return (
    <div className={classes.paper}>
      <span className={classes.rightShoulder}>
        <GithubButton />
        <FeedbackButton />
      </span>
      <Typography component="h1" variant="h5">
        <Typography component="span"> Oh fuck! </Typography>
        <Typography component="span" className={classes.italic}> Oh fuck! </Typography>
      </Typography>
      <div className={classes.cards}>
        <InfiniteScroll
          dataLength={size}
          next={fetchData}
          hasMore={size < deaths}
          loader={<LoadingSpinner/>}
          endMessage={<EndMessage/>}
        >
          <AdventureOptionCard key={'current'} {...data.root} root />
          {data.prev.map((node, i) => {
            return (
              <AdventureOptionCard key={'prev-' + i} {...node} prev />
            )
          })}
          <AdventureOptionCard key={'prompt'} current />
          {displayChildren.map((node, i) => {
              return (
                <AdventureOptionCard key={i} {...node} setCurrent={setCurrent} />
              )
          })}
          {current && canAddOption && (
            <AdventureOptionCard 
              key={'add'}
              new
              parent={current.id}
              createOption={createOption}
              type={current.type === 'prompt' ? 'action' : 'prompt'}
            />
          )}
        </InfiniteScroll>
      </div>
    </div>
  );
}