import React,{useState,useEffect} from "react";
import './App.css'
import Navbar from "./components/Navbar";
import Home from './components/Home';
import { AppContext } from "./AppContext";

export default function App(){
    const [dialogBox, setDialogBox] = useState(false);
    const [grouping, setGrouping] = useState('Status');
    const [ordering, setOrdering] = useState('Priority');
    const [ticketsData, setTicketsData] = useState([]);
    const [usersData, setUsersData] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
              const data = await response.json();
              setTicketsData(data.tickets);
              setUsersData(data.users);
          } catch (error) {
              console.error('Error fetching data:', error);
          }
      };
      
      fetchData();
  }, []);


    return <div>
      <AppContext.Provider value={{ dialogBox, setDialogBox, grouping, setGrouping, ordering, setOrdering,ticketsData, setTicketsData,usersData, setUsersData }}>
      <Navbar/>
      <Home/>
      </AppContext.Provider>
    </div>
}