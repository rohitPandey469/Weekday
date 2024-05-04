import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Jobs from "./Pages/Jobs/Jobs";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Jobs />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
