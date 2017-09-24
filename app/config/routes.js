import React from "react";
import { Route, IndexRoute, Router, browserHistory } from "react-router";

import Main from "../components/Main";



const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={Main}>
    {/*don't know if there will be another link from main page<Route path="favorites" component={Favorites} />*/}
    <IndexRoute component={Main} />
    </Route>
  </Router>
);

export default routes;