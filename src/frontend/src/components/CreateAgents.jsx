import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { saveAgents, getAgents } from "../api";

const placeholderImage =
  "https://cdn-icons-png.flaticon.com/512/149/149071.png"; // Generic user icon

const NAME_MAX = 50;
const DESC_MAX = 1000;

const CreateAgents = () => {
  const navigate = useNavigate();
  const [agents, setAgents] = useState([
    { name: "", character: "" },
    { name: "", character: "" },
    { name: "", character: "" },
  ]);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (index, field, value) => {
    // Enforce max lengths
    if (field === "name" && value.length > NAME_MAX) return;
    if (field === "character" && value.length > DESC_MAX) return;

    const updatedAgents = [...agents];
    updatedAgents[index][field] = value;
    setAgents(updatedAgents);
  };

  const handleSave = async () => {
    if (agents.some((a) => !a.name || !a.character)) {
      setError("All agents must have name and character description.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await saveAgents(agents);
      setSaved(true);
    } catch (err) {
      console.error(err);
      setError("Failed to save agents.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const data = await getAgents();
        if (data && data.length === 3) {
          setAgents(data);
          setSaved(true);
        }
      } catch (err) {
        console.error("Failed to load agents:", err);
      }
    };
    fetchAgents();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Create 3 Agents</h2>

      <div className="flex gap-6 justify-center">
        {agents.map((agent, index) => (
          <div
            key={index}
            className="flex flex-col items-center border rounded-lg p-4 w-64 bg-white shadow"
          >
            <div className="mb-4 flex flex-col items-center">
              <img
                src={placeholderImage}
                alt={`Agent ${index + 1}`}
                className="w-24 h-24 rounded-full object-cover mb-2 border-2 border-blue-500"
              />
              <span className="font-semibold text-lg">Agent {index + 1}</span>
            </div>

            <input
              type="text"
              placeholder="Agent Name"
              value={agent.name}
              onChange={(e) => handleChange(index, "name", e.target.value)}
              className="w-full p-2 mb-1 border rounded focus:outline-blue-500"
              maxLength={NAME_MAX}
            />
            <small className="self-start text-gray-500 mb-2">
              {NAME_MAX - agent.name.length} characters left
            </small>

            <textarea
              placeholder="Character Description"
              value={agent.character}
              onChange={(e) => handleChange(index, "character", e.target.value)}
              rows={4}
              className="w-full p-2 border rounded resize-none focus:outline-blue-500"
              maxLength={DESC_MAX}
            />
            <small className="self-start text-gray-500 mt-1">
              {DESC_MAX - agent.character.length} characters left
            </small>
          </div>
        ))}
      </div>

      {error && <p className="text-red-600 mt-4 text-center">{error}</p>}

      <div className="mt-6 flex justify-center">
        <button
          onClick={handleSave}
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Saving..." : "Save Agents"}
        </button>

        {saved && (
          <button
            onClick={() => navigate("/start")}
            className="ml-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default CreateAgents;
