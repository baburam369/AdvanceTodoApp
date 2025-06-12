import { useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar";
import TodoList from "../components/TodoList";
import { useAppContext } from "../contexts/AppContext";
import Login from "./Login";
import { useEffect } from "react";

const HomePage = () => {
  const navigate = useNavigate();
  const { isLoggedin } = useAppContext();

  console.log("HomePage isLoggedin:", isLoggedin);

  useEffect(() => {
    if (isLoggedin === false) {
      navigate("/login");
    }
  }, [isLoggedin, navigate]);

  if (isLoggedin === false) return null;

  return (
    <div className=" flex flex-col gap-6 h-screen ">
      <Navbar />
      <TodoList />
    </div>
  );
};

export default HomePage;
