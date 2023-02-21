import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData(){

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}, 
    interviewers: {},
  });

  const setDay = day => setState({ ...state, day });

  // fetching API data
  useEffect(()=> {
    Promise.all([
      axios.get(`/api/days`),
      axios.get(`/api/appointments`),
      axios.get(`/api/interviewers`),
    ]).then((all) => {
      setState(prev => (
        {...prev, days: all[0].data, 
          appointments: all[1].data, 
          interviewers: all[2].data,
        }))
  })},[]);

  // Saves and updates for new interviews  
  function bookInterview(id, interview, edit) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
      };
    const appointments = {
      ...state.appointments,
      [id]: appointment
      };
    return (
      axios.put(`/api/appointments/${id}`, {interview})
      .then(() => {

        // Reducing number of spots: 
        const cloneDays = [...state.days];
        const currentDayIndex = state.days.findIndex(day => day.name === state.day); 
        if (!edit) { cloneDays[currentDayIndex].spots--;}

        // Updating appointments and # of spots for that day  
        setState({...state,appointments, days: cloneDays}) 

      }
      ) 
    )
  }

  // Deletes appointments 
  function cancelInterview(id, edit){
    const appointment = {
      ...state.appointments[id],
      interview: null
      };
      const appointments = {
        ...state.appointments,
        [id]: appointment
        };
    return (
      axios.delete(`http://localhost:8001/api/appointments/${id}`, {data: appointments[id]})
        .then(() => {

          // Adding number of spots
          const cloneDays = [...state.days];
          const currentDayIndex = state.days.findIndex(day => day.name === state.day); 
          if (!edit) {cloneDays[currentDayIndex].spots++;}
          
          // Updating appointments and # of spots for that day 
          setState({...state,appointments, days: cloneDays}); 
        }) 
    )
  }
  
  return {state, setDay, bookInterview, cancelInterview}; 
}