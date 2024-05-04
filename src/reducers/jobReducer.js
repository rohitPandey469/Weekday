import {
  FETCH_JOBS_SUCCESS,
  FETCH_JOBS_FAILURE,
  FETCH_JOBS_BASED_ON_FILTER_SUCCESS,
  FETCH_JOBS_BASED_ON_FILTER_FAILURE,
} from "../actions/actionType/actionType";

const initialState = {
  jobs: [],
  loading: true,
  error: null,
};

const jobReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_JOBS_SUCCESS:
      return {
        ...state,
        jobs: action.payload,
        loading: false,
        error: null,
      };
    case FETCH_JOBS_FAILURE:
      return {
        ...state,
        jobs: [],
        loading: false,
        error: action.payload,
      };
    case FETCH_JOBS_BASED_ON_FILTER_SUCCESS:
      return {
        ...state,
        jobs: action.payload,
        loading: false,
        error: null,
      };
    case FETCH_JOBS_BASED_ON_FILTER_FAILURE:
      return {
        ...state,
        jobs: [],
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default jobReducer;
