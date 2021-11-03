export const SET_USER_DATA = "SET_USER_DATA";
export const SET_COURSES = "SET_COURSES";
export const SET_ENROLLED_COURSES = "SET_ENROLLED_COURSES";
export const REMOVE_COURSE = "REMOVE_COURSE";
export const SET_ROLE = "SET_ROLE";

function reducer(state, action) {
  switch (action.type) {
    case SET_USER_DATA: {
      return {
        ...state,
        user: action.payload,
      };
    }
    case SET_COURSES: {
      return { ...state, courses: action.payload || [] };
    }

    case SET_ENROLLED_COURSES: {
      return { ...state, enrolledCourses: action.payload || [] };
    }

    case REMOVE_COURSE: {
      return {
        ...state,
        courses: state.courses.filter((c) => c.id !== action.payload),
      };
    }

    case SET_ROLE: {
      return { ...state, role: action.payload };
    }

    default:
      return state;
  }
}

export default reducer;

export const setUserData = (payload) => ({
  type: SET_USER_DATA,
  payload,
});

export const setCourses = (payload) => ({
  type: SET_COURSES,
  payload,
});

export const setEnrolledCourses = (payload) => ({
  type: SET_ENROLLED_COURSES,
  payload,
});

export const setRole = (payload) => ({
  type: SET_ROLE,
  payload,
});

export const removeCourse = (payload) => ({
  type: REMOVE_COURSE,
  payload,
});
