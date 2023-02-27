import { useState } from "react"

export default function useVisualMode(initial) {
  // const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newState, replace = false){
    if (!replace){
      setHistory( prev => { return [...prev, newState]})
      // setMode(newState);
    } else{
      setHistory( prev => { return [...prev.slice(0,prev.length-1), newState]})
      // setMode(newState); 
    }
  }

  function back(){
    if(history.length < 2){
    return;
    }
    setHistory( prev => { return [...prev.slice(0,prev.length-1)]})
  }; 
  return {mode: history[history.length-1], transition, back}; 
}