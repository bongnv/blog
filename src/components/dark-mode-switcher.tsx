import React, { FC } from "react";
import { Moon, Sun } from "react-feather";

const LIGHTS_OUT = "lights-out";

const DarkModeSwitcher: FC = () => {
  const [darkMode, setDarkMode] = React.useState(false);
  const handleClick = (): void => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.documentElement.toggleAttribute(LIGHTS_OUT, newMode);
    window.localStorage.setItem(LIGHTS_OUT, newMode ? "true" : "false");
  };

  React.useEffect(() => {
    const isDarkMode = document.documentElement.hasAttribute(LIGHTS_OUT);
    setDarkMode(isDarkMode);
  }, []);

  return <button onClick={handleClick}>{darkMode ? <Moon /> : <Sun />}</button>;
};

export default DarkModeSwitcher;
