import React,{useState,useContext} from "react";
import { AppContext } from "../../AppContext";
import Add from "../../assets/add.svg"
import ThreeDotMenu from "../../assets/3 dot menu.svg"
import Card  from "../Card";
import noPriority from '../../assets/No-priority.svg'
import low from '../../assets/Img - Low Priority.svg'
import medium from '../../assets/Img - Medium Priority.svg'
import high from '../../assets/Img - High Priority.svg'
import urgentColor from '../../assets/SVG - Urgent Priority colour.svg'
import urgentGrey from '../../assets/SVG - Urgent Priority grey.svg'
import Backlog from "../../assets/Backlog.svg"
import Cancelled from "../../assets/Cancelled.svg"
import Done from "../../assets/Done.svg"
import In_progress from "../../assets/in-progress.svg"
import Todo from "../../assets/To-do.svg"
import dp1 from '../../assets/dp1.jpg'
import dp2 from '../../assets/dp2.jpg'
import dp3 from '../../assets/dp3.jpg'
import dp4 from '../../assets/dp4.jpg'
import dp5 from '../../assets/dp5.jpg'
import './index.css'

let dp=[dp1,dp2,dp3,dp4,dp5]

export default function Column({heading,imgSrc,grouping,groupingVal,ordering}){
    const {ticketsData,usersData } = useContext(AppContext);

    let cards=[]
    if(grouping=="Status")cards=ticketsData.filter((val)=>{
        return val.status==groupingVal;
    });
    else if(grouping=="Priority")cards=ticketsData.filter((val)=>{
        return val.priority==groupingVal;
    });
    else if(grouping=="User")cards=ticketsData.filter((val)=>{
        return val.userId==groupingVal;
    });

    
    if(ordering=="Priority")cards.sort((a, b) => b.priority - a.priority);
    else if(ordering=="Title")cards.sort((a, b) => a.title.localeCompare(b.title));

    let user_ind,availability;
    usersData.forEach((val,ind)=>{
        if(val.id==groupingVal){
            user_ind=ind;
            availability=val.available;
            return;
        }
    })


    const getPriorityImage = () => {
        switch (groupingVal) {
            case 0:
                return <img src={noPriority} alt="No Priority" />;
            case 1:
                return <img src={low} alt="Low Priority" />;
            case 2:
                return <img src={medium} alt="Medium Priority" />;
            case 3:
                return <img src={high} alt="High Priority" />;
            case 4:
                return <img src={urgentColor} alt="Urgent" />;
            default:
                return <img src={urgentGrey} alt="Urgent" />;
        }
    };

    const getStatusImage = () => {
        switch (groupingVal) {
            case "Backlog":
                return <img src={Backlog} alt="Backlog" />;
            case "Todo":
                return <img src={Todo} alt="Todo" />;
            case "In progress":
                return <img src={In_progress} alt="In_progress" />;
            case "Cancelled":
                return <img src={Cancelled} alt="Cancelled" />;
            case "Done":
                return <img src={Done} alt="Done" />;
        }
    };
    const getProfileImage = () => {
        const statusColor = availability ? "green" : "grey";
    
        return (
            <div style={{ position: "relative", display: "inline-block" }}>
                <img
                    src={dp[user_ind % 5]}
                    alt="dp"
                    height="30px"
                    width="30px"
                    style={{ borderRadius: "50%" }}
                />
                <span
                    style={{
                        position: "absolute",
                        bottom: "0",
                        right: "0",
                        height: "8px",
                        width: "8px",
                        backgroundColor: statusColor,
                        borderRadius: "50%",
                        border: "1px solid white",
                    }}
                ></span>
            </div>
        );
    };

    
    return <div className="column">
        <div className="columnHead">
            <div className="columnHeadTitle">
                {grouping=="Status" && getStatusImage()}
                {grouping=="Priority" && getPriorityImage()}
                {grouping=="User" && getProfileImage()}
                <div style={{marginLeft:"10px"}}>{heading}    <span style={{color:"#8f9195",marginLeft: "15px" }}>{cards.length}</span></div>
            </div>
            <div className="columnHeadPlus">
            {cards.length>0 && (<div>
                <img src={Add}/>
                <img src={ThreeDotMenu}/>
            </div>)}
            </div>
        </div>
        <div>
            {cards.map((val)=>{
                    return <Card tickets_id={val.id} tickets_title={val.title} tickets_tag={val.tag[0]} tickets_priority={val.priority} tickets_status={val.status} tickets_userID={val.userId} />
                })}
        </div>
        
    </div>
}