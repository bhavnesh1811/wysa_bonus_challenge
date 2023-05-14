import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../Components/Loader";

const GotoBed = () => {
  const [bedTime, setBedTime] = useState("");
  const [loading, setLoading] = useState(false);

  const nav = useNavigate();
  let [nickname, setnickname] = useState(
    JSON.parse(localStorage.getItem("nickname")) || ""
  );
  const handleSubmit = async () => {
    if(bedTime===""){
      return alert("Enter Bedtime")
    }
    try {
      setLoading(true);
      let res = await fetch(
        `https://nice-tan-haddock-fez.cyclic.app/users/goTobed`,
        {
          method: "POST",
          body: JSON.stringify({ userResponse: bedTime, nickname }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      res = await res.json();
      setLoading(false);
      alert(res.message);
      //   console.log(res);
      nav("/gooutofbed");
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <Loader />;
  }
  return (
    <div>
      <p style={{ fontSize: "32px" }}>What time do you go to bed for sleep ?</p>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          width: "30%",
          margin:"auto"
        }}
      >
        <input
          className="input"
          value={bedTime}
          onChange={(e) => setBedTime(e.target.value)}
          type="time"
        />

        <button className="button" onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default GotoBed;
