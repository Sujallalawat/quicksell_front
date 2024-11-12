import React,{useContext} from "react";
import './index.css'
import display from '../../assets/Display.svg'
import down from '../../assets/down.svg'
import { AppContext } from '../../AppContext';

export default function Navbar(){
    const { dialogBox, setDialogBox, grouping, setGrouping, ordering, setOrdering } = useContext(AppContext);

    return <div>
        <div className="navbarContainer">
            <div className="tagContainer" onClick={()=>setDialogBox(!dialogBox)}>
                <img src={display} style={{padding:'0 5px'}}/>
                <div className="display" style={{padding:'0 5px'}}>Display</div>
                <img src={down} style={{padding:'0 5px'}}/>
            </div>

            {dialogBox && (<div
                    style={{
                        position: 'fixed',
                        top: '55px',
                        left: '30px',
                        padding: '20px',
                        backgroundColor: '#f6f8fa',
                        boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
                        borderRadius:'10px',
                        zIndex: 1000,
                        width: '250px',
                    }}
                >
                    <div style={{display:"flex", justifyContent:"space-between", marginBottom: '10px' }}>
                        <span style={{color:"#909092"}}>Grouping: </span>
                        <select
                        className="dropdown"
                            value={grouping}
                            onChange={(e) => setGrouping(e.target.value)}
                            style={{ marginLeft: '10px', padding: '5px',width:'100px',borderRadius:'5px' , borderColor:'#eeeeee', borderWidth: '2px'}}
                        >
                            <option value="Status">Status</option>
                            <option value="User">User</option>
                            <option value="Priority">Priority</option>
                        </select>
                    </div>

                    <div style={{display:"flex", justifyContent:"space-between", marginBottom: '10px' }}>
                        <span style={{color:"#909092"}}>Ordering: </span>
                        <select
                            value={ordering}
                            onChange={(e) => setOrdering(e.target.value)}
                            style={{ marginLeft: '10px', padding: '5px',width:'100px',borderRadius:'5px' , borderColor:'#eeeeee', borderWidth: '2px'}}
                        >
                            <option value="Priority">Priority</option>
                            <option value="Title">Title</option>
                        </select>
                    </div>

                </div>)}
        </div>
    </div>
}