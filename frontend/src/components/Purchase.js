import React, { useState } from "react";
import { addPurchase } from "../api";

function Purchase() {
  const [assetName, setAssetName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [base, setBase] = useState("");

  const handleSubmit = async () => {
    await addPurchase({ assetName, quantity, base });
    alert("Purchase Added");
  };

  return (
    <div>
      <h3>Add Purchase</h3>

      <input
        placeholder="Asset"
        onChange={(e) => setAssetName(e.target.value)}
      />

      <input
        placeholder="Quantity"
        type="number"
        onChange={(e) => setQuantity(e.target.value)}
      />

      <input
        placeholder="Base (e.g., Base Alpha)"
        onChange={(e) => setBase(e.target.value)}
      />

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default Purchase;
