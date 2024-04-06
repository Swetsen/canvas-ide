import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import ProjectSelector from "./pages/ProjectSelector";
import IDE from "./pages/IDE";

function App() {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route index element={<ProjectSelector />} />
          <Route path="/project/" element={<IDE />} />
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
