import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Box } from "./Box";



const Cubes = () => {

  const [speedFactor, setSpeedFactor] = useState(1);

  return (
    <div className="flex flex-col items-center box-border w-full h-screen ">
      <div className="p-3">
      <label htmlFor="speedFactor">
        Speed factor:
        <input
          name="speedFactor"
          id="speedFactor"
          type="range"
          value={speedFactor}
          min={1}
          max={10}
          step={0.1}
          onChange={(e) => setSpeedFactor(+e.currentTarget.value)}
        />
      </label>
      </div>
    
      <>
        <Canvas camera={{ position: [0, 0, 10], fov: 45 }} >
          <ambientLight intensity={0.3} color="#FFFFFF" />
          <pointLight intensity={1.0} position={[10, 10, 10]} />
          < Box
            position={[-1, -2, 2]}
            size={[2, 2, 1]}
            rotation={[3, 2, 0]}
            color="hotpink"
            boxSpeed={0.002 * speedFactor}
          />
          <Box
            position={[1, 1, 3]}
            rotation={[1, 1, 0]}
            size={[2, 1, 2]}
            color="cyan"
            boxSpeed={0.005 * speedFactor}
          />
          <Box
            position={[-3, 2, 0]}
            size={[2, 2, 2]}
            boxSpeed={0.005 * speedFactor}
          />
        </Canvas>
        </>
    </div>
  );
};
export default Cubes;