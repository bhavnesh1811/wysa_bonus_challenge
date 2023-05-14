import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../Components/Loader";

const GoOutofBed = () => {
  const [bedOutTime, setBedOutTime] = useState("");
  const [loading, setLoading] = useState(false);

  const nav = useNavigate();
  let [nickname, setnickname] = useState(
    JSON.parse(localStorage.getItem("nickname")) || ""
  );
  const handleSubmit = async () => {
    if (bedOutTime === "") {
      return alert("Please Select time first");
    }
    try {
      setLoading(true);
      let res = await fetch(
        `https://nice-tan-haddock-fez.cyclic.app/users/getOutofBed`,
        {
          method: "POST",
          body: JSON.stringify({ userResponse: bedOutTime, nickname }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      res = await res.json();
      setLoading(false);
      alert(res.message);
      // console.log(res);
      nav("/sleephours");
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
        What time do you get out of bed to start your day ?
      </p>

      <input
        value={bedOutTime}
        onChange={(e) => setBedOutTime(e.target.value)}
        type="time"
      />

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default GoOutofBed;
