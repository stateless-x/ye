import Matter from "matter-js";

const spawnObjects = (worldRef, bodiesRef, setShowObjects) => {
  setShowObjects(true);

  const newBodies = Array.from({ length: 250 }).map(() => {
    const size = Math.floor(Math.random() * 101) + 25; // Random size (25x25 to 125x125)

    const object = Matter.Bodies.rectangle(
      Math.random() * window.innerWidth, // Spread object across screen width
      Math.random() * -500, // Random starting height
      size,
      size,
      {
        restitution: 0.7, // Bounce effect
        friction: 0.5,
        angle: Math.random() * Math.PI, // Random rotation
      }
    );

    Matter.Body.setAngularVelocity(object, (Math.random() - 0.5) * 0.2); // Apply random spin
    object.customSize = size; // Store size in object

    return object;
  });

  bodiesRef.current = newBodies;
  Matter.World.add(worldRef.current, newBodies);
};

export default spawnObjects;
