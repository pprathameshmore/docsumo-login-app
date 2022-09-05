import React from "react";
import { useLocation } from "react-router-dom";

export const Dashboard = () => {
  const { state } = useLocation();
  const { user } = state.user;
  console.log(state);
  return (
    <div
      style={{
        height: "100vh",
        padding: "1rem",
      }}
    >
      Hello {user.full_name}
    </div>
  );
};
