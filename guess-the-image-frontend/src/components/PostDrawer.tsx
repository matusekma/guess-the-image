import React, { useEffect, useState } from "react";
import { fabric } from "fabric";
import { CompactPicker } from "react-color";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEraser,
  faUndo,
  faRedo,
  faPen,
} from "@fortawesome/free-solid-svg-icons";

enum Mode {
  drawing,
  erasing,
}

function getEraser(size: number) {
  return `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" style="background-color: %23d2dee8"></svg>') ${
    size / 2
  } ${size / 2}, auto`;
}

const pen = "crosshair";

const PostDrawer = () => {
  const [canvas, setCanvas] = useState<fabric.Canvas>();
  const [canvasHistory, setCanvasHistory] = useState<fabric.Object[]>([]);
  const [isRedoing, setIsRedoing] = useState(false);

  const [brushColor, setBrushColor] = useState<string>("#000000");
  const [mode, setMode] = useState(Mode.drawing);
  const [lineWidth, setLineWidth] = useState<number>(2);
  const [fileName, setFileName] = useState<string>("");

  function setDrawMode(mode: Mode) {
    setMode(mode);
    if (mode === Mode.erasing && canvas) {
      setBrushColor("#ffffff");
      canvas.freeDrawingCursor = getEraser(lineWidth);
    } else if (mode === Mode.drawing && canvas) {
      setBrushColor("#000000");
      canvas.freeDrawingCursor = pen;
    }
  }

  function setWidth(width: number) {
    setLineWidth(width);
    if (mode === Mode.erasing && canvas) {
      setLineWidth(width * 2);
      canvas.freeDrawingCursor = getEraser(width * 2);
    } else if (mode === Mode.drawing && canvas) {
      canvas.freeDrawingCursor = pen;
    }
  }

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
      freeDrawingCursor: pen,
    });
    canvas.freeDrawingBrush.width = lineWidth;
    canvas.on("object:added", function () {
      if (!isRedoing) {
        setCanvasHistory([]);
      }
      setIsRedoing(false);
    });
    setCanvas(canvas);
  }, []);

  function undo() {
    if (canvas && canvas._objects && canvas._objects.length > 0) {
      setCanvasHistory([
        ...canvasHistory,
        canvas._objects[canvas._objects.length - 1],
      ]);
      canvas._objects.pop();
      canvas.renderAll();
    }
  }

  function redo() {
    const historyLength = canvasHistory.length;
    if (canvas && historyLength > 0) {
      setIsRedoing(true);
      canvas.add(canvasHistory[historyLength - 1]);
      setCanvasHistory(canvasHistory.slice(0, historyLength - 1));
    }
  }

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
    <div className="drawer-wrapper container mt-4">
      <div className="row justify-content-center align-items-center mb-md-4">
        <div className="mr-2 mr-md-5 d-flex d-md-block flex-column align-items-center justify-content-center">
          <FontAwesomeIcon
            className="icon mb-2 mb-md-0 mr-md-2"
            onClick={undo}
            icon={faUndo}
          />

          <FontAwesomeIcon className="icon" onClick={redo} icon={faRedo} />
        </div>

        <CompactPicker
          colors={pickerColors}
          color={brushColor}
          onChangeComplete={(color) => {
            setDrawMode(Mode.drawing);
            setBrushColor(color.hex);
          }}
        />

        <div className="ml-2 ml-md-5 d-flex flex-column flex-md-row align-items-center justify-content-center">
          <div
            id="line-width-1"
            className={`line-width my-2 my-md-0 mr-md-2 ${
              lineWidth === 2 || lineWidth == 4 ? "active" : ""
            }`}
            style={{ backgroundColor: brushColor }}
            onClick={() => setWidth(2)}
          ></div>
          <div
            id="line-width-2"
            className={`line-width mb-2 mb-md-0 mr-md-2 ${
              lineWidth === 6 || lineWidth == 12 ? "active" : ""
            }`}
            style={{ backgroundColor: brushColor }}
            onClick={() => setWidth(6)}
          ></div>
          <div
            id="line-width-3"
            className={`line-width mb-2 mb-md-0 ${
              lineWidth === 10 || lineWidth == 20 ? "active" : ""
            }`}
            style={{ backgroundColor: brushColor }}
            onClick={() => setWidth(10)}
          ></div>
        </div>
      </div>

      <div className="row justify-content-center mb-2">
        <div className="mb-2 mb-md-0 d-flex flex-row flex-md-column align-items-center justify-content-center justify-content-md-start">
          <FontAwesomeIcon
            onClick={() => setDrawMode(Mode.drawing)}
            icon={faPen}
            className={`icon mode ${
              mode === Mode.drawing ? "active" : ""
            } mr-2`}
          />
          <FontAwesomeIcon
            onClick={() => setDrawMode(Mode.erasing)}
            icon={faEraser}
            className={`icon mode ${
              mode === Mode.erasing ? "active" : ""
            } mr-md-2`}
          />
        </div>

        <div
          className={`canvas-wrapper ${
            mode === Mode.erasing ? "erasing" : "drawing"
          }`}
        >
          <canvas id="canvas" />
        </div>
      </div>

      <div className="row justify-content-center">
        <input
          className="input-primary mr-2 mb-2 mb-sm-0"
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

const pickerColors = [
  "#4D4D4D",
  "#999999",
  "#D2DEE8",
  "#F44E3B",
  "#FE9200",
  "#FCDC00",
  "#DBDF00",
  "#A4DD00",
  "#68CCCA",
  "#73D8FF",
  "#AEA1FF",
  "#FDA1FF",
  "#333333",
  "#808080",
  "#cccccc",
  "#D33115",
  "#E27300",
  "#FCC400",
  "#B0BC00",
  "#68BC00",
  "#16A5A5",
  "#009CE0",
  "#7B64FF",
  "#FA28FF",
  "#000000",
  "#666666",
  "#B3B3B3",
  "#9F0500",
  "#C45100",
  "#FB9E00",
  "#808900",
  "#194D33",
  "#0C797D",
  "#0062B1",
  "#653294",
  "#AB149E",
];
