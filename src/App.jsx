import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import AllTasks from "./pages/AllTasks";
import CompletedTasks from "./pages/CompletedTasks";

export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen bg-[#F5F5DC] text-[#556B2F]">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="p-6">
        {activeTab === "dashboard" && <Dashboard />}
        {activeTab === "all" && <AllTasks />}
        {activeTab === "completed" && <CompletedTasks />}
      </div>
    </div>
  );
}
