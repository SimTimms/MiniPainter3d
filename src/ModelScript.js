import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import Mesh from './Mesh';

export default function ModelScript({ gltfIn, activeColor }) {
  const group = useRef();
  const { nodes } = useGLTF('models/scene.gltf');

  const rNbr = (number) => {
    return parseFloat(number.toFixed(Math.round(2)));
  };
  const rDeg = (number) => {
    const abs = Math.abs(Math.round(parseFloat(number) * 100000));
    for (let i = 1; i <= 10; i++) {
      if (abs === Math.round(parseFloat(Math.PI / i) * 100000))
        return Math.PI / 2;
    }
    return rNbr(number);
  };
  const existsArray = [];
  function node(nodeArr) {
    let nodeMap = [];

    if (nodeArr) {
      for (let i = 0; i < nodeArr.length; i++) {
        const item = nodeArr[i];
        let scale = null;
        if (
          item.scale &&
          item.scale.isVector3 &&
          !(
            rNbr(item.scale.x) === 1 &&
            rNbr(item.scale.y) === 1 &&
            rNbr(item.scale.z) === 1
          )
        ) {
          if (item.scale.x === item.scale.y && item.scale.x === item.scale.z) {
            scale = rNbr(item.scale.x);
          } else {
            scale = [
              rNbr(item.scale.x),
              rNbr(item.scale.y),
              rNbr(item.scale.z),
            ];
          }
        }

        const nodeChildArr = Object.values(item.children);
        const exists = existsArray.indexOf(item.name);
        if (exists === -1) {
          existsArray.push(item.name);
          if (item.geometry && item.visible) {
            nodeMap.push(
              <Mesh
                activeColor={activeColor}
                geometry={item.geometry}
                scale={item.scale}
                position={[
                  rNbr(item.position.x),
                  rNbr(item.position.y),
                  rNbr(item.position.z),
                ]}
                rotation={[
                  rDeg(item.rotation.x),
                  rDeg(item.rotation.y),
                  rDeg(item.rotation.z),
                ]}
              >
                {node(nodeChildArr, nodes)}
              </Mesh>
            );
          }
          if (item.type === 'Object3D') {
            nodeMap.push(
              <group
                position={[
                  rNbr(item.position.x),
                  rNbr(item.position.y),
                  rNbr(item.position.z),
                ]}
                scale={item.scale}
                rotation={[
                  rDeg(item.rotation.x),
                  rDeg(item.rotation.y),
                  rDeg(item.rotation.z),
                ]}
              >
                {node(nodeChildArr, nodes)}
              </group>
            );
          }
        }
      }
    }
    return nodeMap.filter((item) => item !== null);
  }
  const nodeArr = Object.values(nodes);

  return (
    <group ref={group} dispose={null}>
      {node(nodeArr, nodes)}
    </group>
  );
}
