/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import ObjectComponent from "./components/ObjectComponent";

const App = () => {
  const [showObjects, setShowObjects] = useState(false); 
  const engineRef = useRef(null);
  const worldRef = useRef(null);
  const groundRef = useRef(null);
  const bodiesRef = useRef([]);

  useEffect(() => {
    const engine = Matter.Engine.create();
    const world = engine.world;
    engineRef.current = engine;
    worldRef.current = world;

    // Function to create ground
    const createGround = () => {
      return Matter.Bodies.rectangle(
        window.innerWidth / 2, // Center the ground
        window.innerHeight - 10, // Position at the bottom
        window.innerWidth, // Full width
        20, // Ground thickness
        { isStatic: true }
      );
    };

    // Create and add ground
    groundRef.current = createGround();
    Matter.World.add(world, groundRef.current);

    // Start physics engine loop
    const update = () => {
      Matter.Engine.update(engine);
      requestAnimationFrame(update);
    };
    update();

    // Handle window resize
    const handleResize = () => {
      Matter.World.remove(world, groundRef.current);
      groundRef.current = createGround();
      Matter.World.add(world, groundRef.current);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      Matter.World.clear(world);
      Matter.Engine.clear(engine);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Function to spawn objects when button is clicked
  const spawnObjects = () => {
    if (showObjects) return; // Prevent duplicate spawning
    setShowObjects(true);

    const newBodies = Array.from({ length: 250 }).map(() => {
      const size = Math.floor(Math.random() * 101) + 25; // Random size (25 to 125)

      const object = Matter.Bodies.rectangle(
        Math.random() * window.innerWidth, // Spread across screen width
        Math.random() * -500, // Random starting height
        size, // Width & Height
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

  return (
    <div className="w-screen h-screen relative border-2 border-black overflow-hidden">
      <div className="text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[60%] flex flex-col items-center">
        <span className="text-[128px] font-mea">YE</span>
        <button
          onClick={spawnObjects}
          className="bg-transparent border border-white px-4 py-2 mt-4 rounded-3xl shadow-md 
                    hover:bg-white hover:text-[#242424] hover:scale-110 
                    transition delay-150 duration-150 ease-in-out"
        >
          DO NOT CLICK
        </button>
      </div>

      {showObjects && bodiesRef.current.map((body, index) => (
        <ObjectComponent key={index} body={body} />
      ))}
    </div>
  );
};

export default App;
