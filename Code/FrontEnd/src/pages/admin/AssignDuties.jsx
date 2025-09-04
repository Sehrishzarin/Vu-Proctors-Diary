// src/pages/admin/AssignDuties.jsx
import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import "./AssignDuties.css";
const AssignDuties = () => {
  const { assignDuty } = useAuth();
  const [duty, setDuty] = useState({
    examName: "",
    date: "",
    center: "",
    assignedTo: "",
    role: "invigilator",
  });

  const handleAssign = async () => {
    const res = await assignDuty(duty);
    console.log("Assigned:", res);
  };

  return (
    <div>
      <h2>Assign Duty</h2>
      <input
        type="text"
        placeholder="Exam Name"
        onChange={(e) => setDuty({ ...duty, examName: e.target.value })}
      />
      <button onClick={handleAssign}>Assign</button>
    </div>
  );
};

export default AssignDuties;
