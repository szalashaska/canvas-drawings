import { useRef, useEffect, useState, useCallback } from "react";

function CanvasFromFirstTutorial() {
  const canvasRef = useRef(null);
  const ctx = useRef(null);

  const colors = ["red", "green", "blue", "yellow", "black"];
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [mouseDown, setMouseDown] = useState(false);
  const [lastPosition, setLastPosition] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    // when component is ready
    if (canvasRef.current) {
      ctx.current = canvasRef.current.getContext("2d");
    }
  }, []);

  const draw = useCallback(
    (x, y) => {
      if (mouseDown) {
        ctx.current.beginPath();
        ctx.current.strokeStyle = selectedColor;
        ctx.current.lineWidth = 10;
        ctx.current.lineJoin = "round"; // "round", "bevel", and "miter".
        ctx.current.moveTo(lastPosition.x, lastPosition.y);
        ctx.current.lineTo(x, y);
        ctx.current.closePath();
        ctx.current.stroke();

        setLastPosition({ x, y });
      }
    },
    [lastPosition, mouseDown, selectedColor, setLastPosition]
  );

  const clear = () => {
    ctx.current.clearRect(
      0,
      0,
      ctx.current.canvas.width,
      ctx.current.canvas.height
    );
  };

  const download = async () => {
    const image = canvasRef.current.toDataURL("image.png");
    const data = await fetch(image);
    const blob = await data.blob();

    const blobURL = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = blobURL;
    link.download = "image.png";
    link.click();
  };

  const onMouseDown = (e) => {
    setLastPosition({
      x: e.pageX,
      y: e.pageY,
    });
    setMouseDown(true);
  };

  const onMouseUpandLeave = (e) => {
    setMouseDown(false);
  };

  const onMouseMove = (e) => {
    draw(e.pageX, e.pageY);
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        height={400}
        width={400}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUpandLeave}
        onMouseLeave={onMouseUpandLeave}
      />

      <button onClick={clear}>Clear</button>
      <button onClick={download}>Download</button>
      <select
        value={selectedColor}
        onChange={(e) => setSelectedColor(e.target.value)}
      >
        {colors.map((color) => (
          <option key={color} value={color}>
            {color}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CanvasFromFirstTutorial;
