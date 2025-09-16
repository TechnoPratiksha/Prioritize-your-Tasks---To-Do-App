import React, { useState } from "react";

export default function TaskModal({ onAddTask }) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;
    onAddTask({ title, description });
    setTitle("");
    setDescription("");
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
      >
        + Add Task
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-20">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setIsOpen(false)}
            >
              ✖
            </button>
            <h2 className="text-xl font-bold mb-4">New Task</h2>
            <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border p-2 rounded"
              />
              <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border p-2 rounded"
              />
              <button
                type="submit"
                className="bg-green-500 text-white py-2 rounded hover:bg-green-600"
              >
                Add Task
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
