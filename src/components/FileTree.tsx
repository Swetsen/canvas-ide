import React from "react";
import Folder from "./Folder";

function FileTree({ dir }: { dir: string }) {
  return (
    <div>
      <Folder dir={dir} />
    </div>
  );
}

export default FileTree;
