import { createContext, useContext } from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

const TodoContext = createContext();

export const TodoContextProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/todos`);
      setTodos(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleTodoAdd = async (todoData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/todos`, todoData);
    } catch (error) {
      console.error(error);
    }
  };

  //toggle todo complete(check/uncheck)
  const toggleTodo = async (id) => {
    /*on parent task complete mark all child task complete */
    const subTasks = todos.filter((todo) => todo.parentId === id);

    if (!subTasks.length) {
      updateTodoState(id);
    } else {
      const subTasksIds = subTasks.map((task) => task.id);
      const tasksToToggle = [...subTasksIds, id];

      tasksToToggle.forEach((taskId) => updateTodoState(taskId));
    }

    /*todo for child to parent-> on all clild task complete, mark parent also complete

      do something..
    */

    async function updateTodoState(id) {
      const todoObj = [...todos];
      const todoToToggle = todoObj.find((todo) => todo.id === id);

      const payload = {
        ...todoToToggle,
        isCompleted: !todoToToggle.isCompleted,
      };
      try {
        const response = await axios.put(
          `${API_BASE_URL}/todos/${id}`,
          payload
        );
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleTodoDelete = async (id) => {
    /*Handling deletion of subtasks if parents get deleted*/

    /*get all subtasks pertaining to the id(if any) */
    const subTasks = todos.filter((todo) => todo.parentId === id);

    /*no subtasks? directly delete the task : get all the ids of subtasks & parent and delete them*/
    if (!subTasks.length) {
      deleteTask(id);
    } else {
      const getSubTasksId = subTasks.map((task) => task.id);
      const tasksToDelete = [...getSubTasksId, id];

      tasksToDelete.forEach((id) => deleteTask(id));
    }

    async function deleteTask(id) {
      try {
        const response = await axios.delete(`${API_BASE_URL}/todos/${id}`);
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <TodoContext.Provider
      value={{
        todos,
        setTodos,
        handleTodoAdd,
        handleTodoDelete,
        toggleTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  return context;
};
