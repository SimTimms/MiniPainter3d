import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Mesh({
  geometry,
  position,
  rotation,
  scale,
  activeColor,
  sprayMode,
  materialIn,
}) {
  const [meshColor, setMeshColor] = React.useState('#aaa');
  const [material, setMaterial] = React.useState(null);
  const [paintMode, setPaintMode] = React.useState(0);

  useEffect(() => {
    const materialNew = new THREE.MeshStandardMaterial(materialIn);
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
          onPointerEnter={(e) => {
            if (sprayMode && meshColor !== activeColor.color) {
              setMeshColor(activeColor.color);
            }
          }}
          onPointerDown={(e) => paintMode !== 1 && setPaintMode(1)}
          onPointerUp={(e) => {
            e.stopPropagation();
            paintMode && setMeshColor(activeColor.color);
          }}
          onPointerMove={(e) => paintMode !== 0 && setPaintMode(0)}
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
