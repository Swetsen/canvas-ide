import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProjectSelector from "./pages/ProjectSelector";
import IDE from "./pages/IDE";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<ProjectSelector />} />
          <Route path="/project/:id" element={<IDE />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
