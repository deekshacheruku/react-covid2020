import React, { Component } from 'react'
import {readString} from 'react-papaparse'
import "./OverallComponent.css"
import axios from "axios"


class OverallComponent extends Component {
    constructor(){
        super();
        this.DateInstance = new Date(),
        this.MonthArray = ["Jan","Feb","Mar","April","May","Jun","July","Aug","Sep","Oct","Nov","Dec"],
        this.state = {
            Date : this.DateInstance.getDate(),
            Month : this.MonthArray[this.DateInstance.getMonth()],
            Hours : this.FormatTime(this.DateInstance.getHours()),
            Minutes : this.FormatTime(this.DateInstance.getMinutes()),
            testcompleted : 0,
            asofdate : "",
            asofmonth : ""
        }
        axios.get("https://api.covid19india.org/csv/latest/tested_numbers_icmr_data.csv")
        .then(response => {
            const testdetails = readString(response.data)
            const testdetailslength = testdetails.data.length
            const asof = String(testdetails.data[testdetailslength-1][1])
            this.setState ({ asofdate : asof.split("/")[0] })
            this.setState ({ asofmonth : this.MonthArray[asof.split("/")[1]]})
            this.setState ({ testcompleted : (Number(testdetails.data[testdetailslength-1][3])).toLocaleString("en-IN")})
        })
        .catch(error =>{
            console.log(error)
        })
    }

    FormatTime(time){
        if (time < 10)
            return "0" + time
        return time
    }

    render() {
        return (
            <div className = "overallcontainer">
                <div className = "overallsubcontainer1">
                    <p className = "indiaheader">India</p>
                    <p className = "updatedstatus">Last Updated on {this.state.Date} {this.state.Month},{this.state.Hours}:{this.state.Minutes} IST</p>
                </div>
                <div className = "overallsubcontainer2">
                    <p>Tested</p>
                    <p id="testcompleted">{this.state.testcompleted}</p>
                    <p id="asof">As of {this.state.asofdate} {this.state.asofmonth}</p>
                    <p>per <span className = "source">source</span></p>
                </div>
            </div>
        );
    }
}

export default OverallComponent;