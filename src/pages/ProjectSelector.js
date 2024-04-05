import React from "react";

// It works: don't touch ;)
if (window?.location.pathname === "/") require("../css/ProjectSelector.css");

function ProjectSelector() {
  return (
    <>
      <div className="Center">
        <div className="Title">
          <p>Canvas IDE</p>
        </div>
        <div className="Buttons">
          <div className="Frame">
            <p>Create New Project</p>
          </div>
          <div className="Seperator"></div>
          <div className="Frame" onClick={() => console.log("test")}>
            <p>Open Project</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProjectSelector;
