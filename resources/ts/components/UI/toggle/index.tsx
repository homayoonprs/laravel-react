import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import styles from "./Toggle.module.scss";

type TToggleSwitch = {
  label?: string
}
export default function ToggleSwitch({label} : TToggleSwitch) {
  const [isOn, setIsOn] = useState(false);

  const toggleSwitch = () => setIsOn(!isOn);

  return (
    <div className="flex">
      <div className={styles.switch} data-isOn={isOn} onClick={toggleSwitch}>
        <motion.div className={styles.handle} layout transition={spring} whileHover={{scale: 1.2}} />
      </div>
      <label className={styles.label}>{label}</label>
    </div>
  );
}

const spring = {
  type: "spring",
  stiffness: 700,
  damping: 30
};
