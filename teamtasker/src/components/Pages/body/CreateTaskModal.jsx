import React, { use, useState } from "react";
import "./CreateTaskModal.css";
import { useSelector } from "react-redux";

const CreateTaskModal = ({ onClose, onCreate }) => {
  const {allUsers,username} = useSelector(state => state.auth);
  const users = allUsers || [];

  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "pending",
    assignedTo: username || ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    onCreate(form);
  };

  return (
    <div className="modal-backdrop">

      <div className="modal">

        <h3>Create Task</h3>

        <input
          name="title"
          placeholder="Task title"
          value={form.title}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Task description"
          value={form.description}
          onChange={handleChange}
        />

        <select
          value={form.assignedTo}
          onChange={(e) =>
            setForm({ ...form, assignedTo: e.target.value })
          }
        >
          <option value="">Assign User</option>

          {users.map(user => (
            <option key={user.email} value={user.email}>
              {user.name}
            </option>
          ))}
        </select>


        <select
          name="status"
          value={form.status}
          onChange={handleChange}
        >
          <option value="pending">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <div className="modal-actions">
          <button className="cancel" onClick={onClose}>
            Cancel
          </button>

          <button className="create" onClick={handleSubmit}>
            Create
          </button>
        </div>

      </div>
    </div>
  );
};

export default CreateTaskModal;
