import React from 'react';
import { modelParts } from './modelParts';
import ModelLoader from './ModelLoader';
import { paints } from './paints';
function App() {
  const [activeColor, setActiveColor] = React.useState(null);
  const [modelPart, setModelPart] = React.useState({ head: null });
  const [sprayMode, setSprayMode] = React.useState(false);
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          height: '100vh',
          overflow: 'auto',
          width: 40,
        }}
      >
        {paints.map((item) => (
          <div
            style={{ background: item.color, width: '50%' }}
            onClick={() => setActiveColor(item)}
          ></div>
        ))}
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'wrap',
          height: '100vh',
          overflow: 'auto',
          width: 40,
        }}
      >
        <div
          style={{ background: 'grey' }}
          onClick={() =>
            setModelPart({
              ...modelPart,
              head: {
                model: './models/helmet/scene.gltf',
                rotation: [0, 0, 0],
              },
            })
          }
        >
          Helmet
        </div>
        <div
          style={{ background: 'grey' }}
          onClick={() =>
            setModelPart({
              ...modelPart,
              head: {
                model: './models/swarm/scene.gltf',
                rotation: [-Math.PI / 2, Math.PI / 2, -Math.PI / 2],
              },
            })
          }
        >
          Swarm
        </div>
        <div
          style={{ background: 'grey' }}
          onClick={() =>
            setModelPart({
              ...modelPart,
              head: {
                model: './models/rocket/scene.gltf',
                rotation: [0, 0, 0],
              },
            })
          }
        >
          Rocket
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <button
          onClick={() => (sprayMode ? setSprayMode(false) : setSprayMode(true))}
          style={{ background: sprayMode ? 'green' : '#222', border: 'none' }}
        >
          S
        </button>
      </div>
      {modelPart.head && (
        <ModelLoader
          activeColor={activeColor}
          sprayMode={sprayMode}
          gltfIn={modelPart.head}
        />
      )}
    </div>
  );
}

export default App;
