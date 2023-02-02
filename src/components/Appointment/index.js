import React, {Fragment} from "react";
import "components/Appointment/styles.scss"
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";

export default function Appointment(props){

  console.log(`props: `); 

  return (
    <article className="appointment">
      <Header time={props.time} />
    </article>
  )
};