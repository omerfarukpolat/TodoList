import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Signup from "./pages/Signup";
import MainPage from "./pages/MainPage";
import { useEffect } from "react";

function App() {
  return (
    <div lang={"tr"}>
      <Routes>
        <Route path={"/"} element={<MainPage />} />
        <Route path={"/login"} element={<LoginPage />} />
        <Route path={"/signup"} element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
