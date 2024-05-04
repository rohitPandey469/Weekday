import {
  FETCH_JOBS_SUCCESS,
  FETCH_JOBS_FAILURE,
  FETCH_JOBS_BASED_ON_FILTER_SUCCESS,
  FETCH_JOBS_BASED_ON_FILTER_FAILURE,
} from "../actions/actionType/actionType";

const initialState = {
  jobs: [],
  totalCount: 0,
  loading: true,
  error: null,
};

const jobReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_JOBS_SUCCESS:
      return {
        ...state,
        jobs: action.payload.jobs,
        totalCount: action.payload.totalCount,
        loading: false,
        error: null,
      };
    case FETCH_JOBS_FAILURE:
      return {
        ...state,
        jobs: [],
        totalCount: 0,
        loading: false,
        error: action.payload,
      };
    case FETCH_JOBS_BASED_ON_FILTER_SUCCESS:
      return {
        ...state,
        jobs: action.payload.jobs,
        totalCount: action.payload.totalCount,
        loading: false,
        error: null,
      };
    case FETCH_JOBS_BASED_ON_FILTER_FAILURE:
      return {
        ...state,
        jobs: [],
        totalCount: 0,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default jobReducer;
