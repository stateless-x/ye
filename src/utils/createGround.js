import Matter from "matter-js";

const createGround = () => {
  return Matter.Bodies.rectangle(
    window.innerWidth / 2, // Center the ground
    window.innerHeight - 10, // Position at the bottom
    window.innerWidth, // Full width
    20, // Ground thickness
    { isStatic: true }
  );
};

export default createGround;
