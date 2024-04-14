import React, { useEffect } from "react";
import FileTree from "../components/FileTree";
import Canvas from "../components/Canvas";

function IDE() {
  useEffect(() => {
    import("../css/IDE.css")
      .then(() => {
        // Styles have been loaded
        console.log("CSS loaded dynamically");
      })
      .catch((err) => {
        // Handle failure
        console.error("Failed to load CSS dynamically", err);
      });
  }, []);

  const dir = "C:/Users/madad/OneDrive/Desktop/canvasproject";

  return (
    <>
      <div className="filetree">
        <FileTree dir={dir} />
      </div>
      <div>
        <Canvas />
      </div>
    </>
  );
}

export default IDE;
