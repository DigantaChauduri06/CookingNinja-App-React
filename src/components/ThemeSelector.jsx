import {} from "react";
import useTheme from "../hooks/useTheme";

import darkMode from "../Assets/dark_mode_black_24dp.svg";
import lightMode from "../Assets/light_mode_black_24dp.svg";

import "./ThemeSelector.css";

const themes = ["#50DBB4", "orange", "#E5D68A", "#120E43"];

export default function ThemeSelector() {
  const { mode, color, changeColor, changeMode } = useTheme();
  const toggleMode = () => {
    changeMode(mode === "Dark" ? "Light" : "Dark");
    console.log(mode);
  };

  return (
    <div className="ThemeSelector">
      <div className="mode">
        {mode === "Dark" ? (
          <img src={lightMode} alt="dark" onClick={toggleMode} />
        ) : (
          <img src={darkMode} alt="dark" onClick={toggleMode} />
        )}
      </div>
      {themes.map((theme) => (
        <div
          key={theme}
          onClick={() => changeColor(theme)}
          style={{ backgroundColor: theme }}
        />
      ))}
    </div>
  );
}
