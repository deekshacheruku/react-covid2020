import React, { Component } from 'react';
import Service from "./State_Wise_Service.js";
import "./StateComponent.css"

class StateComponent extends Component {
    constructor(){
        super()
        this.State_Wise_Updated = {}
    }

    SortBasedOnRecoveryRate = () => {
         let Temp_State_Array = [];
         for (let Property in this.State_Wise_Updated) {
            if (this.State_Wise_Updated.hasOwnProperty(Property)) {
                let Temp_State_Object = {};
                Temp_State_Object[Property] = this.State_Wise_Updated[Property];
                Temp_State_Object.tempRecoveryRate = this.State_Wise_Updated[Property]["Recovery_Rate"]
                Temp_State_Array.push(Temp_State_Object);
               }
          }
        Temp_State_Array.sort( (item1, item2) => {
            return item1.tempRecoveryRate < item2.tempRecoveryRate ? 1 : ( item1.tempRecoveryRate > item2.tempRecoveryRate ? -1 : 0 );
        })
        let Sorted_State_Object = {}
        for (let i=0; i < Temp_State_Array.length ; i++) {
            let Temp_State_Object = Temp_State_Array[i];
            delete Temp_State_Object.tempRecoveryRate;
            let State_Object_Key = Object.keys(Temp_State_Object)[0]
            Sorted_State_Object[State_Object_Key] = Temp_State_Object[State_Object_Key];
            }
        this.State_Wise_Updated =  Sorted_State_Object
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
        this.SortBasedOnRecoveryRate()
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