import { useState } from "react"

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newState, replace = false){
    if (!replace){
      history.push(mode);
      setMode(newState);
    } else{
      history.pop(mode);
      setMode(newState); 
    }
  }

  function back(){
    if(!history.length <= 1 ){
      setMode(history.pop())
    }
  }; 


  return {mode, transition, back}; 
}