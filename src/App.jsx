/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import ObjectComponent from "./components/ObjectComponent";


const App = () => {
  const [bodies, setBodies] = useState([]); // Store physics bodies
  const [showObjects, setShowObjects] = useState(false); // Track button click
  const engineRef = useRef(null);
  const worldRef = useRef(null);
  const groundRef = useRef(null);

  useEffect(() => {
    const engine = Matter.Engine.create();
    const world = engine.world;
    engineRef.current = engine;
    worldRef.current = world;

    // Function to create/update ground
    const createGround = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      return Matter.Bodies.rectangle(
        width / 2,
        height - 10,
        width,
        20,
        { isStatic: true }
      );
    };

    // Create ground covering full width
    let ground = createGround();
    groundRef.current = ground;
    Matter.World.add(world, ground);

    // Start physics engine
    const update = () => {
      Matter.Engine.update(engine);
      requestAnimationFrame(update);
    };
    update();

    // Update ground when window resizes
    const handleResize = () => {
      Matter.World.remove(world, groundRef.current);
      let newGround = createGround();
      groundRef.current = newGround;
      Matter.World.add(world, newGround);
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

    // Create 250 PNG objects with full screen width spread
    const objects = Array.from({ length: 250 }).map(() => {
      return Matter.Bodies.rectangle(
        Math.random() * window.innerWidth, // Spread across screen width
        Math.random() * -500, // Random starting height above screen
        80, // Width
        80, // Height
        {
          restitution: 0.7,
          friction: 0.5,
        }
      );
    });

    setBodies([...objects]);
    Matter.World.add(worldRef.current, objects);
  };

  return (
    <div className="w-screen h-screen relative border-2 border-black overflow-hidden">
      <div className="text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[60%] flex flex-col items-center">
        <span className="text-[128px] font-mea">YE</span>
        <button
          onClick={spawnObjects}
          className="bg-transparen border border-white px-4 py-2 mt-4 rounded-3xl shadow-md hover:bg-white hover:text-[#242424] hover:scale-110 transition delay-150 duration-150 ease-in-out"
        >
          Click to YE!
        </button>
      </div>
      {showObjects && bodies.map((body, index) => (
        <ObjectComponent key={index} body={body} />
      ))}
    </div>
  );
};

export default App;
