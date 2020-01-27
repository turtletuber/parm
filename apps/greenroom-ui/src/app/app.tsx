import React from 'react';

import { Route, Link } from 'react-router-dom';
import SignUp from './SignUp';
import Home, { HomeProps } from './Home';
import Lineup, { LineupProps } from './Lineup';
import { Container, CssBaseline } from '@material-ui/core';
import Copyright from './Copyright';

interface AppState {
  homeProps: HomeProps;
  lineupProps: LineupProps;
}

const state: AppState = {
  homeProps: {
    date: 'May 06 at 8 pm',
    place: 'Casey Moore\'s'
  },
  lineupProps: {
    slots: [
      { comics: [] },
      { comics: [] },
      { comics: [] },
    ],
  }
}

export const App = () => {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./app.scss file.
   */
  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Home {...state.homeProps} />
        <Lineup {...state.lineupProps} />
        <SignUp/>
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
