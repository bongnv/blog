import React, { FC } from "react";
import { Moon, Sun } from "react-feather";

const LIGHTS_OUT = "lights-out";

const DarkModeSwitcher: FC = () => {
  const handleClick = (): void => {
    document.documentElement.toggleAttribute(LIGHTS_OUT);
  };

  return (
    <button
      className="focus:outline-none"
      onClick={handleClick}
      aria-label="Dark Mode"
    >
      <Moon className="moon" />
      <Sun className="sun" />
    </button>
  );
};

export default DarkModeSwitcher;
