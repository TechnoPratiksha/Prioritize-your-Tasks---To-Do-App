import React from "react";
import TaskItem from "./TaskItem";

export default function TaskList({ tasks, onComplete, onDelete }) {
  const groupedTasks = tasks.reduce((acc, task) => {
    const date = task.createdAt ? task.createdAt.split("T")[0] : "Unknown Date";
    if (!acc[date]) acc[date] = [];
    acc[date].push(task);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      {Object.keys(groupedTasks).map((date) => (
        <div key={date} className="bg-gray-50 p-4 rounded-lg shadow">
          <h2 className="text-lg sm:text-xl font-bold mb-4">📅 {date}</h2>
          <div className="space-y-3">
            {groupedTasks[date].map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onComplete={onComplete}
                onDelete={onDelete}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
