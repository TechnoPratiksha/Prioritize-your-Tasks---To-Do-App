import React, { useEffect, useState } from "react";
import { getTasks, updateTask, deleteTask } from "../api/api";

export default function AllTasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await getTasks();
      setTasks(res.data);
    } catch {
      const localData = localStorage.getItem("tasks");
      if (localData) setTasks(JSON.parse(localData));
    }
  };

  const handleComplete = async (task) => {
    try {
      await updateTask(task.id, { ...task, status: "COMPLETED", completedAt: new Date().toISOString() });
      fetchTasks();
    } catch {
      setTasks((prev) =>
        prev.map((t) =>
          t.id === task.id ? { ...t, status: "COMPLETED", completedAt: new Date().toISOString() } : t
        )
      );
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      fetchTasks();
    } catch {
      setTasks((prev) => prev.filter((t) => t.id !== id));
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow p-6 border border-[#BDB76B]">
      <h2 className="text-2xl font-bold mb-4 text-[#556B2F]">📋 All Tasks</h2>
      <ul className="space-y-3">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <li
              key={task.id}
              className="p-4 rounded-lg border border-[#BDB76B] bg-[#F5F5DC] text-[#556B2F] shadow-sm flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold">{task.title}</h3>
                <p className="text-sm">{task.description}</p>
                {task.completedAt && (
                  <p className="text-xs text-[#556B2F]">
                    Completed at: {new Date(task.completedAt).toLocaleString()}
                  </p>
                )}
              </div>
              <div className="flex gap-2">
                {task.status !== "COMPLETED" && (
                  <button
                    onClick={() => handleComplete(task)}
                    className="bg-[#556B2F] hover:bg-[#BDB76B] text-white px-3 py-1 rounded-lg shadow transition"
                  >
                    Complete
                  </button>
                )}
                <button
                  onClick={() => handleDelete(task.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg shadow transition"
                >
                  Delete
                </button>
              </div>
            </li>
          ))
        ) : (
          <p className="text-gray-500">No tasks found</p>
        )}
      </ul>
    </div>
  );
}
