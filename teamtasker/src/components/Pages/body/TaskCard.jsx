import "./TaskCard.css";

const TaskCard = ({ task, onClick }) => {
  return (
    <div className="task-card"
      draggable
      onClick={() => onClick(task)}
      onDragStart={(e) => {
        e.dataTransfer.setData("taskId", task._id);
      }}
    >
      <h5>{task.title}</h5>
      <p>{task.description}</p>
      <span className={`status ${task.status}`}>
        {task.status}
      </span>
    </div>
  );
};

export default TaskCard;
