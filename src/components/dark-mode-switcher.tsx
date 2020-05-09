import React, { FC } from "react";
import { Moon, Sun } from "react-feather";

const LIGHTS_OUT = "lights-out";

const initialDarkMode = (): boolean =>
  window.localStorage.getItem(LIGHTS_OUT) === "true";

const DarkModeSwitcher: FC = () => {
  const [darkMode, setDarkMode] = React.useState(initialDarkMode());
  const handleClick = (): void => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.documentElement.toggleAttribute(LIGHTS_OUT, newMode);
    window.localStorage.setItem(LIGHTS_OUT, newMode ? "true" : "false");
  };

  return <button onClick={handleClick}>{darkMode ? <Moon /> : <Sun />}</button>;
};

export default DarkModeSwitcher;
