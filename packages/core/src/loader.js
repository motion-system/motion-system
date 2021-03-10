import React from "react";
import { motion } from "framer-motion";

const containerStyle = {
  position: "relative",
  width: "2rem",
  height: "2rem",
  boxSizing: "border-box",
  margin: "auto",
};
const circleStyle = {
  display: "block",
  width: "2rem",
  height: "2rem",
  border: "0.3rem solid #e9e9e9",
  borderTop: "0.3rem solid #3498db",
  borderRadius: "50%",
  position: "absolute",
  boxSizing: "border-box",
  top: 0,
  left: 0,
};
const spinTransition = {
  loop: Infinity,
  ease: "linear",
  duration: 1,
};
export function Loader() {
  return (
    <div style={containerStyle}>
      <motion.span style={circleStyle} animate={{ rotate: 360 }} transition={spinTransition} />
    </div>
  );
}
