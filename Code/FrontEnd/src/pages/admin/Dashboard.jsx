import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

const AdminDashboard = () => {
  const { getPendingUsers, approveUser } = useAuth();
  const [pending, setPending] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getPendingUsers();
        setPending(data);
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchUsers();
  }, []);

  const handleApprove = async (id) => {
    try {
      await approveUser(id);
      setPending((prev) => prev.filter((u) => u._id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div>
      <h2>Pending Users</h2>
      {pending.map((user) => (
        <div key={user._id}>
          {user.name} - {user.email}
          <button onClick={() => handleApprove(user._id)}>Approve</button>
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;
