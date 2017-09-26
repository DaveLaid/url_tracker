import React from "react";
import { Route, IndexRoute, Router, browserHistory } from "react-router";

import Main from "../components/Main";
import Home from "../components/Home";
import Signinup from "../components/Signinup";


/*
const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={Main}>
    	<IndexRoute component={Home} />
    </Route>
  </Router>
);
*/

const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={Main}>
    	<Route path="home" component={Home} />
    	<IndexRoute component={Signinup} />
    </Route>
  </Router>
);

export default routes;