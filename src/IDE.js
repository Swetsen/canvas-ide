import React from "react";

import { useParams } from "react-router-dom";

function IDE() {
  const { id } = useParams();

  return (
    <>
      <h>{id}</h>
    </>
  );
}

export default IDE;
