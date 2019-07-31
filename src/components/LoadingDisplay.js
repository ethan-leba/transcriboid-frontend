import React, {useState, useEffect} from "react";
import "./LoadingDisplay.css"
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
  const [submessage, setSubmessage] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(current => (current + 1) % 4)
    }, 600);
    const timer = setTimeout(() =>
    setSubmessage(_ => true), 3000);
    return () => {
      clearInterval(interval);
      clearTimeout(timer)
    };
  }, []);

  return (
    <div className="d-flex flex-column h-100 justify-content-center">
    <h2 className="w-100 text-center">{loadList[current]}</h2>
    {submessage ? ( <p className="text-center text-muted loading-text">The Heroku servers are warming up!</p> ) :
    (<p>&nbsp;</p>)}
    </div>
  )
}

export default LoadingDisplay;
