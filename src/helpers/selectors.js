/* 
Purpose:
create a function called getAppointmentsForDay that will receive two arguments state and day. 
The function will return an array of appointments for the given day.


*/

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

  console.log(`answer: `, answer)

  return answer; 


}