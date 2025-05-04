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
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  // const addTodos = async () => {

  // }
  return (
    <TodoContext.Provider
      value={{
        todos,
        setTodos,
        handleTodoAdd,
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
