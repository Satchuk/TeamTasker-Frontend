import { useState } from "react";
import "../body/CreateTaskModal.css";

const UpdateTaskModal = ({ task, onClose, onUpdate, onDelete }) => {

  const [form, setForm] = useState({
    title: task.title,
    description: task.description,
    status: task.status,
    assignedTo: task.assignedTo,
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">

        <h3>Update Task</h3>

        <label>Title</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
        />

        <label>Description</label>      
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
        />

        <label>Assign To</label>
        <input
          name="assignedTo"
          value={form.assignedTo}
          onChange={handleChange}
        />

        <label>Status</label>
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>


        <div className="modal-actions">
          <button className="cancel" onClick={onClose}>
            Cancel
          </button>

          <button className="delete" onClick={() => onDelete(task._id)}>
            Delete
          </button>

          <button
            className="create"
            onClick={() => onUpdate(task._id, form)}
          >
            Update
          </button>
        </div>

      </div>
    </div>
  );
};

export default UpdateTaskModal;
