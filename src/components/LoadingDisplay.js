import React, {useState, useEffect} from "react";
import style from "./LoadingDisplay.module.css"
// Used for the loading text animation
const loadList = {
      0: "Loading",
      1: "Loading.",
      2: "Loading..",
      3: "Loading..."
}

// Draws the component shown to the user while waiting for the page to load
const LoadingDisplay = () => {
  const [current, setCurrent] = useState(0);
  const [message, setMessage] = useState(false);
  const [submessage, setSubmessage] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(current => (current + 1) % 4)
    }, 600);
    const submsgTimer = setTimeout(() =>
    setSubmessage(_ => true), 4000);
    const msgTimer = setTimeout(() =>
    setMessage(_ => true), 1000);
    return () => {
      clearInterval(interval);
      clearTimeout(msgTimer);
      clearTimeout(submsgTimer);
    };
  }, []);

  return (
    <div className="d-flex flex-column h-100 justify-content-center">
    {message && <h2 className={`w-100 text-center ${style.msgAnimation}`}>{loadList[current]}</h2>}
    {submessage ? ( <p className={`text-center text-muted ${style.submsgAnimation}`}>The Heroku servers are warming up!</p> ) :
    (<p>&nbsp;</p>)}
    </div>
  )
}

export default LoadingDisplay;
