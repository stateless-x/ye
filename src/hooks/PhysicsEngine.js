import { useEffect, useRef } from "react";
import Matter from "matter-js";
import createGround from "../utils/createGround";

const usePhysicsEngine = () => {
  const engineRef = useRef(null);
  const worldRef = useRef(null);
  const groundRef = useRef(null);

  useEffect(() => {
    // Initialize Matter.js engine
    const engine = Matter.Engine.create();
    const world = engine.world;
    engineRef.current = engine;
    worldRef.current = world;
    engine.gravity.y = 0.25;
    // Create ground
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

  return { worldRef, engineRef, groundRef };
};

export default usePhysicsEngine;
