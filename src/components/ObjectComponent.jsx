/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import ye from "../assets/ye.png";

const ObjectComponent = ({ body }) => {
  const imgRef = useRef(null);

  useEffect(() => {
    const update = () => {
      if (imgRef.current) {
        imgRef.current.style.left = `${body.position.x}px`;
        imgRef.current.style.top = `${body.position.y}px`;
        imgRef.current.style.transform = `rotate(${body.angle}rad)`;
        imgRef.current.style.width = `${body.customSize}px`;
        imgRef.current.style.height = `${body.customSize}px`;
      };
      requestAnimationFrame(update);
    };
    update();
  }, [body]);

  return (
    <img
      ref={imgRef}
      src={ye}
      alt="Bouncing Object"
      style={{
        position: "absolute",
        userSelect: "none",
        pointerEvents: "none",
      }}
    />
  );
};

export default ObjectComponent;
