import React, { useState } from "react";
import { addAssignment } from "../api";

function Assignment() {
  const [assetName, setAssetName] = useState("");
  const [assignedTo, setAssignedTo] = useState("");

  const handleSubmit = async () => {
    await addAssignment({ assetName, assignedTo });
    alert("Assigned");
  };

  return (
    <div>
      <h3>Assign Asset</h3>

      <input
        placeholder="Asset"
        onChange={(e) => setAssetName(e.target.value)}
      />

      <input
        placeholder="Person Name"
        onChange={(e) => setAssignedTo(e.target.value)}
      />

      <button onClick={handleSubmit}>Assign</button>
    </div>
  );
}

export default Assignment;
