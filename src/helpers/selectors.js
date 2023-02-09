
export function getAppointmentsForDay(state, day) {
  let answer = [];
  for (const days of state.days){
    if (days.name === day){
      for (const id of days.appointments){
        if(id === state.appointments[id].id){
          let result = state.appointments[id];
          answer.push(result)
        }
      }
    }  
  }
  return answer; 
}

export function getInterview(state, interview) {
  if (!interview){
    return null
  }; 
  const interviewID =  interview.interviewer;
  const interviewersID = state.interviewers[interviewID].id; 
  if(interviewersID === interviewID){
    const interviewObj = state.interviewers[interviewID];
    interview.interviewer = interviewObj; 
    return interview; 
  }
  return null; 
}