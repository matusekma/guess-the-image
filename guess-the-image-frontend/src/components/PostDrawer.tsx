import React, { useEffect, useState } from "react";
import { fabric } from "fabric";

const PostDrawer = () => {
  const [canvas, setCanvas] = useState<fabric.Canvas>();
  const [brushColor, setBrushColor] = useState<string>("#000000");
  const [lineWidth, setLineWidth] = useState<number>(2);
  const [fileName, setFileName] = useState<string>("");

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
    canvas.freeDrawingBrush.width = lineWidth;

    setCanvas(canvas);
  }, []);

  useEffect(() => {
    if (canvas && brushColor && lineWidth) {
      canvas.freeDrawingBrush.color = brushColor;
      canvas.freeDrawingBrush.width = lineWidth;
    }
  }, [brushColor, lineWidth]);

  function downloadImage() {
    const image =
      canvas &&
      canvas.toDataURL({
        format: "png",
        quality: 1,
      });

    const link = document.createElement("a");
    link.setAttribute("download", fileName || "image_" + new Date().getTime());
    link.href = image || "";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div className="container mt-2">
      <div className="row mb-2">
        <div className="col-6">
          <div className="row justify-content-center mb-1">
            <div className="row col-12 col-md-6 mr-md-2 justify-content-center justify-content-md-end align-items-center">
              <b>Szín: </b>
            </div>
            <div className="row col-12 col-md-6 justify-content-center justify-content-md-start">
              <input
                style={{ width: 50, height: 24 }}
                className="input-primary"
                onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setBrushColor(e.target.value)
                }
                value={brushColor}
                name="Color Picker"
                type="color"
              />
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="row col-12 col-md-6 mr-md-2 justify-content-center justify-content-md-end align-items-center">
              <b>Vonalvastagság: </b>
            </div>
            <div className="row col-12 col-md-6 justify-content-center justify-content-md-start">
              <input
                style={{ width: 50, height: 24 }}
                className="input-primary"
                onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setLineWidth(+e.target.value)
                }
                name="Line Width"
                min={1}
                max={10}
                type="number"
                value={lineWidth}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="row justify-content-center  mb-2">
        <canvas id="canvas" />
      </div>
      <div className="row justify-content-center">
        <input
          className="input-primary mr-2"
          placeholder="Fájlnév"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
        />
        <button className="button-primary" onClick={(e) => downloadImage()}>
          Letöltés
        </button>
      </div>
    </div>
  );
};

export default PostDrawer;
