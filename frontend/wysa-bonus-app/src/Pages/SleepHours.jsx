import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../Components/Loader";
const SleepHours = () => {
  const [sleepTime, setsleepTime] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  let [nickname, setnickname] = useState(
    JSON.parse(localStorage.getItem("nickname")) || ""
  );
  const handleSubmit = async () => {
    if (+sleepTime > 24) {
      return alert("Please enter value between 1 to 24 hours");
    }
    try {
      setLoading(true);
      let res = await fetch(
        `https://nice-tan-haddock-fez.cyclic.app/users/sleepHours`,
        {
          method: "POST",
          body: JSON.stringify({ userResponse: sleepTime, nickname }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      res = await res.json();
      setLoading(false);
      alert(res.message);
      nav("/efficiency");
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <Loader />;
  }
  return (
    <div>
      <p style={{ fontSize: "32px" }}>
        Ok, How many hours sleep do you get in a typical night?
      </p>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          width: "30%",
          margin: "auto",
        }}
      >
        <input
          className="input"
          value={sleepTime}
          onChange={(e) => setsleepTime(e.target.value)}
          type="number"
          min="1"
          max="24"
          placeholder="Enter 1 to 24 hours"
        />

        <button className="button" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default SleepHours;
