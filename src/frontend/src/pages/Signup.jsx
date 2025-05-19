import React from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { register } from "../api";

export default function Signup() {
  const navigate = useNavigate();

  const handleSignup = async (email, password) => {
    try {
      await register(email, password);
      alert("Signup successful. Please login.");
      navigate("/login");
    } catch (err) {
      alert("Signup failed");
    }
  };

  return (
    <>
      <AuthForm onSubmit={handleSignup} title="Signup" />
      <p className="text-center mt-4">
        Already have an account?{" "}
        <button className="text-blue-500" onClick={() => navigate("/login")}>
          Login
        </button>
      </p>
    </>
  );
}
