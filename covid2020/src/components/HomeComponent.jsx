import React, { Component } from 'react';
import OverallComponent from "./OverallComponent.jsx";
import SearchComponent from "./SearchComponent.jsx";
import StateComponent from "./StateComponent.jsx";

class HomeComponent extends Component {
    render() {
        return (
            <div>
                <OverallComponent></OverallComponent>
                <SearchComponent></SearchComponent>
                <StateComponent></StateComponent>
            </div>
        );
    }
}

export default HomeComponent;