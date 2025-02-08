/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import ye from "../assets/ye.png"; // Ensure this is the correct path


const ObjectComponent = ({ body }) => {
  const [position, setPosition] = useState({
    x: body.position.x,
    y: body.position.y,
  });

  useEffect(() => {
    const update = () => {
      setPosition({ x: body.position.x, y: body.position.y });
      requestAnimationFrame(update);
    };
    update();
  }, [body]);

  return (
    <img
      src={ye}
      alt="Bouncing Object"
      style={{
        position: "absolute",
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: "80px",
        height: "80px",
        userSelect: "none",
        pointerEvents: "none",
      }}
    />
  );
};

export default ObjectComponent;