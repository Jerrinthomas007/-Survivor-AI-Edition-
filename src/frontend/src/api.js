
const API_BASE = "http://localhost:8000";

export async function register(email, password) {
  const res = await fetch(`${API_BASE}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error("Registration failed");
  return res.json();
}

export async function login(email, password) {
  const res = await fetch(`${API_BASE}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error("Login failed");
  return res.json();
}

// 👇 Add these two
export async function saveAgents(agentList) {
  const res = await fetch(`${API_BASE}/agents`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ agents: agentList }),
  });
  if (!res.ok) throw new Error("Saving agents failed");
  return res.json();
}

export async function getAgents() {
  const res = await fetch(`${API_BASE}/agents`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (!res.ok) throw new Error("Fetching agents failed");
  return res.json();
}

