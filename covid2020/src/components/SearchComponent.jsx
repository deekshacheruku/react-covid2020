import React, { Component } from 'react';
import {readString} from 'react-papaparse'
import ReactDOM from 'react-dom'
import axios from "axios"
import Service from "./State_Wise_Service.js";
import "./SearchComponent.css"

class SearchComponent extends Component {
    constructor(){
        super()
        this.StateIndex = ["andaman and nicobar islands", "andhra pradesh", "arunachal pradesh", "assam", "bihar", 
            "chandigarh","chhattisgarh", "dadra and nagar haveli", "daman and diu" , "delhi" , "goa", "gujarat", 
            "haryana","himachal pradesh", "jammu and kashmir", "jharkhand", "karnataka", "kerala", "lakshadweep", 
            "madhya pradesh", "maharashtra", "manipur", "meghalaya", "mizoram", "nagaland", "orrisa", "puducherry",
            "punjab", "rajasthan","sikkim", "tamil nadu", "telangana", "tripura", "uttar pradesh", "uttarakhand", "west bengal"
        ]
        this.State_Wise = [],
        this.state = {
            UserInput : "",
            PreviousConfirmedCases : [],
            PreviousRecoveredCases : [],
            PreviousDeceasedCases : [],
            CurrentConfirmedCases : [],
            CurrentRecoveredCases : [],
            CurrentDeceasedCases : []
        }
        this.SearchInput = ""
        axios.get("https://api.covid19india.org/csv/latest/state_wise_daily.csv")
        .then(response => {
            const State_Wise_Daily = readString(response.data)
            const State_Wise_Daily_Length = State_Wise_Daily.data.length
            this.setState( { PreviousConfirmedCases : State_Wise_Daily.data[State_Wise_Daily_Length - 6]})
            this.setState( { PreviousRecoveredCases : State_Wise_Daily.data[State_Wise_Daily_Length - 5]})
            this.setState( { PreviousDeceasedCases : State_Wise_Daily.data[State_Wise_Daily_Length - 4]})
            this.setState( { CurrentConfirmedCases : State_Wise_Daily.data[State_Wise_Daily_Length - 3]})
            this.setState( { CurrentRecoveredCases : State_Wise_Daily.data[State_Wise_Daily_Length - 2]})
            this.setState( { CurrentDeceasedCases : State_Wise_Daily.data[State_Wise_Daily_Length - 1]})
        })
        .catch(error =>{
            console.log(error)
        })
    }

    componentDidMount(){
        this.State_Wise = Service.State_Wise_Data[0]
    }

    RenderStateOutput(){
        let State_Wise_Daily_Index = -1
        this.StateIndex.filter((item,index) => {
            if (item == this.SearchInput){
                State_Wise_Daily_Index = index + 4
                let increased_confirm_cases = this.state.CurrentConfirmedCases[State_Wise_Daily_Index] - this.state.PreviousConfirmedCases[State_Wise_Daily_Index]
                let increased_recover_cases = this.state.CurrentRecoveredCases[State_Wise_Daily_Index] - this.state.PreviousRecoveredCases[State_Wise_Daily_Index] 
                let increased_deceased_cases = this.state.CurrentDeceasedCases[State_Wise_Daily_Index] - this.state.PreviousDeceasedCases[State_Wise_Daily_Index]
                ReactDOM.render(<p>+ {increased_confirm_cases}</p>,document.getElementById("confirmedincreasedcases"))
                ReactDOM.render(<p>+ {increased_recover_cases}</p>,document.getElementById("recoveredincreasedcases"))
                ReactDOM.render(<p>+ {increased_deceased_cases}</p>,document.getElementById("deceasedincreasedcases"))
            }
        })
        this.State_Wise.map(item => {
            if(item[0].toLowerCase() == this.SearchInput.toLowerCase()){
                ReactDOM.render(<p className = "totalcases">{Number(item[1]).toLocaleString("en-IN")}</p>,document.getElementById("confirmednoofcases"))
                ReactDOM.render(<p className = "totalcases">{Number(item[2]).toLocaleString("en-IN")}</p>,document.getElementById("recoverednoofcases"))
                ReactDOM.render(<p className = "totalcases">{Number(item[3]).toLocaleString("en-IN")}</p>,document.getElementById("deceasednoofcases"))
                ReactDOM.render(<p className = "totalcases">{Number(item[4]).toLocaleString("en-IN")}</p>,document.getElementById("activenoofcases"))
            }
        })
    }

    OnChangeSearchHandler = (event) => {
        this.setState({ UserInput : event.target.value })
        this.SearchInput = event.target.value
        this.RenderStateOutput()
    }

    render() {
        return (
            <div className = "searchcontainer">
                <input className = "search" type = "text" value = {this.state.userinput} onChange = {this.OnChangeSearchHandler} placeholder = "Enter a state name"></input>
                <div className = "covid-tally">
                    <div className = "confirmed card">
                        <p>Confirmed</p>
                        <div id ="confirmedincreasedcases"></div>
                        <div id = "confirmednoofcases"></div>
                    </div>
                    <div className = "active card">
                        <p>Active</p>
                        <div id = "activenoofcases"></div>
                    </div>
                    <div className = "recovered card">
                        <p>Recovered</p>
                        <div id ="recoveredincreasedcases"></div>
                        <div id = "recoverednoofcases"></div>
                    </div>
                    <div className = "deceased card">
                        <p>Deceased</p>
                        <div id ="deceasedincreasedcases"></div>
                        <div id = "deceasednoofcases"></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SearchComponent;