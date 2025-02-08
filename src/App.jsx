/* eslint-disable react/prop-types */
import { useState, useRef } from "react";
import usePhysicsEngine from "./hooks/PhysicsEngine";
import spawnObjects from "./utils/spawnObjects";
import ObjectComponent from "./components/ObjectComponent";
import { Button } from "./components/Button";

const App = () => {
  const [showObjects, setShowObjects] = useState(false);
  const { worldRef } = usePhysicsEngine();
  const bodiesRef = useRef([]);
  const title = "YE";
  const buttonName = "DO NOT CLICK";
  return (
    <div className="w-screen h-screen relative overflow-hidden">
      <div className="text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[60%] flex flex-col items-center">
        <h1 className="text-[128px] font-mea">{title}</h1>
        <Button onClick={() => spawnObjects(worldRef, bodiesRef, setShowObjects)}>
          {buttonName}
        </Button>
      </div>

      {showObjects && bodiesRef.current.map((body, index) => (
        <ObjectComponent key={index} body={body} />
      ))}
    </div>
  );
};

export default App;
