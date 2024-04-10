import React, { useState } from "react";

function Folder({ dir }: { dir: string }) {
  const [contains, setContains] = useState();

  window.ipcRenderer.send("readDirFiles", dir);
  let folderName = dir.split("/")[dir.split("/").length - 1];
  console.log(dir);
  window.ipcRenderer.on("readDirFilesResponse", (event, arg) => {
    setContains(arg["data"]);
  });

  return (
    <>
      <p>{folderName}</p>
      <div className="FolderContents">
        {contains === undefined ? (
          <p>Loading...</p>
        ) : (
          contains.map((item) => {
            if (item.type === "directory") {
              return <Folder dir={dir + "/" + item.name} />;
            } else if (item.type === "f") {
              return 0;
            }
          })
        )}
      </div>
    </>
  );
}

export default Folder;
