import { useState } from "react";
import "./App.css";
import Board from "./components/board/Board";
import Navbar from "./components/navbar/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Board />
    </>
  );
}

export default App;
