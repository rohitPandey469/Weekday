import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchJobsBasedOnFilter } from "../../actions/jobActions";

const JobFilter = ({ setIsFormFilled, filterParams, setFilterParams}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const isFormFilled = Object.values(filterParams).some(
      (value) => value.trim().length > 0
    );
    setIsFormFilled(isFormFilled);
  }, [filterParams]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilterParams((prevParams) => ({
      ...prevParams,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    dispatch(fetchJobsBasedOnFilter(filterParams, 0)); // Assuming offset value is 0 initially
  };

  return (
    <div>
      <label>
        Job Role:
        <input
          type="text"
          name="jobRole"
          value={filterParams.jobRole}
          onChange={handleChange}
        />
      </label>
      <label>
        Minimum Experience:
        <input
          type="number"
          name="minExp"
          value={filterParams.minExp}
          onChange={handleChange}
        />
      </label>
      <label>
        Location:
        <input
          type="text"
          name="location"
          value={filterParams.location}
          onChange={handleChange}
        />
      </label>
      <label>
        Minimum JD Salary:
        <input
          type="number"
          name="minJdSalary"
          value={filterParams.minJdSalary}
          onChange={handleChange}
        />
      </label>
      <label>
        Remote:
        <input
          type="text"
          name="remote"
          value={filterParams.remote}
          onChange={handleChange}
        />
      </label>
      <label>
        Stack:
        <input
          type="text"
          name="stack"
          value={filterParams.stack}
          onChange={handleChange}
        />
      </label>
      <button onClick={handleSubmit}>Apply Filter</button>
    </div>
  );
};

export default JobFilter;
