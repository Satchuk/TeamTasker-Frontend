import React, { useEffect, useState } from "react";
import "./TaskBoard.css";
import CreateTaskModal from "./CreateTaskModal";
import { createTaskApi, deleteTaskApi, getAllTasksApi, updateTaskApi } from "../../../APi/TaskAPI";
import { useSelector } from "react-redux";
import TaskCard from "./TaskCard";
import UpdateTaskModal from "../Modals/UpdateTaskModal";
import ConfirmDeleteModal from "../Modals/ConfirmDeleteModal";
import FilterModal from "../Modals/FilterModal";
import filter from '../../../Assets/filter.png';

const TaskBoard = () => {

  const [viewType, setViewType] = useState("cards");
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const { userId, email, token } = useSelector(state => state.auth);
  const [tasks, setTasks] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filters, setFilters] = useState({
    status: "all",
    assignee: "all",
    date: ""
  });
  const [appliedFilters, setAppliedFilters] = useState(filters);
  const tasksPerPage = 5;

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;





  useEffect(() => {
    const getAllTasks = async () => {
      try {
        if (userId) {
          const response = await getAllTasksApi(email, token);
          if (response && response.data) {
            setTasks(response.data);
          }
          console.log('Tasks fetched', response.data);
        }
      } catch (err) {
        console.error("Failed to fetch tasks", err);
      }
    };
    getAllTasks();
  }, []);

  const handleCreateTask = async (taskData) => {
    try {
      const response = await createTaskApi(taskData, token);
      // Refresh task list after creation
      setTasks(prev => [response.data, ...prev]);
      setShowModal(false);
      setCurrentPage(1);

    } catch (err) {
      console.error("Create task failed", err);
    }
  };

  const handleUpdateTask = async (taskId, updatedData) => {
    const response = await updateTaskApi(taskId, updatedData, token);

    setTasks(prev =>
      prev.map(task =>
        task._id === taskId ? response.data : task
      )
    );

    setShowUpdateModal(false);
  };


  const handleDrop = async (e, newStatus) => {
    const taskId = e.dataTransfer.getData("taskId");

    const task = tasks.find(t => t._id === taskId);

    const response = await updateTaskApi(taskId, {
      ...task,
      status: newStatus
    }, token);

    setTasks(prev =>
      prev.map(t =>
        t._id === taskId ? response.data : t
      )
    );
  };

  const confirmDeleteTask = async () => {
    try {
      await deleteTaskApi(taskToDelete, token);

      setTasks(prev => prev.filter(task => task._id !== taskToDelete));
      setCurrentPage(1);

      setShowDeleteModal(false);
      setTaskToDelete(null);

    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const filteredTasks = tasks.filter(task => {
    const matchStatus =
      appliedFilters.status === "all" || task.status === appliedFilters.status;

    const matchAssignee =
      appliedFilters.assignee === "all" || task.assignedTo === appliedFilters.assignee;

    const matchDate =
      !appliedFilters.date ||
      new Date(task.createdAt).toISOString().slice(0, 10) === appliedFilters.date;

    return matchStatus && matchAssignee && matchDate;
  });

  const currentTasks = filteredTasks.slice(
    indexOfFirstTask,
    indexOfLastTask
  );

  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);

   const handleApplyFilters = () => {
        setAppliedFilters(filters);
        setCurrentPage(1);
        setShowFilterModal(false);
    };

    const handleResetFilters = () => {
        const reset = {
            status: "all",
            assignee: "all",
            date: ""
        };

        setFilters(reset);
        setAppliedFilters(reset);
        setCurrentPage(1);
    };


  return (
    <main className="task-board">

      {/* HEADER */}
      <div className="task-header">
        <h2>Task Board</h2>

        <button className="create-task-btn" onClick={() => setShowModal(true)}>
          + Create Task
        </button>
      </div>

      {/* VIEW SWITCH */}
      <div className="view-switch">
        <button
          className={viewType === "cards" ? "active" : ""}
          onClick={() => setViewType("cards")}
        >
          Cards
        </button>

        <button
          className={viewType === "list" ? "active" : ""}
          onClick={() => setViewType("list")}
        >
          List
        </button>

        <button
          className={viewType === "table" ? "active" : ""}
          onClick={() => setViewType("table")}
        >
          Table
        </button>
      </div>

      {/* EMPTY STATE */}
      {tasks.length === 0 && (
        <div className="empty-state">
          📭 No tasks yet. Create your first task.
        </div>
      )}

      {/* CARD VIEW */}
      {tasks.length > 0 && viewType === "cards" && (
        <div className="task-columns">

          <div className="column"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, "pending")}
          >
            <h4>To Do</h4>
            {tasks
              .filter(task => task.status === "pending")
              .map(task => (
                // <TaskCard key={task._id} task={task}  />
                <TaskCard
                  key={task._id}
                  task={task}
                  onClick={(task) => {
                    setSelectedTask(task);
                    setShowUpdateModal(true);
                  }}
                />

              ))}
          </div>

          <div className="column"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, "in-progress")}
          >
            <h4>In Progress</h4>
            {tasks
              .filter(task => task.status === "in-progress")
              .map(task => (
                // <TaskCard key={task._id} task={task} />
                <TaskCard
                  key={task._id}
                  task={task}
                  onClick={(task) => {
                    setSelectedTask(task);
                    setShowUpdateModal(true);
                  }}
                />
              ))}
          </div>

          <div className="column"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, "completed")}
          >
            <h4>Done</h4>
            {tasks
              .filter(task => task.status === "completed")
              .map(task => (
                // <TaskCard key={task._id} task={task} />
                <TaskCard
                  key={task._id}
                  task={task}
                  onClick={(task) => {
                    setSelectedTask(task);
                    setShowUpdateModal(true);
                  }}
                />
              ))}
          </div>

        </div>
      )}


      {/* LIST VIEW */}
      {tasks.length > 0 && viewType === "list" && (
        <div className="list-view">
          {tasks.map(task => (
            <div key={task._id} className="list-item">

              <div className="list-left">
                <h5>{task.title}</h5>
                <p>{task.description}</p>
              </div>

              <div className="list-right">
                <span className={`status ${task.status}`}>
                  {task.status}
                </span>

                <button className="edit-btn" onClick={() => {
                  setSelectedTask(task);
                  setShowUpdateModal(true);
                }}>Edit</button>
                <button className="delete-btn" onClick={() => {
                  setTaskToDelete(task._id);
                  setShowDeleteModal(true);
                }}>Delete</button>
              </div>

            </div>
          ))}
        </div>
      )
      }



      {/* TABLE VIEW */}
      {
        tasks.length > 0 && viewType === "table" && (
          <>
            <div className="table-actions-bar">
              <button
                className="filter-btn"
                onClick={() => setShowFilterModal(true)}
              >
               <img src={filter} alt="filter" className="filter-icon" />
              </button>
            </div>
            <table className="task-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Assigned</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {currentTasks.map(task => (
                  <tr key={task._id}>
                    <td>{task.title}</td>
                    <td className="desc">{task.description}</td>

                    <td>
                      <span className={`status ${task.status}`}>
                        {task.status}
                      </span>
                    </td>

                    <td>{task.assignedTo}</td>

                    <td className="actions">
                      <button className="edit-btn" onClick={() => {
                        setSelectedTask(task);
                        setShowUpdateModal(true);
                      }}>Edit</button>
                      <button className="delete-btn" onClick={() => {
                        setTaskToDelete(task._id);
                        setShowDeleteModal(true);
                      }}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="pagination">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => prev - 1)}
              >
                Prev
              </button>

              <span>
                Page {currentPage} of {totalPages}
              </span>

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => prev + 1)}
              >
                Next
              </button>
            </div>

          </>
        )
      }



      {
        showModal && (
          <CreateTaskModal
            onClose={() => setShowModal(false)}
            onCreate={handleCreateTask}
          />
        )
      }

      {
        showUpdateModal && selectedTask && (
          <UpdateTaskModal
            task={selectedTask}
            onClose={() => setShowUpdateModal(false)}
            onUpdate={handleUpdateTask}
            onDelete={(taskId) => {
              setShowUpdateModal(false);
              setTaskToDelete(taskId);
              setShowDeleteModal(true);
            }}
          />
        )
      }

      {showDeleteModal && (
        <ConfirmDeleteModal
          onCancel={() => {
            setShowDeleteModal(false);
            setTaskToDelete(null);
          }}
          onConfirm={confirmDeleteTask}
        />
      )}

      {showFilterModal && (
        <FilterModal
          filters={filters}
          setFilters={setFilters}
          tasks={tasks}
          onClose={() => setShowFilterModal(false)}
          onApply={() => {
           handleApplyFilters();
          }}
          onreset={handleResetFilters}
        />
      )}
    </main >
  );
};

export default TaskBoard;
