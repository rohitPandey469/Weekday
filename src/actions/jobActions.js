import {
  FETCH_JOBS_BASED_ON_FILTER_FAILURE,
  FETCH_JOBS_BASED_ON_FILTER_SUCCESS,
  FETCH_JOBS_FAILURE,
  FETCH_JOBS_SUCCESS,
} from "./actionType/actionType";

// Action creators
export const fetchJobsSuccess = (jobs) => {
  return {
    type: FETCH_JOBS_SUCCESS,
    payload: jobs,
  };
};

export const fetchJobsFailure = (error) => {
  return {
    type: FETCH_JOBS_FAILURE,
    payload: error,
  };
};

export const fetchJobsBasedOnFilterSuccess = (jobs) => {
  return {
    type: FETCH_JOBS_BASED_ON_FILTER_SUCCESS,
    payload: jobs,
  };
};

export const fetchJobsBasedOnFilterFailure = (error) => {
  return {
    type: FETCH_JOBS_BASED_ON_FILTER_FAILURE,
    payload: error,
  };
};

// Async Action creator to fetch all the jobs
export const fetchJobs = () => {
  return async (dispatch) => {
    try {
      // Jobs fetch Logic
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const body = JSON.stringify({
        limit: 10,
        offset: 0,
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body,
      };

      const response = await fetch(
        "https://api.weekday.technology/adhoc/getSampleJdJSON",
        requestOptions
      );

      if (!response.ok) {
        throw new Error("Failed to fetch jobs");
      }

      const result = await response.json();
      dispatch(fetchJobsSuccess(result.jdList));
    } catch (error) {
      dispatch(fetchJobsFailure(error.message));
    }
  };
};

// Asycn action creator to fetch jobs based on filter
export const fetchJobsBasedOnFilter = (filterParams) => {
  return async (dispatch) => {
    try {
      // Implement your filtering logic here
      // Example: const response = await axios.get(`your_api_endpoint?location=${filterParams.location}&minExp=${filterParams.minExp}&jobRole=${filterParams.jobRole}`);
      // Dispatch success action with filtered jobs data
      // dispatch(fetchJobsBasedOnFilterSuccess(response.data));
    } catch (error) {
      dispatch(fetchJobsBasedOnFilterFailure(error.message));
    }
  };
};
