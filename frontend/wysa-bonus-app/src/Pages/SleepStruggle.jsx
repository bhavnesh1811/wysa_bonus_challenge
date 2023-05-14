import React from "react";
import { useState } from "react";
import "../index.css";
import { useNavigate } from "react-router-dom";
import Loader from "../Components/Loader";

const SleepStruggle = () => {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  let [nickname, setnickname] = useState(
    JSON.parse(localStorage.getItem("nickname")) || ""
  );

  const handleSubmit = async () => {
    try {
      setLoading(true);
      let res = await fetch(
        `https://nice-tan-haddock-fez.cyclic.app/users/sleepStruggle`,
        {
          method: "POST",
          body: JSON.stringify({ userResponse: value, nickname }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      res = await res.json();
      setLoading(false);
      alert(res.message);
      nav("/gotobed");
    } catch (error) {
      console.log(error);
      return;
    }
  };
  if (loading) {
    return <Loader/>
  }
  return (
    <div style={{width:"30%",margin:"auto"}}>
      <p style={{ fontSize: "24px" }}>
        Thats a great goal . How long you have been struggling with your sleep ?
      </p>
      <div>
        <p
          className="sleepstruggle"
          id="lessthan"
          onClick={() => {
            setValue("Less than 2 Weeks");
            document.getElementById("lessthan").classList.toggle("check");
          }}
        >
          Less than 2 Weeks
        </p>
        <p
          className="sleepstruggle"
          id="between"
          onClick={() => {
            setValue("2 to 8 weeks");
            document.getElementById("between").classList.toggle("check");
          }}
        >
          2 to 8 weeks
        </p>
        <p
          id="morethan"
          className="sleepstruggle"
          onClick={() => {
            setValue("More than 8 weeks");
            document.getElementById("morethan").classList.toggle("check");
          }}
        >
          More than 8 weeks
        </p>
      </div>
      <button className="button" onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default SleepStruggle;
