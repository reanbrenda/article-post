import React from "react";

export default function FinalComponent() {
  return (
    <div
      style={{
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        textAlign: "center",
      }}
    >
      <p>Submitted Sucessfully</p>
      <button className="btn btn-success">Close</button>
    </div>
  );
}
