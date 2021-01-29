import { createStore } from "redux";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const initialState = {
  user: null,
  tutor: null,
  profile: null,
  userLoggedIn: null,
  hasProfile: false,
  categories: {},
  questions: [],
  singleQuestion: {},
  filteredQuestions: [],
  comments: [],
  updated: "",
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
        userLoggedIn: true,
      };
    case "REGISTER":
      return {
        ...state,
        user: action.payload,
        userLoggedIn: true,
      };
    case "USER_PROFILE":
      return {
        ...state,
        profile: action.payload,
      };
    case "CREATED_PROFILE":
      return {
        ...state,
        profile: action.payload,
        hasProfile: true,
      };
    case "GET_CATEGORIES":
      return {
        ...state,
        categories: action.payload,
      };
    case "GET_QUESTIONS":
      return {
        ...state,
        questions: action.payload.sort((a, b) => b.createdAt - a.createdAt),
        filteredQuestions: action.payload.sort(
          (a, b) => b.createdAt - a.createdAt
        ),
      };
    case "POSTED_QUESTION":
      return {
        ...state,
        singleQuestion: action.payload,
        questions: [action.payload, ...state.questions].sort(
          (a, b) => b.createdAt - a.createdAt
        ),
        filteredQuestions: [action.payload, ...state.filteredQuestions].sort(
          (a, b) => b.createdAt - a.createdAt
        ),
        singleQuestion: {},
      };
    case "DELETE_QUESTION":
      return {
        ...state,
        filteredQuestions: [
          ...state.filteredQuestions.slice(0, action.payload),
          ...state.filteredQuestions.slice(action.payload + 1),
        ],
        questions: [
          ...state.questions.slice(0, action.payload),
          ...state.questions.slice(action.payload + 1),
        ],
      };
    case "FILTER_QUESTIONS":
      return {
        ...state,
        questions:
          action.payload == "Сите"
            ? state.filteredQuestions
            : state.filteredQuestions.filter((question) =>
                question.questionCategory.includes(action.payload)
              ),
      };
    case "GET_COMMENTS":
      return {
        ...state,
        comments: action.payload.sort((a, b) => b.createdAt - a.createdAt),
      };
    case "POST_COMMENT":
      return {
        ...state,
        comments: state.comments
          .concat(action.payload)
          .sort((a, b) => b.createdAt - a.createdAt),
      };
    case "LOGOUT": {
      return {
        ...state,
        user: null,
        tutor: null,
        profile: null,
        userLoggedIn: null,
        questions: [],
      };
    }
    default:
      return state;
  }
}

//persist
const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducer);

//actions

export const logout = () => ({
  type: "LOGOUT",
});
export const getQuestions = (questions) => ({
  type: "GET_QUESTIONS",
  paylaod: { questions },
});
export const postQuestions = (question) => ({
  type: "POSTED_QUESTION",
  payload: { question },
});

export const getComments = (comments) => ({
  type: "GET_COMMENTS",
  payload: comments,
});
export const postComment = (comment) => ({
  type: "POST_COMMENT",
  payload: { comment },
});
export const deleteQuestion = (questionId) => ({
  type: "DELETE_QUESTION",
  payload: questionId,
});
export const filterQuestions = (filterValue) => ({
  type: "FILTER_QUESTIONS",
  payload: filterValue,
});
export const getCategories = (categories) => ({
  type: "GET_CATEGORIES",
  payload: { categories },
});

export const createdProfile = () => ({
  type: "CREATED_PROFILE",
});

export const userProfile = (profile) => ({
  type: "USER_PROFILE",
  payload: { profile },
});

export const loginAction = (user) => ({
  type: "LOGIN",
  payload: { user },
});

export const registerAction = (user) => ({
  type: "REGISTER",
  payload: { user },
});

export default () => {
  let store = createStore(
    persistedReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  let persistor = persistStore(store);
  return { store, persistor };
};
