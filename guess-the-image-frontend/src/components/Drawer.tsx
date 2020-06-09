import React, { useEffect, useState } from "react";
import { fabric } from "fabric";

const Drawer = () => {
  const [canvas, setCanvas] = useState<fabric.Canvas>();
  const [brushColor, setBrushColor] = useState<string>();
  useEffect(() => {
    const canvas = new fabric.Canvas("canvas", {
      backgroundColor: "rgb(255,255,255)",
      width:
        window.innerWidth > 576
          ? window.innerWidth / 2
          : window.innerWidth - 10,
      height: window.innerHeight / 2,
      selection: false,
      isDrawingMode: true,
      freeDrawingCursor: "default",
    });

    setCanvas(canvas);
  }, []);

  useEffect(() => {
    if (canvas && brushColor) {
      //canvas.freeDrawingBrush = new fabric.PencilBrush();
      canvas.freeDrawingBrush.color = brushColor;
    }
  }, [brushColor]);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <canvas id="canvas" />
        <input
          onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
            setBrushColor(e.target.value)
          }
          name="Color Picker"
          type="color"
        />
      </div>
    </div>
  );
};

export default Drawer;
