import React, { useEffect, useState } from "react";
import { getTasks } from "../api/api";

export default function CompletedTasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await getTasks();
      setTasks(res.data.filter((t) => t.status === "COMPLETED"));
    } catch {
      const localData = localStorage.getItem("tasks");
      if (localData) {
        const parsed = JSON.parse(localData);
        setTasks(parsed.filter((t) => t.status === "COMPLETED"));
      }
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow p-6 border border-[#BDB76B]">
      <h2 className="text-2xl font-bold mb-4 text-[#556B2F]">✅ Completed Tasks</h2>
      <ul className="space-y-3">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <li
              key={task.id}
              className="p-4 rounded-lg border border-[#BDB76B] bg-[#F5F5DC] text-[#556B2F] shadow-sm"
            >
              <h3 className="font-semibold">{task.title}</h3>
              <p className="text-sm">{task.description}</p>
              <p className="text-xs text-[#556B2F]">
                Completed at: {new Date(task.completedAt).toLocaleString()}
              </p>
            </li>
          ))
        ) : (
          <p className="text-gray-500">No completed tasks</p>
        )}
      </ul>
    </div>
  );
}
