import React, { useState, useCallback } from 'react';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import Check from '@material-ui/icons/Check'; 
import TextField from '@material-ui/core/TextField';
import { useStyles } from './useStyles';
import { 
  Card, CardContent, Grid, Typography, CardActions, CardHeader,
} from '@material-ui/core';
import { LoadingSpinner } from './LoadingSpinner';
import LazyLoad from 'react-lazyload';
import AddIcon from '@material-ui/icons/Add'; 
import Markdown from 'markdown-to-jsx'; 
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'; 
import LinkIcon from '@material-ui/icons/Link'; 
import FavoriteIcon from '@material-ui/icons/Favorite'; 
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'; 
import ShareIcon from '@material-ui/icons/Share'; 
import MoreVertIcon from '@material-ui/icons/MoreVert'; 
import { useHistory, Link } from 'react-router-dom';
import { useQueryParams, StringParam } from 'use-query-params';
import ReactHoverObserver from 'react-hover-observer';
import Grow from '@material-ui/core/Grow';
import AnimateHeight from 'react-animate-height';
import { useMeta, useNodeView } from './firebase';
import { storage } from './storage';
import { validate } from './validate';

import AceEditor from 'react-ace';
 
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-typescript';
import 'ace-builds/src-noconflict/theme-xcode';
import 'ace-builds/src-noconflict/theme-twilight';
import { useThemePrefs } from './hooks';

export const AdventureOptionCard = (row: any) => {
  const { isDark } = useThemePrefs();
  const aceTheme = isDark ? 'twilight' : 'xcode';
  const userId = storage.userId();
  const history = useHistory();
  const { views } = useNodeView(row.id);
  const { meta, setMeta } = useMeta(row.id);
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
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const liked = meta.likes.includes(userId);
  const setLikes = useCallback(() => {
    if (liked) {
      meta.likes = meta.likes.filter(u => u !== userId);
    } else {
      meta.likes = [...meta.likes, userId];
    }
    setMeta(meta);
  }, [row.id, liked]);

  const visited = meta.visited.includes(userId);
  const setCurrent = useCallback(() => {
    if (!visited) {
      meta.visited = [...meta.visited, userId];
      setMeta(meta);
    } 
    row.setCurrent(row.id);
  }, [row.id, visited]);

  const [hasBlurred, setBlurred] = useState(false);
  const onBlur = () => setBlurred(true);
  const url = `/?from=${from}&to=${row.id}&focus=${row.id}`;
  return (
    <Card className={classes.card} >
        <LazyLoad
          className={classes.avatar}
          once
          placeholder={<LoadingSpinner />}
        >
        <ReactHoverObserver
          hoverOffDelayInMs={100}
        >
          {({ isHovering }) => (
            <>

              {row.current && (
                <CardContent>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    className={classes.quote}
                    component="div"
                  >
                    What now?
                  </Typography>
                </CardContent>
              ) 

              || row.new && (
                <>
                  <CardContent>
                    <Grid container spacing={1}>
                      <Grid item xs={12}>
                        <TextField
                          style={{ width: '100%' }}
                          id="new-option-input"
                          label={row.type === 'prompt' ? 'Divinate' : 'Improvise'}
                          placeholder="Type your dialogue or actions here..."
                          multiline
                          value={text}
                          onChange={handleChange}
                          onBlur={onBlur}
                          error={hasBlurred && validate(text) !== true}
                          helperText={hasBlurred && validate(text)}
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                  <AnimateHeight height={!isHovering ? 0 : 'auto'} duration={300} >
                    <Grow in={isHovering} timeout={300}>
                      <CardActions disableSpacing>
                        <Grid container direction="row-reverse">
                          <Grid item>
                            <IconButton
                              onClick={() => {
                                if (validate(text) === true) {
                                  row.createOption({
                                    text: text.trim(),
                                    parent: row.parent,
                                    type: row.type,
                                  });
                                }
                              }}
                            >
                              <AddIcon />
                            </IconButton>
                          </Grid>

                        </Grid>
                      </CardActions>
                    </Grow>
                  </AnimateHeight>
                </> 
                )

                || loading || (
                  <>
                <AnimateHeight height={!isHovering ? 0 : 'auto'} duration={300} >
                  <Grow in={isHovering} timeout={300}>
                  <CardActions disableSpacing>
                    <Grid container direction="row-reverse">
                        {/* <Grid item>
                          <IconButton aria-label="share" className={classes.action}>
                            <ShareIcon />
                          </IconButton>
                        </Grid> */}
                        <Grid item>
                          <IconButton 
                            aria-label={liked ? 'unlike' : 'like'}
                            onClick={setLikes}
                            className={clsx({
                              [classes.active]: liked,
                            })}
                          >
                            {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                          </IconButton>
                        </Grid>
                        <Grid item>
                          <Link to={url}>
                            <IconButton>
                              <LinkIcon />
                            </IconButton>
                          </Link>
                        </Grid>
                        {/* <Grid item>
                        <IconButton aria-label="settings" className={classes.action}>
                          <MoreVertIcon />
                        </IconButton>
                      </Grid> */}
                    </Grid>
                  </CardActions>
                  </Grow>
                  </AnimateHeight>
                  <CardContent >
                    {/* <Typography variant="body2" className={classes.text}> */}
                      <Markdown options={{
                        forceBlock: false,
                        overrides: {
                          blockquote: ({children, ...props}) => (
                            <Typography
                              {...props}
                              variant="body2"
                              color="textSecondary"
                              className={classes.quote}
                              component="div"
                            >{children}</Typography>
                          ),
                          code: ({children, className: lang, ...props}) => {
                            if (!lang) {
                              return (
                                <code key={props.key}>{children}</code>
                              )
                            }
                            return (
                              <AceEditor
                                maxLines={Infinity}
                                mode={lang ? lang.split('-')[1] : ''}
                                theme={aceTheme}
                                value={children}
                                readOnly
                              />
                            );
                          }, 
                        },
                      }}>
                      {`
# Stuff you should probably know before going for a code interview
This is a quick and dirty list of all the stuff you _should_ know before you walk into an interview for a big name tech company. This will not cover any _software_ topics, only _computer science_ topics. This will help you in the coding portion of interviews, _not_ in design portions.

> &#8505; - Use the language you are most familiar with for any of this content. Don't use a language you don't use everyday, or it will show. _"...how do you truncate an array again?"_ Remember that a lot of interviewers expect you to code on a whiteboard. There will be no autocomplete or google to help you if you forget the name of a function. 

At the very least, you should have written code to do these things _at least once_. Ideally, you could do each without a reference. 

## you should know:
### what a hashtable is, and: 

* why you would use one over an array
* how they are implemented at a super high-level

> &#8505; - hashtables are basically the answer to _every_ code question, so you better know this. It should be your first  thought when you start a question. _"I wonder if I could use a hashtable for this?"_ If not, good, no harm done. But if the problem _could have been solved with a hashtable_, and you _didn't think of that_, the interviewer will notice.

### all the basic sort algorithms - because they are considered trivial
#### you must be able to implement 

* insertion sort
* selection sort
* merge sort 
* quick sort
* quick select


#### you might want to know 
For quick sort and merge sort: 

* how do they compare?
* what is each's space-time complexity?
* is either in-place?

You might also want to know how to implement:

* bubble sort
* gnome sort
* sleep sort (kidding, but read about it if you're interested)

### you must know all the basic graph traversal algorithms - because they are useful *
* breadth first search 
* depth first search
  * pre-order
  * in-order
    * post-order
* bellman-ford
* djisktra
* binary search tree - or at the very least, how it applies to searching
* how to solve the single source shortest path problem

\\* consider studying the linked list section before attempting this section if you have extra time.

### recursion
Recursion is useful, and you might surprise your interviewer if you get stuck on a recursion problem.

### priority queue
The priority queue is an awesome data structure. At the very least, know this exists. It depends on a data structure called a heap, but if you don't want to learn that, then just assume that it's some black magic that is yours to abuse to your heart's content.

### time complexity
For all of the above, you should be able to reason about time complexity.

> &#8505; - The rest I would not consider "need to know", because they are usually implemented for you. But basic linear/logn searches and graph traversal are a must. If not simply because they're like the abcs of computing, and you don't want to look illiterate.

## what you _might_ want to know
### heaps
what is a heap and why is it useful?

how do you:

* add an element
* extract an element

you should practice implementing these functions that heaps depend on:

* parent
* left child
* right child
* shift down
* shift up

## bsts
Ideally you've implemented a binary search tree at least once. Even better if you've implemented balanced ones. At any rate, it might help to know what:

* a complete tree is
* a balanced tree is
* a full tree is

Read about the bst, and maybe be able to speak to some degree about how you can define its height, number of levels, or number of nodes in terms of powers of two or logs of two. Are these properties useful at all? How?

What data structure does a bst with only left children and no right children look like?

# extraneous 200 level concepts
If you went to uni, then these concepts are generally considered in the 200 level in the states. So, you should probably know them if you went to uni for computer science.

### generics, or parameterized types 

> &#8505; - This is first on this list for a reason. You will definitely surprise your interviewer if you don't how to use generics. The caveat is that if you mostly work in a language like python or javascript, you would have never encountered this concept. But if you say you know Java and you can't use generics then this will raise alarms to your interviewer.

you should understand:

* what generics are
* why they are useful or how they allow us to re-use code

#### here's a quick overview

\`\`\`java 
// creating an array of ints without generics 
int[] myArray = new int[] {};

// creating lists for ints and strings, respectively
IntList myIntList = new IntList();
StringList myStringList = new StringList();

// creating a list for each using generics
List<int> myGenericIntList = new ArrayList<int>();
List<string> myGenericStringList = new ArrayList<string>(); 
\`\`\`

Someone wrote this \`List\` class without knowing what type of data you were going to put into it. That's because it doesn't matter. The operations for adding an \`int\` to a list are the exact same as they are for adding a \`string\` to a list. That means they can defer assigning types to its contents until the exact moment you need to use it. Instead of writing one class for each data type we want to contain, we only need _one generic class_. This becomes insanely powerful as the number of types you want to parameterize increases. For instance, consider Java's \`Dictionary<TKey, TValue>\` class, which means you now have the square of the number of types in Java combinations that you don't have to write classes for. You can just use the one generic class, instead.

## pointers & references
What are pointers and references? You should read about them and obtain a rudimentary understanding. They are very important, but usually you don't notice they exist unless you're programming at a very low-level language. 
> &#8505; - In the context of programming languages, low-level means you're closer to writing 1's and 0's, whereas high-level means you're closer to writing English.

## linked lists
for what it's worth, if you're new to this, linked lists _are hard_. They seem super simple when you draw pictures of them, until you're doing stuff like:

\`\`\`typescript 
let prev = null;
let reverse = null;
let it = head;
while (it !== null) {
  prev = it;
  it = it.next;
  let temp = { 
    val: prev.val, 
    next: reverse,
  };
  reverse = temp;
}
return reverse;
\`\`\`
What does this function do? Despite appearing to simply set a bunch of variables to references of themselves in a random order, this function will actually reverse a linked-list. Doesn't seem so simple.

No interviewer will ever directly ask you a question about a linked list, and you could probably derive any of these during any interview, but if you have extra time to waste learning this, it will be good for you. Maybe even learn this first, because it might help you with the graph stuff.

### you should know how to:

* implement a linked list
* iterate over the linked list
* remove a node
* insert a node in the front of the list
* insert a node at the end of the list
* insert a node arbitrarily
* insert a node in a sorted list
* remove a duplicates
* insert a node in a sorted list, disallowing duplicates
* reverse the list
* turn it into a doubly-linked list

### you should understand these concepts as linked lists apply to:

* stacks
* the pop operation
* the push operation
* why a linked list would ever be used as opposed to an array? ie, what is the most obvious advantage?
* time complexities for interacting with a linked list

## graphs
know some basic terminology about graphs (if you did the graph traversal section, you should have encountered these) and their implications:

* directed or undirected
* cyclic or acyclic
* weighted or unweighted
* non-negative graphs

know common ways to represent graphs:

* edge list
* adjacency list
* adjacency matrix
* node objects

# extraneous 300 level concepts
have more time? read about:

* closures
* scopes
* function call-stack
* weakly typed vs strongly typed languages
* implicit typing and type inferencing

# further resources
I can't recommend enough these resources:

## visualgo

> [visualgo.net](https://visualgo.net/en) 

this is quite possibly the _best_ resource _ever_ to exist on learning any data structures or algorithms concepts. 

## leetcode

> [leetcode](https://leetcode.com/) 

this is an excellent pool of practice questions. Practice solving these problems on a white board, talking aloud to yourself as you solve them. Ideally, you should be able to solve any easy problem in 15 minutes and any medium/hard problem in 45 minutes. Don't beat yourself up over the med/hard ones though, some of them are _really hard_.

I also recommend subscribing for premium leet code (at the time of writing, $30/mo) for at least one month in order to take the interview track for the specific company you're applying for. This is a lot better than messing around randomly solving leetcode problems hoping that it's useful. 

Remember, you should not be focusing on learning how to solve any one specific problem on this site. Instead, _focus on honing your problem-solving abilities_.

* What is your process? 
* Do you mentally test your code? (remember, since you are coding on a whiteboard, you can't just guess and check. You need to make your own tests cases and run each test case manually in your head).
* Do you come up with a solution in plain English before coding? Do you discuss, out loud, all of the different possible approaches for solving this problem? 
* Do you know the time complexities and the implications of the data structures and algorithms you're using?

# parting words

My final tips for your interview are this:

* slow down, breath. Are you rambling? Stop and breath.
* think everything out loud, so the interviewer knows what's going on in your head. They want to help you, but they can't if they don't know what you're thinking.
* don't be afraid to be quiet and think, either.
* ask _tons_ of clarifying questions.
* don't be afraid to discuss brute force solutions.

Cheers, and good luck.
                      `}
                      </Markdown>
                    {/* </Typography> */}
                  </CardContent>
                </>
                )}

              {!row.current && !row.new && (
                <AnimateHeight height={!isHovering ? 0 : 'auto'} duration={300} >
                  <Grow in={isHovering} timeout={300}>
                    <CardActions disableSpacing>
                      <Grid container direction='row-reverse'>
                      {canSelect && (
                        <Grid item>
                          <IconButton
                            onClick={setCurrent}
                            aria-label='choose'
                          >
                            <Check />
                          </IconButton>
                        </Grid>
                      )}
                      {row.showBackButton && (
                        <Grid item>
                          <IconButton
                            onClick={() => history.goBack()}
                            disabled={from === to}
                          >
                            <ArrowUpwardIcon />
                          </IconButton>
                        </Grid>
                      )}
                      </Grid>
                    </CardActions>
                  </Grow>
                </AnimateHeight>
              )}
            </>
          )}
        </ReactHoverObserver>
      </LazyLoad>
    </Card>
  );
}