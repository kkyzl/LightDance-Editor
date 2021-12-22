import React, { useState, useEffect, useRef } from "react";
// redux
import { useSelector } from "react-redux";
// actions
import { selectGlobal } from "../../slices/globalSlice";
// useSelector

import ThreeController from "./ThreeController";

/**
 * This is Display component
 *
 * @component
 */

export default function ThreeSimulator() {
  const canvasRef = useRef();
  const containerRef = useRef();

  const [threeController, setThreeController] = useState(null);
  const [edit, setEdit] = useState(null);

  const { currentStatus, currentPos, isPlaying } = useSelector(selectGlobal);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const newThreeController = new ThreeController(canvas, container);
    newThreeController.init();
    setThreeController(newThreeController);
  }, []);

  useEffect(() => {
    if (threeController) {
      if (isPlaying) {
        threeController.fetch();
        threeController.play();
      } else {
        threeController.stop();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (threeController && threeController.initialized()) {
      threeController.fetchCurrent();
      threeController.updateDancers();
      threeController.render();
    }
  }, [threeController, currentStatus]);

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      ref={containerRef}
    >
      <div ref={canvasRef} />
    </div>
  );
}