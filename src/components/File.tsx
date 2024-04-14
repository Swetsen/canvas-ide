import React, { useState } from "react";

function File({ dir }: { dir: string }) {
  const [open, setOpen] = useState(false);
  const fileName = dir.split("/")[dir.split("/").length - 1];

  return (
    <div className="filetree-file" onClick={() => setOpen(true)}>
      {fileName}
    </div>
  );
}

export default File;
