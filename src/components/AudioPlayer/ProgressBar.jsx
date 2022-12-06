import { useRef, useState } from "react";

const ProgressBar = ({
  onChange,
  progressBarPosition = 0,
  bufferBarPosition = 0,
}) => {
  const parentBar = useRef(0);
  const progressBar = useRef(null);
  const bufferBar = useRef(null);
  const isDraggingProgress = useRef(0);
  const [, setFirst] = useState(true);

  const handleWindowMouseMove = (event) => {
    if (isDraggingProgress.current) {
      const getBounding = progressBar.current.getBoundingClientRect();
      const parentWidth = parentBar.current.clientWidth;
      const eventWidth = event.clientX - getBounding.left;
      if (parentWidth > eventWidth && eventWidth > 0) {
        onChange(Math.round((eventWidth * 100) / parentWidth));
      }
    }
  };

  const perTopx = (per) => {
    return (600 * per) / 100;
  };

  const handleProgressBarOnClick = (event) => {
    if (parentBar.current.clientWidth >= event.nativeEvent.offsetX) {
      onChange(
        Math.round(
          (event.nativeEvent.offsetX * 100) / parentBar.current.clientWidth
        )
      );
    }
  };

  const handleWindowMouseUp = () => {
    setFirst(false);
    isDraggingProgress.current = false;
    window.onmousemove = function () {};
  };

  const startProgressBar = (event) => {
    setFirst(true);
    isDraggingProgress.current = true;
    if (event.nativeEvent instanceof MouseEvent) {
      window.addEventListener("mousemove", handleWindowMouseMove);
      window.addEventListener("mouseup", handleWindowMouseUp);
    }
  };

  return (
    <div>
      <div
        ref={parentBar}
        onClick={handleProgressBarOnClick}
        style={{
          width: "100%",
          height: "5px",
          backgroundColor: "#c4b9a7",
          cursor: "pointer",
          borderRadius: "10px",
        }}
      >
        <div
          ref={progressBar}
          onMouseDown={startProgressBar}
          style={{
            position: "absolute",
            width: perTopx(progressBarPosition) + "px",
            height: "5px",
            backgroundColor: "#ff0000",
            zIndex: 1,
            borderRadius: "10px",
          }}
        >
          <div
            style={{
              left: perTopx(progressBarPosition) - 5,
              position: "absolute",
              backgroundColor: "green",
              cursor: "pointer",
              zIndex: 1,
              width: "10px",
              height: "10px",
              borderRadius: "11px",
              top: "-2px",
            }}
          ></div>
        </div>

        <div
          ref={bufferBar}
          style={{
            position: "absolute",
            width: perTopx(bufferBarPosition) + "px",
            height: "5px",
            backgroundColor: "#535356",
            borderRadius: "10px",
          }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
