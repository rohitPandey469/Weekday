import React, { useEffect, useState } from "react";
import styles from "./Jobs.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs, fetchJobsBasedOnFilter } from "../../actions/jobActions";
import JobFilter from "../../components/JobFilter/JobFilter";
import JobCard from "../../components/JobCard/JobCard";

const Jobs = () => {
  const dispatch = useDispatch();
  const { jobs, totalCount, loading, error } = useSelector(
    (state) => state.jobReducer
  );
  const [isFetching, setIsFetching] = useState(false);
  const [isFormFilled, setIsFormFilled] = useState(false);
  const [filterParams, setFilterParams] = useState({
    jobRole: [],
    minExp: "",
    location: "",
    minJdSalary: "",
    remote: "",
    stack: "",
    companyName: "",
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
        console.log("Is Form Filled ? ", isFormFilled);
        if (isFormFilled) {
          // fetch the jobs with filter
          dispatch(
            fetchJobsBasedOnFilter(
              filterParams,
              localStorage.getItem("checkedTillWhat")
            )
          );
        } else {
          console.log("Fetching more jobs");
          setIsFetching(true);
        }
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isFetching, loading, isFormFilled, filterParams]);

  useEffect(() => {
    if (!isFetching) return;
    dispatch(fetchJobs(jobs.length));
    setIsFetching(false);
  }, [isFetching, dispatch, jobs.length]);

  useEffect(() => {
    if (isFormFilled) {
      console.log("Fetch Jobs Based on filter offset 0");
      dispatch(fetchJobsBasedOnFilter(filterParams, 0));
    } else {
      console.log("Fetch jobs offset 0");
      dispatch(fetchJobs(0));
      localStorage.removeItem("checkedTillWhat");
    }
  }, [isFormFilled, filterParams]);

  return (
    <>
      <JobFilter
        setIsFormFilled={setIsFormFilled}
        filterParams={filterParams}
        setFilterParams={setFilterParams}
      />
      <div className={styles.container}>
        {loading ? (
          <div style={{ color: "red", fontSize: "40px" }}>Loading...</div>
        ) : (
          <div>
            {error ? (
              <div style={{ color: "red", fontSize: "20px" }}>
                Error: {error}
              </div>
            ) : (
              <div>
                <div className={styles.jobcardcontainer}>
                  {jobs.map((job) => (
                    <JobCard job={job} />
                  ))}
                </div>
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
