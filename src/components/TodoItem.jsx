const TodoItem = ({ todo }) => {
  return (
    <div className="pl-3">
      <label>
        <input type="checkbox" />
        <span>{todo.todoText}</span>
      </label>
      {todo.children?.length > 0 &&
        todo.children.map((child) => <TodoItem key={child.id} todo={child} />)}
    </div>
  );
};

export default TodoItem;
