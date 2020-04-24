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
import { storage } from './storage';
import { Option } from './firebase';

function hashCode(s) {
  for(var i = 0, h = 0; i < s.length; i++)
      h = Math.imul(31, h) + s.charCodeAt(i) | 0;
  return h;
}

const weight = (option: Option) => {
  const userId = storage.userId();
  const optionId = option.id;
  const weight = hashCode(userId)/hashCode(optionId);
  return {
    ...option,
    weight,
  }
}

const deaths = 42014;
const numOptions = 3;

export default function Adventure(props) {
  const userId = storage.userId();
  const classes = useStyles();
  const [size, setSize] = useState(4);
  const { state: data, setCurrent, createOption } = useData();
  const fetchData = () => 
    setSize(size + 3);
  const state = () => {
    const current = data.nodes.find(n => n.id === data.current);
    if (!current) {
      return {
        current: null,
        canReply: false,
        isPrompt: false,
        children: [],
      };
    }
    const children = data.nodes
      .filter(n => current.children.includes(n.id))
      .map(n => weight(n))
      .sort((a, b) => b.weight - a.weight)
      .slice(0, numOptions) 
      ;
    const isPrompt = current.type === 'prompt';
    const canReply = (isPrompt || children.length === 0) && userId !== current.creatorId;
    return {
      current,
      canReply,
      isPrompt,
      children,
    };
  }

  const {
      current,
      canReply,
      isPrompt,
      children,
  } = state();

  console.log('state', {
    ...state(),
    userId,
  });

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
          hasMore={canReply || children.length > 0}
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
          {children.map((node, i) => {
              return (
                <AdventureOptionCard key={i} {...node} setCurrent={setCurrent} />
              )
          })}
          {canReply && (
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