import { useState, useEffect } from "react";
import axios from "axios";
import { reduceSpot, addSpot } from "helpers/selectors";

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
        // Update number of spots
        reduceSpot(state)
        // Updating appointments and # of spots for that day  
        setState({...state,appointments}) 
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
          // Update number of spots
          addSpot(state)
          // Updating appointments 
          setState({...state,appointments}); 
        }) 
    )
  }
  
  return {state, setDay, bookInterview, cancelInterview}; 
}