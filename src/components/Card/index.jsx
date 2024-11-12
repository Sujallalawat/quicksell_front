import React,{useContext} from "react";
import { AppContext } from "../../AppContext";
import './index.css'
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

let dp=[dp1,dp2,dp3,dp4,dp5]

export default function Card({tickets_id,tickets_title,tickets_tag,tickets_priority,tickets_status,tickets_userID}){
    const {grouping ,usersData} = useContext(AppContext);
    const getPriorityImage = () => {
        switch (tickets_priority) {
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
        switch (tickets_status) {
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
    let user_ind,availability;
    usersData.forEach((val,ind)=>{
        if(val.id==tickets_userID){
            user_ind=ind;
            availability=val.available;
            return;
        }
    })

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

    return <div className="cardContainer">
                <div className="cardID">
                    <span style={{color:"#868988",padding:"7px 0"}}>{tickets_id}</span>
                    {grouping!="User" && getProfileImage()}
                </div>
                <div className="cardTitle">
                    {grouping!="Status" && <span style={{display:"flex" , alignItems:"center",padding:"0 8px 0 5px"}}>{getStatusImage()}</span>}
                    <span style={{color:"#393a3a", fontWeight:"bold",padding:"7px 0"}}>{tickets_title}</span>
                </div>
                <div className="priorityContainer" style={{margin:"7px 0"}}>
                    {grouping!="Priority" &&  <div className="tagContainer" style={{height:"20px"}}>
                        {getPriorityImage()}
                    </div>}
                    <div className="tagContainer" style={{margin:"0 10px" , height:"20px"}}>
                        <div className="circle"/>
                        <span style={{color:"#8e9092",padding:"7px 0",margin:"7px"}} className="ticketsTag">{tickets_tag}</span>
                    </div>
                </div>
                
            </div>
}