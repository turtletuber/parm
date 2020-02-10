import React from 'react';

import { EventsRestClient }  from '@parm/greenroom-rest-client';
import { Route, Link } from 'react-router-dom';
import SignUp from './SignUp';
import Home from './Home';
import Lineup from './Lineup';
import { Container, CssBaseline } from '@material-ui/core';
import Copyright from './Copyright';
import { useEvents } from './useEvents';

export const App = () => {
  const eventState = useEvents();

  if (eventState.err)
    return (
      <span> Failed to load </span>
    );

  if (!eventState.hasFetched || eventState.isLoading)
    return (
      <span> Loading... </span>
    );
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./app.scss file.
   */
  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Home {...eventState.data} />
        <Lineup {...eventState.data} />
        <SignUp eventId={eventState.data._id}/>
        <Copyright/>
      </Container>
      {/* <div role="navigation">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/sign-up">Sign Up</Link>
          </li>
        </ul>
      </div>
      <Route
        path="/"
        exact
        render={() => <Home {...state.homeProps}/>}
      />
      <Route
        path="/sign-up"
        exact
        render={() => <SignUp/>}
      /> */}
    </>
  );
};

export default App;
