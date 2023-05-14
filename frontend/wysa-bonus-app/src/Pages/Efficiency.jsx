import React, { useState } from "react";
import { useEffect } from "react";
import "../index.css";
import {Link} from "react-router-dom"
const Efficiency = () => {
  let [nickname, setnickname] = useState(
    JSON.parse(localStorage.getItem("nickname")) || ""
  );
  const [sleepEfficiency, setSleepEfficiency] = useState("");
  const getData = async () => {
    try {
      let res = await fetch(
        `https://nice-tan-haddock-fez.cyclic.app/users/sleepEfficiency`,
        {
          method: "POST",
          body: JSON.stringify({ nickname }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      res = await res.json();
    //   console.log(res);
      setSleepEfficiency(res.sleepEfficiency);
      //   nav("/sleephours");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <Link to={"/"}>Go Back to Home</Link>
      <p className="efficiency">You seem to have a sleep efficiency of  {sleepEfficiency}%</p>
      <br />
      {sleepEfficiency < 90 ? <p className="efficiency">We'll get this up to 90%</p> : ""}
      <br />

      <p className="efficiency">
        A higher sleep efficiency score a more refreshuing and energizing
        sleep,which can help you move into your day with a sense of lightness
        and ease.
      </p>
    </div>
  );
};

export default Efficiency;
