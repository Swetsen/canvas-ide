import React, { useEffect } from "react";

function ProjectSelector() {
  useEffect(() => {
    import("../css/ProjectSelector.css")
      .then(() => {
        // Styles have been loaded
        console.log("CSS loaded dynamically");
      })
      .catch((err) => {
        // Handle failure
        console.error("Failed to load CSS dynamically", err);
      });
  }, []);

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
          <div
            className="Frame"
            onClick={() => window.ipcRenderer.send("testing")}
          >
            <p>Open Project</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProjectSelector;
