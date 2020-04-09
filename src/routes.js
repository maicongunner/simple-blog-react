import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import PostItem from './pages/Post';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route
        path="/post/:year/:month/:day?/:slug?"
        exatc
        component={PostItem}
      />
    </Switch>
  );
}
