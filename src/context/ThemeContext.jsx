import { createContext } from "react";
import { useState, useReducer } from "react";

export const ThemeContext = createContext();
const themeReducer = (state, action) => {
  if (action.type === "CHANGE_COLOR") {
    return { ...state, color: action.payload };
  } else if (action.type === "CHANGE_MODE") {
    return { ...state, mode: action.payload };
  } else {
    return state;
  }
};
export const ThemeProvider = ({ children }) => {
  const [state, dispach] = useReducer(themeReducer, {
    color: "#58249c",
    mode: "Dark",
  });
  const changeColor = (color) => {
    dispach({ type: "CHANGE_COLOR", payload: color });
  };
  const changeMode = (mode) => {
    dispach({ type: "CHANGE_MODE", payload: mode });
  };
  return (
    <ThemeContext.Provider value={{ ...state, changeColor, changeMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
