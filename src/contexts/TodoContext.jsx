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
