import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../Components/Loader";
import "../index.css";
const HomePage = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const handleClick = async () => {
    if (name === "" || password === "") {
      return alert("Please fill all details");
    }
    try {
      setLoading(true);
      let res = await fetch(
        `https://nice-tan-haddock-fez.cyclic.app/users/register`,
        {
          method: "POST",
          body: JSON.stringify({ nickname: name, password }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      res = await res.json();
      // console.log(res);
      setLoading(false);
      if (res.message === "User already exist, Please login") {
        alert("User already exist,Please enter different username");
        return;
      }
      localStorage.setItem("nickname", JSON.stringify(name));
      nav("/sleepstruggle");
    } catch (error) {
      console.log(error);
      return;
    }
  };
  if (loading) {
    return <Loader />;
  }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "25%",
        margin: "auto",
        boxShadow: "rgba(0,0,0,0.35)0px 5px 15px",
        padding: "8px",
        borderRadius: "10px",
      }}
    >
      <h2>Register here</h2>
      <input
        className="input"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Choose a nickname..."
        type="text"
      />
      <input
        className="input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Choose a password..."
        type="password"
      />
      <input
        className="button"
        onClick={handleClick}
        type="submit"
        value="Submit"
      />
    </div>
  );
};

export default HomePage;
