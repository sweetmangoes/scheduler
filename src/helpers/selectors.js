
export function getAppointmentsForDay(state, day) {
  let answer = [];
  for (const days of state.days){
    if (days.name === day){
      for (const id of days.appointments){
        if(state.appointments[id]){
          let result = state.appointments[id];
          answer.push(result)
        }
      }
    }  
  }
  return answer; 
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  else {
    const interviewer = state.interviewers[interview.interviewer];
    return interview = {
      "student": `${interview.student}`,
      "interviewer": {
        "id": interviewer?.id,
        "name": interviewer?.name,
        "avatar": interviewer?.avatar
      }
    }
  }
}


export function getInterviewersForDay(state, day) {
  const answer = [];
  for (const days of state.days){
    if (days.name === day){
      for (const id of days.interviewers){
        if(id === state.interviewers[id].id){
          let result = state.interviewers[id]
          answer.push(result)
        }
    }
  }
}
return answer; 
}

export function reduceSpot(state){
  // const cloneDays = [...state.days]
  const currentDayIndex = state.days.findIndex(day => day.name === state.day); 
  state.days[currentDayIndex].spots--;
}

export function addSpot(state){
  // const cloneDays = [...state.days]
  const currentDayIndex = state.days.findIndex(day => day.name === state.day); 
  state.days[currentDayIndex].spots++;
}