import React from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { login } from "../api";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    try {
      const res = await login(email, password);
      localStorage.setItem("token", res.access_token);
      navigate("/dashboard");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <>
      <AuthForm onSubmit={handleLogin} title="Login" />
      <p className="text-center mt-4">
        Don't have an account?{" "}
        <button className="text-blue-500" onClick={() => navigate("/signup")}>
          Signup
        </button>
      </p>
    </>
  );
}
