import React, { useState } from "react";
import { Rnd } from "react-rnd";

const CanvasWindow = () => {
  const [dimensions, setDimensions] = useState({
    width: 200,
    height: 200,
    x: 0,
    y: 0,
  });

  const onDragStop = (e, d) => {
    setDimensions((prevState) => ({ ...prevState, x: d.x, y: d.y }));
  };

  const onResizeStop = (e, direction, ref, delta, position) => {
    setDimensions({
      width: ref.style.width,
      height: ref.style.height,
      ...position,
    });
  };

  return (
    <Rnd
      size={{ width: dimensions.width, height: dimensions.height }}
      position={{ x: dimensions.x, y: dimensions.y }}
      onDragStop={onDragStop}
      onResizeStop={onResizeStop}
    >
      {/* Your code file content goes here */}
    </Rnd>
  );
};

export default CanvasWindow;
