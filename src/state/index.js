import React, { createContext, useReducer, useContext } from "react";
import reducer from "./reducer";

export const AppContext = createContext();

const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    user: null,
    courses: [],
    enrolledCourses: [],
    role: null,
  });

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export default ContextProvider;

export function useAppState() {
  const { state, dispatch } = useContext(AppContext);
  return { state, dispatch };
}
