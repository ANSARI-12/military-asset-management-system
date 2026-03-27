import React, { useState } from "react";
import { addTransfer } from "../api";

function Transfer() {
  const [assetName, setAssetName] = useState("");
  const [fromBase, setFromBase] = useState("");
  const [toBase, setToBase] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleSubmit = async () => {
    await addTransfer({ assetName, fromBase, toBase, quantity });
    alert("Transfer Done");
  };

  return (
    <div>
      <h3>Transfer Asset</h3>

      <input
        placeholder="Asset"
        onChange={(e) => setAssetName(e.target.value)}
      />

      <input
        placeholder="From Base"
        onChange={(e) => setFromBase(e.target.value)}
      />

      <input
        placeholder="To Base"
        onChange={(e) => setToBase(e.target.value)}
      />

      <input
        placeholder="Quantity"
        type="number"
        onChange={(e) => setQuantity(e.target.value)}
      />

      <button onClick={handleSubmit}>Transfer</button>
    </div>
  );
}

export default Transfer;
