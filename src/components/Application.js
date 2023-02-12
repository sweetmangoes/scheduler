import React, {useState, useEffect} from "react"
import "components/Application.scss";
import DayList from "./DayList";
import axios from "axios";
import "components/Appointment"; 
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";

export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}, 
    interviewers: {}
  });
  
  const appointments = getAppointmentsForDay(state, state.day); 
  const interviewers = getInterviewersForDay(state, state.day); 
  const setDay = day => setState({ ...state, day });
  
  // Saves and updates for new interviews  
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
      };
    const appointments = {
      ...state.appointments,
      [id]: appointment
      };
    return (
      axios.put(`http://localhost:8001/api/appointments/${id}`, {interview})
      .then(() => 
        setState({...state,appointments})
      ) 
    )
  }

  // Deletes appointments 
  function cancelInterview(id){
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
        .then(() =>
          setState({...state,appointments})
        ) 
    )
  }

  // Schedule - passes components to Appoinment
  const appointmentList = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment
      key={appointment.id}
      id={appointment.id}
      time={appointment.time}
      interview={interview}
      bookInterview={bookInterview}
      cancelInterview={cancelInterview}
      interviewers={interviewers}
      />
      )
    })
    

  // fetching API data
  useEffect(()=> {
    Promise.all([
      axios.get(`http://localhost:8001/api/days`),
      axios.get(`http://localhost:8001/api/appointments`),
      axios.get(`http://localhost:8001/api/interviewers`),
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers:all[2].data }))
    })},[]);

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
          />          
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointmentList}
        <Appointment 
          key="last" 
          time="5pm"
        />
      </section>
    </main>
  );
}
