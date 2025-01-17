import React from "react";
import {HashRouter as Router, Route, Redirect, Switch} from "react-router-dom"; //BrowserRouter 는 실제 thml에 있는듯한 느낌을줌

import Header from "../Components/Header";
import Home from "../Routes/Home";
import Search from "../Routes/Search";
import TV from "../Routes/TV";
import Detail from "../Routes/Detail";
import Collection from "../Routes/Collections";

// eslint-disable-next-line import/no-anonymous-default-export
export default() => (
    <Router>
        <Header/>
        <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/tv" exact component={TV}/>
            <Route path="/TV/popular" exact render={() =>< h1 > Popular</h1>}/>
            <Route path="/search" component={Search}/>
            <Route path="/movie/:id" component={Detail}/>
            <Route path="/show/:id" component={Detail}/>
            <Route path="/collections/:id" component={Collection}/>
            <Route path="/seasions/:type/:id/:maxseasion" component={Collection}/>
            <Redirect from="*" to="/"/>
        </Switch>
    </Router>
)