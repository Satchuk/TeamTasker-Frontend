import React, { useState } from "react";
import "./CreateTaskModal.css";

const CreateTaskModal = ({ onClose, onCreate }) => {

  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "pending"
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
