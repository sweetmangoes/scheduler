
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