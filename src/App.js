import React from 'react';
import { modelParts } from './modelParts';
import ModelLoader from './ModelLoader';
import { paints } from './paints';
function App() {
  const [activeColor, setActiveColor] = React.useState(null);
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
      <ModelLoader activeColor={activeColor} />
    </div>
  );
}

export default App;
