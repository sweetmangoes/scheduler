import { useState } from "react"

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newState, replace = false){
    if (!replace){
      history.push(newState); 
      setHistory(history);
      setMode(newState);
    } else{
      history.pop();
      setHistory(history);
      setMode(newState); 
    }
  }

  function back(){
    if(!history.length <= 1 ){
      setMode(history.pop())
      setHistory(history);
    }
  }; 

  return {mode, transition, back}; 
}