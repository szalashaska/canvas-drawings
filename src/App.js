import { useState } from "react";
import Canvas from "./components/Canvas";
import CanvasFromFirstTutorial from "./components/CanvasFromFirstTutorial";

function App() {
  const [showCanvas, setShowCanvas] = useState(true);

  return (
    <div className="App">
      {showCanvas && <Canvas height={500} width={500} />}

      {!showCanvas && <CanvasFromFirstTutorial />}

      <button type="button" onClick={() => setShowCanvas(!showCanvas)}>
        Switch Canvas
      </button>
    </div>
  );
}

export default App;
