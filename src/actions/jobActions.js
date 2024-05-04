import { fetchJobsFunc } from "../utils/fetchJobsFunc";
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
      const result = await fetchJobsFunc(offsetValue, 10); // { offsetValue, limitValue }

      if (offsetValue == 0) {
        dispatch(fetchJobsSuccess(result.jdList, result.totalCount));
        return;
      }
      // Concate new jobs to existing ones if offsetValue doesn't equals to zero
      const currentState = getState();
      const updatedJobs = [...currentState.jobReducer.jobs, ...result.jdList];
      dispatch(fetchJobsSuccess(updatedJobs, result.totalCount));
    } catch (error) {
      dispatch(fetchJobsFailure(error.message));
    }
  };
};

// Asycn action creator to fetch jobs based on filter
export const fetchJobsBasedOnFilter = (filterParams, offsetValue) => {
  return async (dispatch, getState) => {
    console.log("Fetching Started", offsetValue);
    try {
      const {
        minExp,
        companyName,
        location,
        jobRole,
        minJdSalary,
        remote,
        stack,
      } = filterParams;

      // need to do the filtering on client side
      let filteredJobs = [];
      const result = await fetchJobsFunc(offsetValue, 100); // fetched all data
      const totalJobs = result.jdList;
      for (let i = 0; i < totalJobs.length; i++) {
        let job = totalJobs[i];
        // filter
        if (
          location.length > 0 &&
          job.location.toLowerCase() !== location.toLowerCase()
        )
          continue;
        if (jobRole.length > 0 && !jobRole.includes(job.jobRole)) continue;
        if (minExp > 0 && minExp < job.minExp) continue;
        if (minJdSalary.length > 0 && minJdSalary < job.minJdSalary) continue;
        if (companyName.length > 0 && companyName != job.companyName) continue;

        filteredJobs.push(job);
        if (filteredJobs.length >= 10) {
          localStorage.setItem("checkedTillWhat", parseInt(offsetValue) + i);
          break;
        }
      }

      console.log("Filtered Jobs", filteredJobs);
      if (offsetValue == 0) {
        dispatch(fetchJobsSuccess(filteredJobs, result.totalCount));
      }
      const currentState = getState();
      const updatedJobs = [...currentState.jobReducer.jobs, ...filteredJobs];
      if (updatedJobs.length == 0) {
        dispatch(fetchJobsBasedOnFilterFailure("No data found"));
        return;
      }
      dispatch(fetchJobsSuccess(updatedJobs, result.totalCount));
    } catch (error) {
      dispatch(fetchJobsBasedOnFilterFailure(error.message));
    }
  };
};
