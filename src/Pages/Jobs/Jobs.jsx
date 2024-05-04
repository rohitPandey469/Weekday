import React, { useEffect } from "react";
import styles from "./Jobs.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs } from "../../actions/jobActions";

const Jobs = () => {
  const dispatch = useDispatch();
  const { jobs, loading, error } = useSelector((state) => state.jobReducer);
  useEffect(() => {
    // Fetch Jobs when component mounts - intial fetching
    console.log("Dispatching fetchJobs action...");
    dispatch(fetchJobs());
  }, [dispatch]);

  return (
    <div>
      {loading ? (
        <div style={{color:"red", fontSize:"40px"}}>Loading...</div>
      ) : (
        <div>
          {error ? (
            <div>Error: {error.message}</div>
          ) : (
            <div>
              {jobs.map((job) => (
                <div key={job.jdUid} style={{border:"10px solid red"}}>
                  <h2>{job.jobRole}</h2>
                  <p>{job.companyName}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Jobs;
