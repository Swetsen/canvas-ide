import React from "react";

function File({ dir }: { dir: string }) {
  const fileName = dir.split("/")[dir.split("/").length - 1];

  return <div className="filetree-file">{fileName}</div>;
}

export default File;
