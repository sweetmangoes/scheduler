import React, {Fragment} from "react";
import "components/Appointment/styles.scss"
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import useVisualMode from "hooks/useVisualMode";
import Status from "./Status";
import Confirm from "./Confirm";

export default function Appointment(props){

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE"; 
  const SAVING = "SAVING";
  const DELETE = "DELETE";
  const CONFIRM = "CONFIRM"; 
  const EDIT = "EDIT";  // Whats the point of this? 
  
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  
  // Saves new appointment 
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING); 
    props.bookInterview(props.id, interview)
      .then(()=>
        transition(SHOW)
      )
  }

  // Confirms the cancelation of appoinment 
  function confirm(){ 
    transition(CONFIRM); 
  }

  // Deletes appointment
  function deleteAppointment(){
    transition(DELETE); 
    props.cancelInterview(props.id)
      .then(() => { 
        transition(EMPTY)
      });
  }

  // Edits appoinment name and interviewer
  function edit(){
    transition(EDIT)
  } 
    
  return (
    <article className="appointment">
      <Header
        time = {props.time} 
      />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CREATE && 
        <Form 
          student = {props.interview?.student}
          interviewer = {props.interview?.interviewer}
          interviewers = {props.interviewers}
          onCancel = {back}
          onSave = {save}
        />
      }
      {mode === SAVING && 
        <Status 
          message = "Saving"
        /> 
      }
      {mode === DELETE &&
        <Status 
          message = "Deleting"
        />
      }
      {mode === CONFIRM &&
          <Confirm 
            message = "Are you sure you would like to delete?"
            onCancel = {back}
            onConfirm = {deleteAppointment}
          />
      }
      {mode === EDIT &&
        <Form 
          student = {props.interview?.student}
          interviewer = {props.interview?.interviewer.id}
          interviewers = {props.interviewers}
          onCancel = {back}
          onSave = {save}
        />
      }
      {mode === SHOW && (
        <Show
          student={props.interview?.student}
          interviewer={props.interview?.interviewer}
          onDelete={confirm}
          onEdit={edit}
        />
      )} 
    </article>
  )
};