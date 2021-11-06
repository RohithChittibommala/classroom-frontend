import { styled } from "@mui/system";
import React, { createContext, useReducer, useContext, useEffect } from "react";
import api from "../network";
import { CircularProgress } from "@mui/material";
import reducer, { setLoadingFalse, setRole, setUserData } from "./reducer";

export const AppContext = createContext();

const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    user: null,
    courses: [],
    enrolledCourses: [],
    role: null,
    isLoading: true,
  });

  useEffect(() => {
    api
      .getUserData()
      .then(({ data }) => {
        dispatch(setUserData(data.user));
        if (data.user.isAdmin) {
          dispatch(setRole("admin"));
        } else if (data.user.isInstructor) {
          dispatch(setRole("instructor"));
        } else dispatch(setRole("student"));
      })
      .finally(dispatch(setLoadingFalse()));
  }, []);

  if (state.isLoading)
    return (
      <CenterContainer>
        <CircularProgress />
      </CenterContainer>
    );

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

const CenterContainer = styled("div")`
  display: flex;
  justify-content: center;
  height: 60vh;
  align-items: center;
`;
