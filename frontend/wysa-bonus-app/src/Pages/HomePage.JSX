import React, { useState } from "react";

const HomePage = () => {
    const [name,setName]=useState("")
  return (
    <div>
      <input value={name} onChange={(e)=>setName(e.target.name)} placeholder="Choose a nickname..." />
      <input type="submit" value="Submit" />
    </div>
  );
};

export default HomePage;
