import React, { useEffect, useState } from "react";
import styles from "./Jobs.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs, fetchJobsBasedOnFilter } from "../../actions/jobActions";
import JobFilter from "../../components/JobFilter/JobFilter";
import JobCard from "../../components/JobCard/JobCard";
import Loader from "../../components/Loader/Loader";

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
  const [isLoading, setIsLoading] = useState(true);
  const loaderOff = () => setIsLoading(false);

  useEffect(() => {
    console.log("Initial Fetch...");
    dispatch(fetchJobs(0, loaderOff)); // first time offset 0
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
          // no need to on Loader here - cause then initial data will be not shown and 
          // we don't want that
          dispatch(
            fetchJobsBasedOnFilter(
              filterParams,
              localStorage.getItem("checkedTillWhat"),
              loaderOff
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
    dispatch(fetchJobs(jobs.length, loaderOff));
    setIsFetching(false);
  }, [isFetching, dispatch, jobs.length]);

  useEffect(() => {
    setIsLoading(true);
    if (isFormFilled) {
      console.log("Fetch Jobs Based on filter offset 0");
      dispatch(fetchJobsBasedOnFilter(filterParams, 0, loaderOff));
    } else {
      console.log("Fetch jobs offset 0");
      dispatch(fetchJobs(0, loaderOff));
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
        {loading || isLoading ? (
          <Loader />
        ) : (
          <div>
            {error ? (
              <>
                <div style={{ color: "blue", fontSize: "20px" }}>
                  Loading will take some time or {error}
                </div>
                <Loader />
              </>
            ) : (
              <div>
                <div className={styles.jobcardcontainer}>
                  {jobs.map((job) => (
                    <JobCard job={job} />
                  ))}
                </div>
                <div style={{ color: "blue", fontSize: "20px" }}>
                  {jobs.length <= totalCount ? (
                    <Loader />
                  ) : (
                    "No more jobs available..."
                  )}
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
