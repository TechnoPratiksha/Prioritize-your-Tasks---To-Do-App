import React from "react";

export default function TaskItem({ task, onComplete, onDelete }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow flex flex-col sm:flex-row justify-between items-start sm:items-center transition hover:shadow-xl">
      <div className="mb-3 sm:mb-0">
        <h3 className="font-medium">{task.title}</h3>
        <p className="text-sm text-gray-600">{task.description}</p>
        {task.completedAt && (
          <p className="text-xs text-green-600">
            Completed: {new Date(task.completedAt).toLocaleString()}
          </p>
        )}
      </div>
      <div className="flex gap-2">
        {task.status === "PENDING" && (
          <button
            onClick={() => onComplete(task)}
            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
          >
            Complete
          </button>
        )}
        <button
          onClick={() => onDelete(task.id)}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
