import React from "react";
import "./App.css";
import TicTacToe from "./components/TicTacToe";

// PUBLIC_INTERFACE
function App() {
  return (
    <div className="App">
      <main className="App-main">
        <TicTacToe />
      </main>
    </div>
  );
}

export default App;
