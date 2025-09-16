import React, { useState, useEffect } from "react";
import { getTasks, createTask } from "../api/api";
import { motion, AnimatePresence } from "framer-motion";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await getTasks();
      setTasks(res.data);
    } catch {
      console.log("Backend not available, using localStorage only");
      const localData = localStorage.getItem("tasks");
      if (localData) setTasks(JSON.parse(localData));
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!title || !description) return;

    setLoading(true);

    const newTask = { title, description };

    try {
      await createTask(newTask);
      fetchTasks();
    } catch {
      const localTask = {
        ...newTask,
        id: Date.now(),
        status: "PENDING",
        createdAt: new Date().toISOString(),
      };
      setTasks((prev) => [...prev, localTask]);
      localStorage.setItem("tasks", JSON.stringify([...tasks, localTask]));
    }

    setTitle("");
    setDescription("");
    setLoading(false);
    setNotification("✅ Task added successfully!");

    // Auto-hide after 3s
    setTimeout(() => setNotification(""), 3000);
  };

  return (
    <div className="flex justify-center items-center min-h-[70vh] relative">
      {/* Notification */}
      {/* Notification */}
<AnimatePresence>
  {notification && (
    <motion.div
      key="notif"
      initial={{ opacity: 0, y: -50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -50, scale: 0.9 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="absolute top-6 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg"
    >
      {notification}
    </motion.div>
  )}
</AnimatePresence>


      {/* Task Form Card */}
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4 text-[#556B2F]">
  💭 Hey, what’s on your mind?</h2>
        <form className="flex flex-col gap-4" onSubmit={handleAddTask}>
          <input
            type="text"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <textarea
            placeholder="Task description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <button
            type="submit"
            disabled={!title || !description || loading}
            className={`py-2 px-4 rounded-lg shadow transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : !title || !description
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            {loading ? "Adding..." : "Add Task"}
          </button>
        </form>
      </div>
    </div>
  );
}
