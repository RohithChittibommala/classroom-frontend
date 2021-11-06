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

  // useEffect(() => {
  //   getUserData();
  // }, []);

  // const getUserData = async () => {
  //   const { data } = await api.getUserData();
  //   if (data.user.isAdmin) {
  //     dispatch(setRole("admin"));
  //   } else if (data.user.isInstructor) {
  //     dispatch(setRole("instructor"));
  //   } else {
  //     dispatch(setRole("student"));
  //   }
  //   dispatch(setUserData(data));
  // };

  // if (!state.user) {
  //   return (
  //     <CenterContainer>
  //       <CircularProgress />
  //     </CenterContainer>
  //   );
  // }

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
