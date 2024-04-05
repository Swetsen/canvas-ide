import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProjectSelector from "./ProjectSelector";
import IDE from "./IDE";

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
