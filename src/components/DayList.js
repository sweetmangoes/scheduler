import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props){

  const items = props.days.map((day) => {
      return(
        <DayListItem 
          key={day.id}
          name={day.name}
          spots={day.spots}
          selected={day.name === day.day}
          setDay={day.setDay}
        />
      )
    }
  );

  return (
    <ul>
      {items}
    </ul>
  )
}