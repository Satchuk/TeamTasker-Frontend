import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend
} from "recharts";

import "./DashBoard.css";
import { getDashboardData } from "../../../APi/DashboardAPI.js";
import CreateTaskModal from "./CreateTaskModal";
import { useSelector } from "react-redux";
import { createTaskApi } from "../../../APi/TaskAPI.js";

function DSBody() {

  const [dashboard, setDashboard] = useState({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0
  });

  const [showModal, setShowModal] = useState(false);
  const { userId , email} = useSelector(state => state.auth);

  useEffect(() => {
    if (userId) {
      const fetchDashboardData = async () => {
        try {
          console.log('user',userId);
          
          const response = await getDashboardData(email);
       
          setDashboard({
            totalTasks: response.totalTasks,
            completedTasks: response.completedTasks,
            pendingTasks: response.pendingTasks
          });
        } catch (error) {
          console.error("Error fetching dashboard data:", error);
        }
      };

      fetchDashboardData();
    }
  }, [userId]);

  const handleCreateTask = async (taskData) => {
    try {
      const token = localStorage.getItem("token");
      await createTaskApi(taskData, token);

      setShowModal(false);
      console.log('userId',userId);
      
      // refresh dashboard counts
      const response = await getDashboardData(email);
      setDashboard({
        totalTasks: response.totalTasks,
        completedTasks: response.completedTasks,
        pendingTasks: response.data.pendingTasks
      });

    } catch (err) {
      console.error("Create task failed", err);
    }
  };


  return (
    <main className="dashboard-body">

      {/* TITLE BAR */}
      <div className="title-bar">
        <h2>Dashboard</h2>

        {/* Show create button ONLY if no tasks */}
        {dashboard.totalTasks === 0 && (
          <button
            className="create-btn"
            onClick={() => setShowModal(true)}
          >
            + Create Task
          </button>
        )}
      </div>

      {/* EMPTY USER MESSAGE */}
      {dashboard.totalTasks === 0 && (
        <div className="dashboard-empty">
          <p>You don’t have any tasks yet.</p>
          <p>Create your first task to get started 🚀</p>
        </div>
      )}

      {/* CARDS */}
      <div className="cards">
        <div className="card total">
          <h4>Total Tasks</h4>
          <p>{dashboard.totalTasks}</p>
        </div>

        <div className="card completed">
          <h4>Completed</h4>
          <p>{dashboard.completedTasks}</p>
        </div>

        <div className="card pending">
          <h4>To Do</h4>
          <p>{dashboard.pendingTasks}</p>
        </div>
      </div>

      {/* CHART ONLY WHEN TASKS EXIST */}
      {dashboard.totalTasks > 0 && (
        <div className="chart-container">
          <PieChart width={300} height={300}>
            <Pie
              data={[
                { name: "Completed", value: dashboard.completedTasks },
                { name: "Pending", value: dashboard.pendingTasks }
              ]}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              label
            >
              <Cell />
              <Cell />
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      )}

      {/* CREATE TASK MODAL */}
      {showModal && (
        <CreateTaskModal
          onClose={() => setShowModal(false)}
          onCreate={handleCreateTask}
        />
      )}

    </main>
  );
}

export default DSBody;
