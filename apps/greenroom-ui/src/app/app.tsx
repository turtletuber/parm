import React from 'react';

import { EventsRestClient }  from '@parm/greenroom-rest-client';
import { Route, Link } from 'react-router-dom';
import SignUp from './SignUp';
import Home from './Home';
import Lineup from './Lineup';
import { Container, CssBaseline } from '@material-ui/core';
import Copyright from './Copyright';
import { useEvents } from './useEvents';
import { environment } from '../environments/environment';

export const host = environment.production ?
  'https://greenroomfinder.app'
  : 'http://localhost:3333';

export const App = () => {
  const events = useEvents();

  if (events.state.err)
    return (
      <span> Failed to load </span>
    );

  if (!events.state.hasFetched || events.state.isLoading)
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
        <Home {...events.state.data} />
        <Lineup {...events.state.data} />
        <SignUp 
          eventId={events.state.data._id}
          refreshEvents={events.refreshData}
        />
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
