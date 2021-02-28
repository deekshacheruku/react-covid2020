import React, { Component } from 'react';
import Service from "./State_Wise_Service.js";
import "./StateComponent.css"

class StateComponent extends Component {
    constructor(){
        super()
        this.State_Wise_Updated = {}
    }

    CalculateRecoveryRate = () => {
        Service.State_Wise_Data[0].map((item) => {
            let State_Object = {}
            State_Object["Confirmed"] = item[1]
            State_Object["Active"] = item[4]
            State_Object["Recovered"] = item[2]
            State_Object["Deaths"] = item[3]
            State_Object["Recovery_Rate"] = (Number(item[2]) / Number(item[1])).toFixed(3)
            if (item[0] == "Total")
                this.State_Wise_Updated["India"] = State_Object
            else
                this.State_Wise_Updated[item[0]] = State_Object
        })
    }

    renderOutput = () => {
        return (
            <table>
                <tbody>
                    { Object.keys(this.State_Wise_Updated).map((key,index) => {
                        if(key == "State Unassigned"){}
                        else if(index == 0){
                            return( <tr key={key}>
                                <td className = "firstcolumn" >State/UT</td>
                                <td>Confirmed</td>
                                <td>Active</td>
                                <td>Recovered</td>
                                <td>Deaths</td>
                                <td>Recovery Rate</td>
                            </tr>)
                        }
                        else{
		                return( <tr key={key}>
                                    <td className = "firstcolumn" >{key}</td>
                                    <td>{Number(this.State_Wise_Updated[key]["Confirmed"]).toLocaleString("en-IN")}</td>
                                    <td>{Number(this.State_Wise_Updated[key]["Active"]).toLocaleString("en-IN")}</td>
                                    <td>{Number(this.State_Wise_Updated[key]["Recovered"]).toLocaleString("en-IN")}</td>
                                    <td>{Number(this.State_Wise_Updated[key]["Deaths"]).toLocaleString("en-IN")}</td>
                                    <td>{this.State_Wise_Updated[key]["Recovery_Rate"]}</td>
                                </tr>)
		                }})}
                </tbody>
            </table>
    )}

    render() {
        return (
            <div className = "statecontainer">
                {this.CalculateRecoveryRate()}
                {this.renderOutput()}
            </div>
        );
    }
}

export default StateComponent;