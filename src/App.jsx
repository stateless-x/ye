/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import usePhysicsEngine from "./hooks/PhysicsEngine";
import spawnObjects from "./utils/spawnObjects";
import ObjectComponent from "./components/ObjectComponent";
import { Button } from "./components/Button";
import poopitypoop from "./assets/poopitypoop.mp3";
import playMusic from "./utils/playMusic";

const App = () => {
  const [showObjects, setShowObjects] = useState(false);
  const { worldRef } = usePhysicsEngine();
  const bodiesRef = useRef([]);
  const [clicked, setClicked] = useState(false);
  const audioRef = useRef(new Audio(poopitypoop));
  
  const title = "YE";
  const buttonName = "DO NOT CLICK";

  useEffect(() => {
    audioRef.current.load();
    audioRef.current.loop = false;
  }, []);

  const handleClick = () => {
    setClicked(true);
    playMusic(audioRef);
    setTimeout(() => {
      spawnObjects(worldRef, bodiesRef, setShowObjects);
    }, 1500);
  };

  return (
    <div className="w-screen h-screen relative overflow-hidden">
      <div className="text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[60%] flex flex-col items-center">
        <h1 className="text-[128px] font-mea">{title}</h1>
        <Button onClick={() => !clicked && handleClick()}>{buttonName}</Button>
      </div>

      {showObjects &&
        bodiesRef.current.map((body, index) => (
          <ObjectComponent key={index} body={body} />
        ))}
      <footer className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm opacity-80">
        Built by
        <a
          href="https://github.com/stateless-x"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:underline ml-1"
        >
          @stateless-x
        </a>
      </footer>
    </div>
  );
};

export default App;
