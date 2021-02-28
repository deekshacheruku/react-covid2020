import React, { Component } from 'react';
import OverallComponent from "./OverallComponent.jsx";
import SearchComponent from "./SearchComponent.jsx";
import StateComponent from "./StateComponent.jsx";
import Service from "./State_Wise_Service.js";
import {readString} from 'react-papaparse'
import axios from "axios"

class HomeComponent extends Component {
    constructor(){
        super()
        this.state = {
            isDataLoaded : false
        }
        axios.get("https://api.covid19india.org/csv/latest/state_wise.csv")
        .then(response => {
            const State_Wise_Result = readString(response.data)
            if(Service.State_Wise_Data.length == 0)
                Service.State_Wise_Data.push(State_Wise_Result.data) 
            this.setState({ isDataLoaded : true })
        })
        .catch(error =>{
            console.log(error)
        })
    }

    render() {
        return (
            <div>
                <OverallComponent></OverallComponent>
                {this.state.isDataLoaded && <SearchComponent></SearchComponent>}
                {this.state.isDataLoaded && <StateComponent></StateComponent> }
            </div>
        );
    }
}

export default HomeComponent;