import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { LoadingSpinner } from './LoadingSpinner';
import { useStyles } from './useStyles';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useData } from './firebase';
import { EndMessage } from './EndMessage';
import { AdventureOptionCard } from './AdventureOptionCard';
import { storage } from './storage';
import { Option } from './firebase';
import { useQueryParams, StringParam } from 'use-query-params'; 
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import GitHubIcon from '@material-ui/icons/GitHub';
import Drawer from '@material-ui/core/Drawer';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import FeedbackIcon from '@material-ui/icons/Feedback'; 
import OpenInNewIcon from '@material-ui/icons/OpenInNew'; 
import AppBar from '@material-ui/core/AppBar';
import App from './app';
import { Fab, useTheme } from '@material-ui/core';

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

const numOptions = 3;

export default function Adventure(props) {
  const theme = useTheme();
  const userId = storage.userId();
  const classes = useStyles();
  const [size, setSize] = useState(4);
  const [expanded, setExpanded] = useState(false);
  const [query, setQuery] = useQueryParams({
    to: StringParam,
    from: StringParam,
    focus: StringParam,
  });
  const { to, from, focus } = query;
  const { state: data, setCurrent: setCurrentState, createOption } = useData();
  const fetchData = () => 
    setSize(size + 3);
  const state = () => {
    const current = 
     to && data.nodes.find(n => n.id === to)
     || 
     data.nodes.find(n => n.id === data.current)
     || 
     data.root
    ;
    if (!current) {
      return {
        current: data.root,
        canReply: false,
        isPrompt: false,
        children: [],
        prev: [],
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
    const prev: Option[] = [];
    let it = current;
    const searchId = from || data.root.id;
    while (it && it.id !== searchId) {
      prev.push(it);
      it = data.nodes.find(n => n.id === it.parent);
    }
    return {
      current,
      canReply,
      isPrompt,
      children,
      prev: prev.reverse(),
    };
  }

  const {
      current,
      canReply,
      children,
      prev,
  } = state();

  useEffect(() => {
    if (current && current.id === data.root.id) {
      if (!to && !from && !focus) {
        setQuery({
          to: data.root.id,
          from: data.root.id,
          focus: data.root.id,
        });
      }
    }
  });

  const setCurrent = (targetId: string) => {
    const newQuery = { ...query };
    if (!from)
      newQuery.from = current.id;
    if (!to || to === current.id)
      newQuery.to = targetId;
    newQuery.focus = targetId;
    setQuery(newQuery);
    setCurrentState(targetId);
  }

  console.log('state', {
    ...state(),
    userId,
    to, from, focus,
    prev, scrollY,
  });

  const MyList = () => (
    <span role="presentation">
      <List className={classes.list}>
        <ListItem
          button
          component="a"
          aria-label="Contribute on GitHub"
          href="https://github.com/prmichaelsen/parm/tree/master/apps/f5"
          target="_blank"
          rel="noopener"
        >
          <ListItemIcon>
            <GitHubIcon />
          </ListItemIcon>
          <ListItemText primary="Contribute">
          </ListItemText>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <FeedbackIcon/>
          </ListItemIcon>
          <ListItemText primary="Feedback"/>
        </ListItem>
      </List>
      <Fab onClick={() => setExpanded(false)} className={classes.menuButton}>
        {theme.direction === 'ltr' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
      </Fab>
    </span>
  );

  return (
    <div className={classes.paper}>
      <Fab
        className={classes.menuButton}
        aria-label="open menu"
        onClick={() => setExpanded(true)}
      >
        <MenuIcon />
      </Fab>
      <Drawer anchor="right" open={expanded} onClose={() => setExpanded(false)}>
        <MyList/> 
      </Drawer> 
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
          {prev.map((node, i) => {
            return (
              <AdventureOptionCard key={'prev-' + i} {...node} prev />
            )
          })}
          <AdventureOptionCard key={'prompt'} current />
          {children.map((node, i) => {
              return (
                <AdventureOptionCard 
                  showBackButton={i === children.length - 1}
                  key={i}
                  {...node}
                  setCurrent={setCurrent} 
                />
              )
          })}
          {canReply && (
            <AdventureOptionCard 
              showBackButton={canReply}
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