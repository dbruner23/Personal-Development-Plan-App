import React, { useRef, useMemo, useState } from 'react';
import { MeshProps, useFrame } from "@react-three/fiber";

type SphereProps = {
    color?: string;
    shereSpeed?: number;
  } & MeshProps;


const Circle = ({ color = '#9f75a4', ...meshProps }: SphereProps) => {
    const sphereRef = useRef<MeshProps | null>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [isSelected, setIsSelected] = useState(false);


    useFrame(() => {
        if (!sphereRef.current) {
            return;
          }
          sphereRef.current.rotation.x += 0.01;
          sphereRef.current.rotation.y += 0.01;
    });

    const calculatedColor = useMemo(() => {
        if (isSelected && isHovered) {
          return 'orange';
        }
        if (isSelected) {
          return 'yellow';
        }
        if (isHovered && !isSelected) {
          return '#cd2eab';
        }
        return color;
      }, [color, isHovered, isSelected]);

  return (
    <>
        <mesh 
        {...meshProps}
        ref={sphereRef} 
        position={[2.2, -2.1, 0]}
        onPointerOver={() => setIsHovered(true)}
        onPointerLeave={() => setIsHovered(false)}
        onClick={() => setIsSelected((prev) => !prev)}
        scale={isSelected ? [1.2, 1.2, 1.2] : [1, 1, 1]}>

        <sphereGeometry
        attach="geometry"
        args={[1.3, 22, 50]} // Width, Height and Depth of the sphere
        smoothness={6} 
      />
<meshPhongMaterial
        color={calculatedColor}
        attach="material"
        transparent
        roughness={0.1}
        metalness={0.1}
      />
    </mesh>
    </>
  )
}

export default Circle

