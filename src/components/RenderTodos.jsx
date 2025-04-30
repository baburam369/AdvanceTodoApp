const RenderTodos = ({ task }) => {
  const handleTaskState = () => {};
  return (
    <div className="pl-13">
      <h3>{task.todoGroup}</h3>
      <label>
        <input
          type="checkbox"
          checked={task.isComplete}
          onChange={handleTaskState}
        />
        <span className={` ${task.isComplete ? "line-through" : ""}`}>
          {task.todoText}
        </span>
      </label>
      {task.children &&
        task.children.map((childTask) => (
          <RenderTodos key={childTask.id} task={childTask} />
        ))}
    </div>
  );
};

export default RenderTodos;
