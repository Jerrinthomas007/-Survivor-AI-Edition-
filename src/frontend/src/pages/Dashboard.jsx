import React, { useState } from "react";
import CreateAgents from "../components/CreateAgents";
import StartGame from "../components/StartGame";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("create");

  return (
    <div className="p-6">
      <center>
        <h1 className="text-2xl font-bold mb-4">LLM Agent Voting App</h1>
      </center>
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab("create")}
          className={`px-4 py-2 rounded-lg ${
            activeTab === "create" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Create Agents
        </button>
        <button
          onClick={() => setActiveTab("start")}
          className={`px-4 py-2 rounded-lg ${
            activeTab === "start" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Start Game
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        {activeTab === "create" && (
          <CreateAgents onNext={() => setActiveTab("start")} />
        )}
        {activeTab === "start" && <StartGame />}
      </div>
    </div>
  );
};

export default Dashboard;
