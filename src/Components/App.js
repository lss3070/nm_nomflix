import React, {Component} from "react";
import Router from  "../Components/Router"
import GlobalStyles from "../Components/GlobalStyles"

class App extends Component {
    render() { //Only one Component
        return <>
        <Router/>
        <GlobalStyles></GlobalStyles>

        </>
    }
}

export default App;
