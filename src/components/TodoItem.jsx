const TodoItem = ({ todo }) => {
  return (
    <div className="pl-3 p-3 m-2 border rounded-md  ">
      <div className="flex flex-col">
        <label>
          <input type="checkbox" />
          <span> {todo.todoText}</span>
        </label>
        <div className="flex justify-between ml-[1.1rem] gap-8">
          <span>Due: {todo.dueDate}</span>
          <span>Priority: {todo.priority}</span>
        </div>
      </div>
      {todo.children?.length > 0 &&
        todo.children.map((child) => <TodoItem key={child.id} todo={child} />)}
    </div>
  );
};

export default TodoItem;
