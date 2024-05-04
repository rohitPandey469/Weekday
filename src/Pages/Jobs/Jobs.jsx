import React, { useEffect, useState } from "react";
import styles from "./Jobs.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs, fetchJobsBasedOnFilter } from "../../actions/jobActions";
import JobFilter from "../../components/JobFilter/JobFilter";

const Jobs = () => {
  const dispatch = useDispatch();
  const { jobs, totalCount, loading, error } = useSelector(
    (state) => state.jobReducer
  );
  const [isFetching, setIsFetching] = useState(false);
  // const [isFormFilled, setIsFormFilled] = useState(false);
  const [filterParams, setFilterParams] = useState({
    jobRole: "",
    minExp: "",
    location: "",
    minJdSalary: "",
    remote: "",
    stack: "",
  });

  useEffect(() => {
    console.log("Initial Fetch...");
    dispatch(fetchJobs(0)); // first time offset 0
  }, [dispatch]);

  useEffect(() => {
    function handleScroll() {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      if (
        scrollTop + clientHeight >= scrollHeight - 20 &&
        !isFetching &&
        !loading &&
        jobs.length < totalCount
      ) {
        console.log("Fetching more jobs");
        setIsFetching(true);
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isFetching, loading]);

  useEffect(() => {
    if (!isFetching) return;
    dispatch(fetchJobs(jobs.length));
    setIsFetching(false);
  }, [isFetching, dispatch, jobs.length]);

  // useEffect(() => {
  //   if (isFormFilled) {
  //     console.log("Fetch Jobs Based On Filter Action Called");
  //     dispatch(fetchJobsBasedOnFilter(filterParams, 0)); // humesha 0 se start kar
  //   } else {
  //     console.log("Fetch Jobs Action Called");
  //     dispatch(fetchJobs(0));
  //   }
  // }, [isFormFilled, setIsFormFilled]);

  // check if there

  return (
    <>
      <JobFilter setIsFormFilled={setIsFormFilled} filterParams={filterParams} setFilterParams={setFilterParams}/>
      <div>
        {loading ? (
          <div style={{ color: "red", fontSize: "40px" }}>Loading...</div>
        ) : (
          <div>
            {error ? (
              <div>Error: {error.message}</div>
            ) : (
              <div>
                {jobs.map((job) => (
                  <div key={job.jdUid} style={{ border: "10px solid red" }}>
                    <h2>{job.jobRole}</h2>
                    <p>{job.companyName}</p>
                  </div>
                ))}
                <div style={{ color: "blue", fontSize: "20px" }}>
                  {jobs.length <= totalCount
                    ? "Loading..."
                    : "No more jobs available..."}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Jobs;
