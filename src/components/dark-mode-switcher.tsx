import React, { FC } from "react";
import { Moon, Sun } from "react-feather";

import { ThemeContext } from "@/context/theme-context";

const DarkModeSwitcher: FC = () => {
  const { darkMode, setDarkMode } = React.useContext(ThemeContext);
  const handleClick = (): void => {
    setDarkMode(!darkMode);
  };

  return <button onClick={handleClick}>{darkMode ? <Moon /> : <Sun />}</button>;
};

export default DarkModeSwitcher;
