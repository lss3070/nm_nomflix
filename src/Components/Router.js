import React from "react";
import {HashRouter as Router, Route, Redirect, Switch} from "react-router-dom"; //BrowserRouter 는 실제 thml에 있는듯한 느낌을줌

import Header from "../Components/Header";
import Home from "../Routes/Home";
import Search from "../Routes/Search";
import TV from "../Routes/TV";

// eslint-disable-next-line import/no-anonymous-default-export
export default() => (
    <Router>
        <Header/>
        <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/TV" exact component={TV}/>
            <Route path="/TV/popular" exact render={() =>< h1 > Popular</h1>}/>
            <Route path="/Search" exact component={Search}/>
            <Redirect from="*" to="/"/>
        </Switch>
    </Router>
)