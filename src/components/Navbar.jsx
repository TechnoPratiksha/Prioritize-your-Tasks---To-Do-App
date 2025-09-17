import React from "react";

export default function Navbar({ activeTab, setActiveTab }) {
  const tabs = [
    { id: "dashboard", label: "Dashboard" },
    { id: "all", label: "All Tasks" },
    { id: "completed", label: "Completed" },
  ];

  return (
    <nav className="bg-[#556B2F] text-[#F5F5DC] shadow-md">
      <div className="max-w-5xl mx-auto flex flex-wrap justify-between items-center px-4 sm:px-6 py-4">
        <h1 className="text-xl font-bold">🌿 To-Do App</h1>
        <div className="flex gap-4 sm:gap-6 mt-2 sm:mt-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`font-medium transition ${
                activeTab === tab.id
                  ? "text-[#BDB76B] border-b-2 border-[#BDB76B]"
                  : "hover:text-[#BDB76B]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
