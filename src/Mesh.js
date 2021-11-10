import React, { useEffect } from 'react';
import * as THREE from 'three';

export default function Mesh({
  geometry,
  position,
  rotation,
  scale,
  activeColor,
}) {
  const [meshColor, setMeshColor] = React.useState('#aaa');
  const [material, setMaterial] = React.useState(null);

  useEffect(() => {
    const materialNew = new THREE.MeshStandardMaterial({
      transparent: true,
    });
    setMaterial(materialNew);
  }, []);

  return (
    material && (
      <group
        position={position && position}
        rotation={rotation && rotation}
        scale={scale && scale}
      >
        <mesh
          onClick={(e) => {
            e.stopPropagation();
            setMeshColor(activeColor.color);
          }}
          material={material}
          material-color={meshColor}
          castShadow
          receiveShadow
          geometry={geometry}
        />
      </group>
    )
  );
}
