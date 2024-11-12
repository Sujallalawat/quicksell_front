import React ,{useState,useEffect,useContext} from "react";
import './index.css'
import { AppContext } from "../../AppContext";
import Column from "../Column";
const heading={"Status":["Backlog","Todo","In progress","Done","Cancelled"],"Priority":[["No priority",0],["Urgent",4],["High",3],["Medium",2],["Low",1]]};

export default function Home(){
    const { dialogBox, setDialogBox, grouping, setGrouping, ordering, setOrdering,usersData } = useContext(AppContext);

    if(grouping=="Status")return <div className="homeContainer" >
        {heading["Status"].map((val)=>{
            return <Column heading={val} grouping="Status" groupingVal={val} ordering={ordering} />
        })}
        </div>
        
    else if(grouping=="Priority")return <div className="homeContainer" >
        {heading["Priority"].map((val)=>{
            return <Column heading={val[0]} grouping="Priority" groupingVal={val[1]} ordering={ordering} />
        })}
        </div>

    else if(grouping=="User")return <div className="homeContainer">
        {usersData.map((val)=>{
            return <Column heading={val.name} grouping="User" groupingVal={val.id} ordering={ordering} />
        })}
    </div>
}