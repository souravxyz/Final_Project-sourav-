// src/pages/HomeRedirect.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function HomeRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return navigate("/login");

    if (user.role === "provider") navigate("/provider/dashboard");
    else navigate("/customer/dashboard");
  }, [navigate]);

  return null; // or return a loader/spinner
}
