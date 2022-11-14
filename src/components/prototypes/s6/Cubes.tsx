import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Box } from "./Box";
import CubesModal1 from "./CubesModal1";
import CubesModal2 from "./CubesModal2";
import CubesModal3 from "./CubesModal3";
import Circle from "./Circle";
import SphereModal1 from "./SphereModal1";




const Cubes = () => {

  const [speedFactor, setSpeedFactor] = useState(1);

  return (
    <div className="flex flex-col items-center box-border w-full h-screen ">

      <>
      <div className="relative">
      <div className="absolute top-24 pb-24 right-14 z-20">
      <CubesModal1 />
      </div>
      </div>

      <div className="relative">
      <div className="absolute top-24 pt-24 pl-20 left-24 z-20">
      <CubesModal2/>
      </div>
      </div>

      <div className="relative">
      <div className="absolute top-64 pt-64 right-14 z-20">
      <CubesModal3 />
      </div>
      </div>

      <div className="absolute bottom-24 pb-44 right-1/4 z-20">
      <SphereModal1 />
      </div>

        <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
          <ambientLight intensity={0.3} color="#ffffff" />
          <pointLight intensity={1.0} position={[10, 10, 10]} />
          < Box
            position={[-1.2, -1.5, 2]}
            size={[2, 2, 1]}
            rotation={[3, 2, 0]}
            color="#26bb7a"
            boxSpeed={0.002 * speedFactor}
            ></Box>

          <Box
            position={[1.9, 0.7, 3]}
            rotation={[1, 1, 0]}
            size={[2, 1, 2]}
            color="#25a596"
            boxSpeed={0.005 * speedFactor}
          /> 
          <Box
            position={[-1.5, 2, 0]}
            size={[2, 2, 2]}
            boxSpeed={0.005 * speedFactor}
          />
          <Circle/>
        </Canvas>
        </>
        <div className="p-6 text-white">
      <label htmlFor="speedFactor">
        Rotation speed 
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
    </div>
  );
};
export default Cubes;