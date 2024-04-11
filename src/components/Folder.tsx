import React, { useEffect, useState } from "react";
import File from "./File";
import "../css/FileTree.css";

function Folder({ dir }: { dir: string }) {
  const [contains, setContains] = useState();
  const [open, setOpen] = useState(false);

  const openText = "▼";
  const closedText = "►";
  const folderName = dir.split("/")[dir.split("/").length - 1];

  useEffect(() => {
    window.ipcRenderer.send("readDirFiles", dir);

    /* FIXME: This should really only run once per component but it somehow runs more than
              that which causes a bunch of stuff being executed. It's really bad but idk what
              to do
    */

    window.ipcRenderer.on("readDirFilesResponse", (event, arg) => {
      if (arg["dir"] == dir) {
        setContains(arg["data"]);
      }
    });

    console.log("Ran once" + " " + dir);
  }, []);

  return (
    <div className="filetree-folder-button">
      <div
        className="filetree-folder-button-text"
        onClick={() => {
          setOpen(!open);
        }}
      >
        <p>{open ? openText : closedText}</p>
        <p>{folderName}</p>
      </div>
      {open ? (
        <div className="FolderContents">
          {contains === undefined ? (
            <p>Loading...</p>
          ) : (
            contains.map((item) => {
              if (item.type === "directory") {
                console.log(dir + ":       " + dir + "/" + item.name);
                return (
                  <Folder
                    key={dir + "/" + item.name}
                    dir={dir + "/" + item.name}
                  />
                );
              } else if (item.type === "file") {
                return (
                  <File
                    key={dir + "/" + item.name}
                    dir={dir + "/" + item.name}
                  />
                );
              }
            })
          )}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default Folder;
