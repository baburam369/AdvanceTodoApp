import { useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar";
import TodoList from "../components/TodoList";
import { useAppContext } from "../contexts/AppContext";
import Login from "./Login";
import { useEffect } from "react";

const HomePage = () => {
  const navigate = useNavigate();
  const isLoggedin = useAppContext();

  useEffect(() => {
    if (!isLoggedin) {
      navigate("/login", { replace: true });
    }
  }, [isLoggedin, navigate]);

  return isLoggedin ? (
    <div className=" flex flex-col gap-6 h-screen ">
      <Navbar />
      <TodoList />
    </div>
  ) : null;
};

export default HomePage;
