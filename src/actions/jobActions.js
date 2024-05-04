import {
  FETCH_JOBS_BASED_ON_FILTER_FAILURE,
  FETCH_JOBS_BASED_ON_FILTER_SUCCESS,
  FETCH_JOBS_FAILURE,
  FETCH_JOBS_SUCCESS,
} from "./actionType/actionType";

// Action creators
export const fetchJobsSuccess = (jobs, totalCount) => {
  // to avoid duplicates - if present
  const jobIds = new Set(jobs.map((job) => job.jdUid));
  const uniqueJobs = [];
  jobs.forEach((job) => {
    if (jobIds.has(job.jdUid)) {
      uniqueJobs.push(job);
      jobIds.delete(job.jdUid);
    }
  });
  return {
    type: FETCH_JOBS_SUCCESS,
    payload: { jobs: uniqueJobs, totalCount },
  };
};

export const fetchJobsFailure = (error) => {
  return {
    type: FETCH_JOBS_FAILURE,
    payload: error,
  };
};

export const fetchJobsBasedOnFilterSuccess = (jobs, totalCount) => {
  return {
    type: FETCH_JOBS_BASED_ON_FILTER_SUCCESS,
    payload: { jobs, totalCount },
  };
};

export const fetchJobsBasedOnFilterFailure = (error) => {
  return {
    type: FETCH_JOBS_BASED_ON_FILTER_FAILURE,
    payload: error,
  };
};

// Async Action creator to fetch all the jobs
export const fetchJobs = (offsetValue) => {
  return async (dispatch, getState) => {
    try {
      // Jobs fetch Logic
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const body = JSON.stringify({
        limit: 10,
        offset: offsetValue,
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

      // Concate new jobs to existing ones
      const currentState = getState();
      const updatedJobs = [...currentState.jobReducer.jobs, ...result.jdList];
      dispatch(fetchJobsSuccess(updatedJobs, result.totalCount));
    } catch (error) {
      dispatch(fetchJobsFailure(error.message));
    }
  };
};

// Asycn action creator to fetch jobs based on filter
export const fetchJobsBasedOnFilter = (filterParams) => {
  return async (dispatch) => {
    try {
      const { location, minExp, companyName, techStack, role, minPay } =
        filterParams;
    } catch (error) {
      dispatch(fetchJobsBasedOnFilterFailure(error.message));
    }
  };
};
